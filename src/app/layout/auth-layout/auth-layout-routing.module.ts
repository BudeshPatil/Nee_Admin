import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from 'src/app/registerlogin/forgot/forgot.component';
import { LoginComponent } from 'src/app/registerlogin/login/login.component';
import { RegisterComponent } from 'src/app/registerlogin/register/register.component';

const routes: Routes = [
  { path: 'login',          component: LoginComponent },
  { path: 'register',       component: RegisterComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: 'forgot-password/:link',       component: ForgotComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLayoutRoutingModule { }
