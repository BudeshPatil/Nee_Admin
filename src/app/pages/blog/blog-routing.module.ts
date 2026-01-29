import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add Component
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

// Auth Services
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path:'add',
    component : AddBlogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddBlogComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'view',
    component : ViewBlogComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
