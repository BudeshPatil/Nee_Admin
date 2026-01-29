import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import { DownloadService } from '../../../providers/download/download.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-download',
  templateUrl: './add-download.component.html',
  styleUrls: ['./add-download.component.scss']
})
export class AddDownloadComponent implements OnInit {

  addDownloadForm:FormGroup;
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
      {class: 'position_box', name: 'Rajdhani sans-serif'},
    ],
  } 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private downloadservice:DownloadService,
    private toastr: ToastrManager
  )
  { 
    this.addDownloadForm = this.formBuilder.group({
      name: ['',Validators.required],
      company: ['',Validators.required],
      email: ['',Validators.required],
      mobile: [''],
      link: [''],
     });
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addDownloadForm.controls[controlName].hasError(errorName);
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
    this.downloadservice.getDownloadWithId(obj).subscribe(
      (response) => { 
        if (response.code == 200) {
          let data = response?.result;
           this.addDownloadForm.patchValue({
            name: data?.name,
            description:data?.description,
            type:data?.type,
            url_or_email:data?.url_or_email,
            status:data?.status
          });
       }else{
          
        }
      },
    );
  
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addDownloadForm.value;
    let id  = this.id;
    if (this.addDownloadForm.invalid){
      return;
    }

    if (!this.isEdit)
    {
      this.downloadservice.addDownload(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/download/view']);
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

      this.downloadservice.editdownloaddata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/download/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
  }

  onCancel(){
    this.router.navigate(['/download/view']);
  }

}
