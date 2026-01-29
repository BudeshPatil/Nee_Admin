import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';

// Services
import { AuthorService } from '../../../providers/author/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  authorImage:any;
  imagePath : any;

  // Data Assign

  addAuthorForm:FormGroup;
  throw_msg:any; 
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;

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
    private authorservice:AuthorService,
    private toastr: ToastrManager
  )
  { 
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addAuthorForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.maxLength(255)]],
      author_title: ['',Validators.required],
      description: ['',Validators.required],
      meta_description: ['',Validators.required],
      meta_title: ['',Validators.required],
      meta_keywords: ['',Validators.required],
      facebook_link: [''],
      twitter_link: [''],
      youtube_link: [''],
      instagram_link: [''],
      linkedin_link: [''],
      tiktok_link: [''],
      telegram_link: [''],
      status: ['false',Validators.required],
     });
     this.imagePath = environment.baseUrl+'/public/';   
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addAuthorForm.controls[controlName].hasError(errorName);
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
    this.authorservice.getAuthorWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.authorImage = data?.image;
          this.addAuthorForm.patchValue({
            name: data?.name,
            author_title: data?.title,
            description: data?.description,
            meta_description: data?.meta_description,
            meta_title: data?.meta_title,
            meta_keywords: data?.meta_keywords,
            facebook_link: data?.facebook_link,
            twitter_link: data?.twitter_link,
            youtube_link: data?.youtube_link,
            instagram_link: data?.instagram_link,
            linkedin_link: data?.linkedin_link,
            tiktok_link: data?.tiktok_link,
            telegram_link: data?.telegram_link,
            status:data?.isDeleted,
          });
       }else{
          
        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addAuthorForm.value;
    let id  = this.id;
    
    obj['image'] = this.authorImage; 
    if (this.addAuthorForm.invalid){
      return;
    }
    
    if (!this.isEdit)
    {
      this.authorservice.addAuthor(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/author/view']);
            },2000); 
          }
          else if(response.code == 400) 
          {   
              // this.throw_msg    = response.message
              // this.msg_danger = true;
              this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
    else
    {
      this.authorservice.editAuthordata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/author/view']);
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
      this.authorImage = output.file.response.result;
    }
  }

  onCancel(){
    this.router.navigate(['/author/view']);
  }
}
