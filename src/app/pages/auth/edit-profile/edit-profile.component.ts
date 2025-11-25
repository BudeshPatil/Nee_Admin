import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

// SERVICES
import { LoginService } from '../../../providers/auth/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  // Data Assign

  addProfileForm: FormGroup;
  throw_msg: any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  token: any;
  id: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private toastr: ToastrManager
  ) {
    this.addProfileForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.token = localStorage.getItem('ghoastrental-token');

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.patchingdata(this.id);
    }
  }

  patchingdata(id: any) {
    let obj = { id: id };
    this.loginService.getUser(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.addProfileForm.patchValue({
            username: data?.username,
            email: data?.email,
            role: data?.role,
          });
        } else {

        }
      },
    );
  }

  onSubmit() {
    this.submitted = true;
    let obj = this.addProfileForm.value;
    obj['id'] = this.id;
    if (this.addProfileForm.value.password == this.addProfileForm.value.confirmpassword) {
      this.loginService.editProfile(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(() => {
              // localStorage.clear();
              this.router.navigate(['/auth/view-user']);
            }, 2000);
          } else {
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

  onCancel() {
    this.router.navigate(['/auth/view-user']);
  }

}
