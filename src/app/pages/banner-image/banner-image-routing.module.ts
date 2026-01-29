import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../../guard/auth.guard';
import {AddBannerComponent} from '../banner-image/add-banner/add-banner.component';
import {ViewBannerComponent} from '../banner-image/view-banner/view-banner.component'

const routes: Routes = [
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
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerImageRoutingModule { }
