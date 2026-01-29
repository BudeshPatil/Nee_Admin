import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewAwardComponent } from './view-award/view-award.component';
import { AddAwardComponent } from './add-award/add-award.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'add',
    component : AddAwardComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewAwardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddAwardComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewAwardComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardRoutingModule { }
