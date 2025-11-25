import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginComponent } from '../../registerlogin/login/login.component';
import { RegisterComponent } from '../../registerlogin/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotComponent } from '../../registerlogin/forgot/forgot.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forChild(AuthLayoutRoutes),
    AuthLayoutRoutingModule
  ]
})
export class AuthLayoutModule { }
