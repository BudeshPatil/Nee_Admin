import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

// SERVICES
import {LoginService} from '../../providers/auth/login.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // Data Assign

  addProfileForm:FormGroup;
  throw_msg:any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  token: any;
  id:any;
  user:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService:LoginService,
    private toastr: ToastrManager
  )
  {
    this.addProfileForm = this.formBuilder.group({
      username: ['',Validators.required],
      email: ['',Validators.required],
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      address: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      postal_code: ['',Validators.required],
      about: ['',Validators.required]
    });
    this.token = localStorage.getItem('neelgund-admin-token');

  }

  ngOnInit(): void {
    let tempuser = localStorage.getItem('user');
    this.user = JSON.parse(tempuser);
    this.id = this.user._id;
    if(this.user && this.id ){
      this.patchingdata(this.id);
    }
  }

  patchingdata(id:any) {
    let obj = {id:id};
    this.loginService.getUser(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.user = data;
           this.addProfileForm.patchValue({
            username: data?.username,
            email: data?.email,
            first_name: data?.first_name,
            last_name: data?.last_name,
            address: data?.address,
            city: data?.city,
            country: data?.country,
            postal_code: data?.postal_code,
            about: data?.about
          });
       }else{

        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addProfileForm.value;
    obj['id'] = this.id;
    this.loginService.updateProfile(obj).subscribe(
        (response) => {
          if(response.code == 200)
          {
            // this.throw_msg = response.message
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{
              // localStorage.clear();
              this.router.navigate(['/']);
            },2000);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
    );

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addProfileForm.controls[controlName].hasError(errorName);
  };

  onCancel(){
    this.router.navigate(['/auth/view-user']);
  }
}
