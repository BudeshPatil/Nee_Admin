import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../../guard/auth.guard';
import { ViewpricesComponent } from './viewprices/viewprices.component';

const routes: Routes = [
  {
    path:'',
    component : ViewpricesComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewpricesComponent,
    canActivate: [AuthGuard],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceonrequestRoutingModule { }
