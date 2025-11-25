import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';
import { ColourService } from '../../../providers/colour/colour.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { MediaService } from '../../../providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseService } from 'src/app/providers/response/response.service';

@Component({
  selector: 'app-add-colour',
  templateUrl: './add-colour.component.html',
  styleUrls: ['./add-colour.component.scss']
})
export class AddColourComponent {
  addColourForm: FormGroup;
  throw_msg: any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;

  applyAction: any;
  id: any;
  token: any;
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'art_box', name: 'Rajdhani sans-serif' },
    ],
  }
  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  selectedFile: any;
  document: any;
  imagePath: any;
  addmediaForm: FormGroup;
  mediaFile: any;
  fileFormat: any;
  temp_sequence_number = 0;
  submittedMedia: boolean = false;
  mediaData: any = [];
  closeResult = '';
  url: any;
  imageData: any;
  isUploaded: boolean = false;
  isMediaDeleted = false;
  deletedMediaData: any;
  isMediaFileDeleted = false;
  deletedMediaFile: any = [];
  categoryData: any;
  isMediaEdit = false;
  mediaID: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private colourservice: ColourService,
    private toastr: ToastrManager,
    private modalService: NgbModal,
    private mediaService: MediaService,
    public responseService: ResponseService
  ) {
    this.addColourForm = this.formBuilder.group({
      name: ['', Validators.required],
      action: [true, Validators.required],
      value: ['', Validators.required],
    });
    this.uploadInput = new EventEmitter<UploadInput>();
    this.url = environment.Url + '/assets';
    this.addmediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      sequence_number: [''],
      src: ['', Validators.required],
      format: [''],
      file_type: ['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
      width: [''],
      mute: ['muted'],
      autoplay: [true],
      loop: [true],
      full_screen: [''],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addColourForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imagePath = environment.baseUrl + '/public/';
    if (this.isEdit) {
      this.patchingdata(this.id);
      this.applyAction = 'Update';
    }
    else {
      this.applyAction = 'Add';
    }
  }

  patchingdata(id: any) {
    let obj = { id: id };
    this.colourservice.getColourWithId(obj).subscribe(
      (response) => {
        if (response.code == 200 && response.result.length > 0) {
          let data = response?.result[0];
          if (data && data.image_data) {
            this.imageData = data.image_data[0];
          }
          this.document = data?.documents;
          this.addColourForm.patchValue({
            name: data?.name,
            action: data?.action,
            value: data?.value
          });
        } else {

        }
      },
    );

  }

  onSubmit() {
    this.submitted = true;
    let obj = this.addColourForm.value;
    let id = this.id;
    if (this.imageData) {
      obj['image'] = this.imageData._id;
    }
    if (this.addColourForm.invalid) {
      return;
    }
    if (!this.isEdit) {
      this.colourservice.addColour(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.isUploaded = true;
            if (this.isMediaDeleted) {
              this.deleteMediaData();
            }
            if (this.isMediaFileDeleted) {
              this.deleteMediaFile();
            }
            this.toastr.successToastr(response.message);
            setTimeout(() => {
              this.router.navigate(['/colour/view']);
            }, 2000);
          }
          else if (response.code == 400) {
            // this.throw_msg  = response.message
            // this.msg_danger = true;
            this.toastr.errorToastr(response.message);
          }
        },
      );
    } else {
      this.colourservice.editcolourdata(obj, id).subscribe(
        (response) => {
          if (response.code == 200) {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.isUploaded = true;
            if (this.isMediaDeleted) {
              this.deleteMediaData();
            }
            if (this.isMediaFileDeleted) {
              this.deleteMediaFile();
            }
            this.toastr.successToastr(response.message);
            setTimeout(() => {
              this.router.navigate(['/colour/view']);
            }, 2000);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );

    }
  }

  onCancel() {
    this.router.navigate(['/colour/view']);
  }

  onUploadOutputMedia(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/media/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.fileFormat = output.file.type
      this.isUploaded = true;
      if (this.mediaFile) {
        this.deletedMediaFile.push(this.mediaFile);
        this.isMediaFileDeleted = true;
      }
      this.mediaFile = output.file.response.result;
      this.addmediaForm.value.resolution = output.file.size;
      this.submittedMedia = false;
      this.addmediaForm.patchValue({
        src: this.mediaFile
      });
    }
  }

  onUploadVideo(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/media/addVideo',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.fileFormat = output.file.type
      this.isUploaded = true;
      if (this.mediaFile) {
        this.deletedMediaFile.push(this.mediaFile);
        this.isMediaFileDeleted = true;
      }
      this.mediaFile = output.file.response.result;
      this.submittedMedia = false;
      this.addmediaForm.patchValue({
        src: this.mediaFile
      });
    }
  }

  public hasMediaFormError = (controlName: string, errorName: string) => {
    return this.addmediaForm.controls[controlName].hasError(errorName);
  };

  selectImageRole(event, role) {
    if (role == 'base') {
      this.addmediaForm.patchValue({
        height: 1100,
        width: 1100,
      });
    } else if (role == 'small') {
      this.addmediaForm.patchValue({
        height: 309,
        width: 309,
      });
    } else if (role == 'thumbnail') {
      this.addmediaForm.patchValue({
        height: 150,
        width: 150,
      });
    }
  }

  openMedia(content: any) {
    this.addmediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      sequence_number: [''],
      src: ['', Validators.required],
      format: [''],
      file_type: ['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
      width: [''],
      mute: ['muted'],
      autoplay: [true],
      loop: [true],
      full_screen: [''],
    });
    this.mediaFile = '';
    this.isMediaEdit = false;
    this.mediaID = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  editMedia(content: any, mediaData, type) {
    this.isMediaEdit = true;
    this.mediaFile = mediaData.src;
    this.mediaID = mediaData._id;
    this.addmediaForm.patchValue({
      name: mediaData.name,
      status: mediaData.status,
      sequence_number: mediaData.sequence_number,
      src: mediaData.src,
      format: mediaData.format,
      file_type: mediaData.file_type,
      alt: mediaData.alt,
      role: mediaData.role,
      resolution: mediaData.resolution,
      size: mediaData.size,
      height: mediaData.height,
      width: mediaData.width,
      mute: mediaData.mute,
      autoplay: mediaData.autoplay,
      loop: mediaData.loop,
      full_screen: mediaData.full_screen,
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmitMedia(type) {
    let obj = this.addmediaForm.value;
    let id = this.mediaID;
    obj['token'] = this.token;
    obj['src'] = this.mediaFile;
    obj['format'] = this.fileFormat;
    this.submittedMedia = true;
    if (this.addmediaForm.invalid) {
      return;
    }
    if (!this.isMediaEdit) {
      this.mediaService.addMedia(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            this.submittedMedia = false;
            this.toastr.successToastr(response.message);
            this.imageData = response.result;
            this.mediaFile = '';
            this.isUploaded = true;
            this.addmediaForm = this.formBuilder.group({
              name: ['', Validators.required],
              status: [true, Validators.required],
              sequence_number: [''],
              src: ['', Validators.required],
              format: [''],
              file_type: ['image'],
              alt: [''],
              role: [''],
              resolution: [''],
              size: [''],
              height: [''],
              width: [''],
              mute: ['muted'],
              autoplay: [true],
              loop: [true],
              full_screen: [''],
            });
            this.modalService.dismissAll();

          }
          else {
            this.toastr.errorToastr(response.message);
          }
        },
      );
    } else {
      if (id) {
        this.mediaService.editMediadata(obj, id).subscribe(
          (response) => {
            if (response.code == 200) {
              this.throw_msg = response.message
              this.msg_success = true;
              this.toastr.successToastr(response.message);
              if (this.imageData) {
                this.deletedMediaFile.push(this.imageData.src);
                this.deleteMediaFile();
              }
              setTimeout(() => {
                this.imageData.src = response.result.src;
                window.location.reload();
              }, 1000);
              this.imageData.src = response.result.src;
              if (this.categoryData.media_data && this.categoryData.media_data.length > 0) {
                this.patchingdata(this.id);
              }
              this.modalService.dismissAll();
            } else {
              this.throw_msg = response.message
              this.msg_danger = true;
              this.toastr.errorToastr(response.message);
            }
          },
        );
      }
    }
  }

  onCancelMedia() {
    this.addmediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      sequence_number: [''],
      src: ['', Validators.required],
      format: [''],
      file_type: ['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
      width: [''],
      mute: ['muted'],
      autoplay: [true],
      loop: [true],
      full_screen: [''],
    });
    this.modalService.dismissAll();
    this.deletedMediaFile.push(this.mediaFile);
    this.deleteMediaFile();
  }

  deleteMedia() {
    this.isMediaDeleted = true;
    this.deletedMediaData = this.imageData;
    this.imageData = null;
  }

  deleteMediaFile() {
    if (this.isUploaded && this.deletedMediaFile && this.deletedMediaFile.length > 0) {
      let obj = {};
      obj['files'] = this.deletedMediaFile;
      this.colourservice.deletefile(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            this.isUploaded = false;
            this.mediaFile = '';
            this.deletedMediaFile = [];
          }
        },
      );
    }
  }

  deleteMediaData() {
    if (this.deletedMediaData) {
      var mylist = { id: this.deletedMediaData._id, file: this.deletedMediaData.src };
      this.colourservice.deleteMediaData(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            this.deletedMediaFile = [];
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  CreateErrorResponse(responseData) {
    if (responseData) {
      let obj = {
        model: 'Color',
        request: responseData,
        errorCode: 400,
        error: responseData.error,
        status: responseData.status,
        massage: responseData.massage,
        token: this.token
      };
      if (this.isEdit) {
        obj['log_type'] = 'Update';
      } else {
        obj['log_type'] = 'Add';
      }
      this.responseService.addErrorResponse(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            console.log('logs updated');
          }
          else {
          }
        },
      );
    }
  }
}
