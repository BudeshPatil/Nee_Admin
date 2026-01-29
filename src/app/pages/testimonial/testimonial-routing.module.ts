import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { ViewTestimonialComponent } from './view-testimonial/view-testimonial.component';
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path:'add',
    component : AddTestimonialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddTestimonialComponent,
    data: {title: 'edit'},
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component:ViewTestimonialComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialRoutingModule { }
