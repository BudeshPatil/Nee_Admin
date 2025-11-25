import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddBlogComponent } from './add-blog/add-blog.component';

const routes: Routes = [
  
  {
    path:'',
    component : ViewBlogComponent,
    canActivate: [AuthGuard],
  },
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
  {
    path:'**',
    component : ViewBlogComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
