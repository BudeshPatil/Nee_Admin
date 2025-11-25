import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBannerComponent } from './view-banner/view-banner.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component : ViewBannerComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'add',
    component : AddBannerComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewBannerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddBannerComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewBannerComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerImageRoutingModule { }
