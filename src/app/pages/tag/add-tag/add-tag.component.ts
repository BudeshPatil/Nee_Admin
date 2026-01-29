import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
// Services
import { TagService } from '../../../providers/tag/tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  tagImage:any;
  imagePath : any;
  
  // Data Assign

  addTagForm:FormGroup;
  throw_msg:any; 
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  tagtexist:any;

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
    private tagService:TagService,
    private toastr: ToastrManager
  )
  { 
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addTagForm = this.formBuilder.group({
      name: ['',Validators.required],
      status: ['false',Validators.required],
      description: ['',Validators.required],
      meta_description: ['',Validators.required],
      meta_title: ['',Validators.required],
      meta_keywords: ['',Validators.required],
     });
     this.imagePath = environment.baseUrl+'/public/';   
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addTagForm.controls[controlName].hasError(errorName);
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
    this.tagService.getTagWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.tagImage = data?.image;
          this.addTagForm.patchValue({
            name: data?.name,
            description: data?.description,
            status:data?.isDeleted, 
            meta_description: data?.meta_description,
            meta_title: data?.meta_title,
            meta_keywords: data?.meta_keywords,
          });
       }else{
          
        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addTagForm.value;
    let id  = this.id;
    
    obj['image'] = this.tagImage; 
    if (this.addTagForm.invalid){
      return;
    }
    
    if (!this.isEdit)
    {
      this.tagService.addTag(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/tag/view']);
            },2000);
          } 
          else if(response.code == 400) 
          {    
              this.tagtexist  = response.message;
              // this.throw_msg  = response.message
              // this.msg_danger = true;
              this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
    else
    {
      this.tagService.editTagdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/tag/view']);
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
      this.tagImage = output.file.response.result;
    }
  }

  onCancel(){
    this.router.navigate(['/author/view']);
  }

}
