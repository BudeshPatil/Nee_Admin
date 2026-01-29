import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
// Services
import { PodcastcommentsService } from '../../../providers/podcastcomments/podcastcomments.service';

@Component({
  selector: 'app-add-comments',
  templateUrl: './add-comments.component.html',
  styleUrls: ['./add-comments.component.scss']
})
export class AddCommentsComponent implements OnInit {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  commentsImage:any;
  imagePath : any;
  
  // Data Assign

  addCommentsForm:FormGroup;
  throw_msg:any; 
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  commentstexist:any;

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
      {class: 'career_box', name: 'Rajdhani sans-serif'},
    ],
  } 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private commentsService:PodcastcommentsService,
    private toastr: ToastrManager
  )
  { 
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addCommentsForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', Validators.required],
      message: [''],
      podcast: [''],
      status: [true],
      isApproved: [true],
      ratings: [0],
     });
     this.imagePath = environment.baseUrl+'/public/';   
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addCommentsForm.controls[controlName].hasError(errorName);
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
    this.commentsService.getCommentsWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.commentsImage = data?.image;
          this.addCommentsForm.patchValue({
            firstname: data?.firstname,
            lastname: data?.lastname,
            email:data?.email, 
            phone:data?.phone, 
            message: data?.message,
            isApproved: data?.isApproved,
            ratings: data?.ratings,
            podcast: data?.podcast,
            status: data?.status            
          });
       }else{
          
        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addCommentsForm.value;
    let id  = this.id;
    
    obj['image'] = this.commentsImage; 
    if (this.addCommentsForm.invalid){
      return;
    }
    
    if (!this.isEdit)
    {
      this.commentsService.addComments(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/podcast-comments/view']);
            },2000);
          } 
          else if(response.code == 400) 
          {    
              this.commentstexist  = response.message;
              // this.throw_msg  = response.message
              // this.msg_danger = true;
              this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
    else
    {
      this.commentsService.editCommentsdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/podcast-comments/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
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
        url: environment.baseUrl+'/api/home/addimage',
        method: 'POST',
        data: {}, 
      };
      this.uploadInput.emit(event);
    } 
    else if(output.type === 'done' && typeof output.file !== 'undefined')
    {  
      this.commentsImage = output.file.response.result;
    }
  }

  onCancel(){
    this.router.navigate(['/podcast-comments/view']);
  }

}
