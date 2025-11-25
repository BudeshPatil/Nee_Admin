import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  {
    path:'',
    component:ViewUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'edit-profile/:id',
    component:EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view-user',
    component:ViewUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'add-user',
    component:AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    component:ViewUserComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
