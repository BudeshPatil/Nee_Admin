import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add-user componets

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {  AuthGuard } from '../../guard/auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [

  {
    path:'edit-profile/:id',
    component:EditProfileComponent,
    canActivate: [AuthGuard],
  },{
    path:'view-user',
    component:ViewUserComponent,
    canActivate: [AuthGuard],
  },{
    path:'add-user',
    component:AddUserComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
