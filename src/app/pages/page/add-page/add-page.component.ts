import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

// Services
import { PageService } from '../../../providers/page/page.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  // Data Assign

  addPageForm:FormGroup;
  throw_msg:any; 
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  tagtexist:any;

  // Edit Action Here
  id:any;
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pageService:PageService,
    private toastr: ToastrManager
  )
  {
    this.addPageForm = this.formBuilder.group({
      page_name: ['',Validators.required],
      meta_description: ['',Validators.required],
      meta_title: ['',Validators.required],
      meta_keywords: ['',Validators.required],
     });   
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addPageForm.controls[controlName].hasError(errorName);
  };


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) 
    {
      this.patchingdata(this.id);
    }
  }

  patchingdata(id:any) { 
    let obj = {id:id};
    this.pageService.getPageWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.addPageForm.patchValue({
            page_name: data?.page_name,
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
    let obj = this.addPageForm.value;
    let id  = this.id;
  
    if (this.addPageForm.invalid){
      return;
    }
  
    if(this.isEdit)
    {
      this.pageService.editPagedata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/page/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );    
    } else{
      this.pageService.addPagedata(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/page/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );
    }
  }

  onCancel(){
    this.router.navigate(['/page/view']);
  }


}
