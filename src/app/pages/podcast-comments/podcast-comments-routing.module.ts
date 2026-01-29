import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCommentsComponent } from './add-comments/add-comments.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCommentsComponent } from './view-comments/view-comments.component';

const routes: Routes = [
  {
    path:'add',
    component : AddCommentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCommentsComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
  {
    path:'view',
    component : ViewCommentsComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    component : ViewCommentsComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastCommentsRoutingModule { }
