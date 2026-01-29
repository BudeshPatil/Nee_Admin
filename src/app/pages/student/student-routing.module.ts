import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  {
    path:'add',
    component : AddStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewStudentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddStudentComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewStudentComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
