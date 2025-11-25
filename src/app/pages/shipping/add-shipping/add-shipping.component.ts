import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import { ShippingService } from '../../../providers/shipping/shipping.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
  selector: 'app-add-shipping',
  templateUrl: './add-shipping.component.html',
  styleUrls: ['./add-shipping.component.scss']
})
export class AddShippingComponent {
  addShippingForm:FormGroup;
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
    private shippingservice:ShippingService,
    private toastr: ToastrManager
  )
  { 
    this.addShippingForm = this.formBuilder.group({
      title: ['',Validators.required],
      method_name: ['',Validators.required],
      minimum_order_amount: [''],
      shipping_charges: [''],
      shipping_type: [''],
      user_id: [''],
      password: [''],
      status: [true,Validators.required],
     });
     this.uploadInput = new EventEmitter<UploadInput>();
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addShippingForm.controls[controlName].hasError(errorName);
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
    this.shippingservice.getShippingWithId(obj).subscribe(
      (response) => { 
        if (response.code == 200) {
          let data = response?.result;
          this.document = data?.documents,
           this.addShippingForm.patchValue({
            title: data?.title,
            method_name: data?.method_name,
            minimum_order_amount: data?.minimum_order_amount,
            shipping_charges: data?.shipping_charges,
            shipping_type: data?.shipping_type,
            user_id: data?.user_id,
            password: data?.password,
            status: data?.status,
          });
       }else{
          
        }
      },
    );
  
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addShippingForm.value;
    let id  = this.id;
    if (this.addShippingForm.invalid){
      return;
    }
    if (!this.isEdit)
    {
      this.shippingservice.addShipping(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/shipping/view']);
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

      this.shippingservice.editshippingdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/shipping/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
  }

  onCancel(){
    this.router.navigate(['/shipping/view']);
  }

  onUploadFile(output: UploadOutput): void {
    this.selectedFile = output;
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/shipping/addNewDocument',
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
