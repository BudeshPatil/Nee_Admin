import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCourseComponent } from './view-course/view-course.component';

const routes: Routes = [
  {
    path:'add',
    component : AddCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCourseComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewCourseComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
