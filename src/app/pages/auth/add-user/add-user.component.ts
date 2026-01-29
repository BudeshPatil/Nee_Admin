import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrManager } from 'ng6-toastr-notifications';

// SERVICES
import {LoginService} from '../../../providers/auth/login.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  // Data Assign

  addProfileForm:FormGroup;
  throw_msg:any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  token: any;

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
      password: ['',Validators.required],
      confirmpassword: ['',Validators.required],
      role: ['',Validators.required]
    });
    this.token = localStorage.getItem('neelgund-admin-token');
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addProfileForm.value;
    obj['neelgund-admin-token'] = this.token;
    if(this.addProfileForm.value.password == this.addProfileForm.value.confirmpassword){
      this.loginService.createrofile(obj).subscribe(
          (response) => {
            if(response.code == 200)
            {
              // this.throw_msg = response.message
              this.msg_success = true;
              this.msg_danger = false;
              this.toastr.successToastr(response.message);
              this.router.navigate(['/auth/view-user']);
            } else {
              this.msg_success = false;
              // this.throw_msg = response.message
              // this.msg_danger = true;
              this.toastr.errorToastr(response.message);
            }
          },
      );
    } else {
      this.throw_msg = "Please Enter same Password"
      this.msg_danger = true;
    }

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addProfileForm.controls[controlName].hasError(errorName);
  };

  onCancel(){
    this.router.navigate(['/auth/view-user']);
  }

}
