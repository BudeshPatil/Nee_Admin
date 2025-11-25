import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterloginService } from '../../providers/registerlogin/registerlogin.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  forgotpassForm: FormGroup;
  showmsg: any = '';
  loginErrorMsg: string = '';
  loginError2 = false;
  error = { errorTitle: '', errorDesc: '' };
  link:any;
  activateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: RegisterloginService,
  ) {
    this.forgotpassForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
    this.activateForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.link = this.route.snapshot.paramMap.get('link');
    if (this.link) {
      this.activateForm = this.formBuilder.group({
        password: ['', Validators.required],
        confirm_password: ['', Validators.required],
      });
    } else {
      setTimeout(() => {
        this.forgotpassForm = this.formBuilder.group({
          email: ['', Validators.required],
        });
      }, 1000);
    }
  }

 
  onSubmit() {
    if (this.forgotpassForm.invalid) {
      this.loginError2 = true;
      this.loginErrorMsg = 'Please Enter Valid Email';
      setTimeout(() => {
        this.loginError2 = false;
      }, 2000)
      return;
    }
    let obj = this.forgotpassForm.value;
    this.loginService.forgotPassword(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.showmsg = 'Please check your email!';
          this.forgotpassForm.reset();
          // setTimeout(() => {
          //   this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          //     window.location.reload();
          //   }); 
          // }, 2000)
        }
        else if (response.code == 400) {
          this.loginError2 = true;
          this.loginErrorMsg = 'Wrong Authentication';
          setTimeout(() => {
            this.loginError2 = false;
          }, 2000)
        }
      },
    );

  }

  onSubmitActive() {
    if (this.activateForm.invalid) {
      this.loginError2 = true;
      this.loginErrorMsg = 'Please Enter Valid Password';
      setTimeout(() => {
        this.loginError2 = false;
      }, 2000)
      return;
    }
    if (this.activateForm.value.password != this.activateForm.value.confirm_password ) {
      this.loginError2 = true;
      this.loginErrorMsg = 'Please Enter Same Password';
      setTimeout(() => {
        this.loginError2 = false;
      }, 2000)
      return;
    }
    let obj = this.activateForm.value;
    obj['forgotLink'] = this.link;
    this.loginService.ChangePassword(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.showmsg = 'Your Password has been changed successfully. kindly login and verify the new Password';
          this.activateForm.reset();
          // this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          //   window.location.reload();
          // });
        }
        else if (response.code == 400) {
          this.loginError2 = true;
          this.loginErrorMsg = 'Wrong Authentication';
          setTimeout(() => {
            this.loginError2 = false;
          }, 2000)
        }
      },
    );

  }

}
