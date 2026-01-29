import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

// SERVICES
import { LoginService } from '../../providers/auth/login.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  showmsg: any;
  loginErrorMsg: string;
  loginError2 = false;
  error: { errorTitle: '', errorDesc: '' };
  imagePath:any;
  ForgotPasswordForm: FormGroup;
  UpdateNewPasswordForm:FormGroup;
  id:any;
  linkmsg_success: boolean = false;
  linkmsg_danger: boolean = false;
  throw_msg:any; 
  submitted: boolean = false;
  // Data Assign
  msg_success: boolean = false;
  msg_danger: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public loginService: LoginService,
  )
  {
    this.imagePath = environment.Url +'/assets/';
    this.ForgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
    this.UpdateNewPasswordForm = this.formBuilder.group({
      password: ['',[Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#])[A-Za-z\d$@$!%*?&].{8,}")]],
    });
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.UpdateNewPasswordForm.controls[controlName].hasError(errorName);
  };

  public hasForgotEmailError = (controlName: string, errorName: string) => {
    if (this.ForgotPasswordForm.controls['email'].value == "") {
      return "Email is required";
    } else if (this.ForgotPasswordForm.controls['email'].status == "INVALID") {
      return "Invalid Email";
    } else {
      return this.ForgotPasswordForm.controls['email'].hasError(errorName);
    }
  };
  
  onForgotPassword(){
    this.submitted = true;
    let currentState = this;
    let obj = this.ForgotPasswordForm.value;
    if (this.ForgotPasswordForm.invalid){
      return;
    }
    this.loginService.ForgotPasswordLink(obj).subscribe(
      (response) => {
        if(response.code == 200) 
        {
          currentState.throw_msg = 'Please check your email inbox and Reset Your new Password'; 
          currentState.linkmsg_success = true;
          // currentState.router.navigate(['/login']);
          setTimeout(()=> {                            
            currentState.linkmsg_success = false;
            currentState.router.navigate(['/login']);
          },5000); 
        } else {
          currentState.msg_danger = response.message 
          currentState.linkmsg_danger = true;
          setTimeout(()=>{                            
            currentState.linkmsg_danger = false;
          },2000); 
        } 
      },
    );
  }

  onSubmitNewPassword(){
    this.submitted = true;
    let obj = this.UpdateNewPasswordForm.value;
    obj['forgotLink'] = this.id;
    if (this.UpdateNewPasswordForm.invalid) {
      return;
    }
    let currentState = this;
    this.loginService.updateForgotPassword(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          { 
            currentState.msg_success = true;
            currentState.throw_msg   = response.message;
            setTimeout(()=>{
              localStorage.clear();                            
              currentState.router.navigate(['/login']);
            },4000);  
          }
          else if(response.code == 400) 
          {
            currentState.msg_danger = true;
            currentState.throw_msg  = response.message;
          }
        },
      );
  }

}
