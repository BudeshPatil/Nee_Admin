import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSocialactivityComponent } from './add-socialactivity/add-socialactivity.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewSocialactivityComponent } from './view-socialactivity/view-socialactivity.component';

const routes: Routes = [
  {
    path:'add',
    component : AddSocialactivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewSocialactivityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddSocialactivityComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewSocialactivityComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialactivityRoutingModule { }
