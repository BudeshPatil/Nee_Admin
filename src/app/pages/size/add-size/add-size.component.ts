import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import {SizeService } from '../../../providers/size/size.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.scss']
})
export class AddSizeComponent {
  addSizeForm:FormGroup;
  throw_msg:any; 
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;

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
      {class: 'art_box', name: 'Rajdhani sans-serif'},
    ],
  } 
  // File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
  selectedFile:any;
	document:any;
  imagePath:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sizeservice:SizeService,
    private toastr: ToastrManager
  )
  { 
    this.addSizeForm = this.formBuilder.group({
      name: ['',Validators.required],
      action: [true,Validators.required],
      value: ['',Validators.required],
     });
     this.uploadInput = new EventEmitter<UploadInput>();
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addSizeForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imagePath = environment.baseUrl + '/public/';
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
    this.sizeservice.getSizeWithId(obj).subscribe(
      (response) => { 
        if (response.code == 200) {
          let data = response?.result;
          this.document = data?.documents,
           this.addSizeForm.patchValue({
            name: data?.name,
            action: data?.action,
            value: data?.value
          });
       }else{
          
        }
      },
    );
  
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addSizeForm.value;
    let id  = this.id;
    if (this.addSizeForm.invalid){
      return;
    }
    if (!this.isEdit)
    {
      this.sizeservice.addSize(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/size/view']);
            },2000);
          }
          else if(response.code == 400)
          {   
              // this.throw_msg  = response.message
              // this.msg_danger = true;
              this.toastr.errorToastr(response.message);
          } 
        },
      );
    }else{

      this.sizeservice.editsizedata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/size/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
  }

  onCancel(){
    this.router.navigate(['/size/view']);
  }

  onUploadFile(output: UploadOutput): void {
    this.selectedFile = output;
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/size/addNewDocument',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.document = output.file.response.result;
      this.throw_msg = output.file.response.message;
      this.msg_success = true;
    }
  }
}
