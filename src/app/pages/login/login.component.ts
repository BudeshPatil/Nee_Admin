import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../providers/auth/login.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showmsg: any;
  loginErrorMsg: string;
  loginError2 = false;
  baseUrl:any;
  error: { errorTitle: '', errorDesc: '' };
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.baseUrl = environment.Url
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
      });
    }, 1000);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginError2 = true;
      this.loginErrorMsg = 'Please Enter Valid Credentials';
      setTimeout(() => {
        this.loginError2 = false;
      }, 2000)
      return;
    }

    this.loginService.validateLogin(this.loginForm.value).subscribe(
      (response) => {
        if (response.body.code == 200) {
          localStorage.setItem('neelgund-admin-token', response.body.token);
          localStorage.setItem('user', JSON.stringify(response.body));
          // this.router.navigate(['/']);
          this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            window.location.reload();
          });
        }
        else if (response.body.code == 400) {
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
