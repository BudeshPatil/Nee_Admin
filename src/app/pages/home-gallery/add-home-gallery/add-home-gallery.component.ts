import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
// Services
import { HomegalleryService } from '../../../providers/homegallery/homegallery.service';

@Component({
  selector: 'app-add-home-gallery',
  templateUrl: './add-home-gallery.component.html',
  styleUrls: ['./add-home-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  galleryImage:any;
  imagePath : any;
  imageArr: any = [];

  // Data Assign

  artData: any;
  countryData: any;
  addgalleryForm:FormGroup;
  throw_msg:any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  token: any;

  // Edit Action Here
  applyAction: any;
  id:any;
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
      {class: 'blog-descriptiondetail', name: 'Rajdhani sans-serif'},
    ],
}
 constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private galleryService:HomegalleryService
  )
  {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addgalleryForm = this.formBuilder.group({
      name: ['',Validators.required],
      desc_short: [''],
      desc_long: [''],
      video_url: [''],
      category: ['',Validators.required],
      status:[true,Validators.required],
     });
     this.token = localStorage.getItem('token');
     this.imagePath = environment.baseUrl+'/public/homegallery/';
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addgalleryForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit)
    {
      this.patchingdata(this.id);
      this.applyAction = 'Update';
    }
    else
    {
      this.applyAction = 'Add';
    }
  }

  patchingdata(id:any) {
    let obj = {id:id};
    this.galleryService.getGalleryWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.galleryImage = data?.image;
          this.addgalleryForm.patchValue({
            name: data?.name,
            desc_short: data?.desc_short,
            desc_long: data?.desc_long,
            video_url: data?.video_url,
            status: data?.status,
            category: data?.category,
          });
       }else{

        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addgalleryForm.value;
    let id  = this.id;
    obj['token'] = this.token;
    obj['image'] = this.galleryImage;
    if (this.addgalleryForm.invalid){
      return;
    }
    if (!this.isEdit)
    {
      this.galleryService.addGallery(obj).subscribe(
        (response) => {
          if(response.code == 200)
          {
            this.throw_msg   = response.message
            this.msg_success = true;
            setTimeout(()=>{
              this.router.navigate(['/homegallery/view']);
            },2000);
          }
          else if(response.code == 400)
          {
              this.throw_msg    = response.message
              this.msg_danger = true;
          }
        },
      );
    }
    else
    {
      this.galleryService.editGallerydata(obj,id).subscribe(
        (response) => {
          if(response.code == 200)
          {
            this.throw_msg = response.message
            this.msg_success = true;
            setTimeout(()=>{
                this.router.navigate(['/homegallery/view']);
            },2000);
          }
        },
      );
    }
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue')
    {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl+'/api/homegallery/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if(output.type === 'done' && typeof output.file !== 'undefined')
    {
      this.galleryImage = output.file.response.result;
    }
  }

  onCancel(){
    this.router.navigate(['/homegallery/view']);
  }

}
