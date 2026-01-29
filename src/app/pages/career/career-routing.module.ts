import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add Component
import { AddCareerComponent } from './add-career/add-career.component';
import { ViewCareerComponent } from './view-career/view-career.component';

// Auth Services
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: "add",
    component : AddCareerComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewCareerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCareerComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareerRoutingModule { }
