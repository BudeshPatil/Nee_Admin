import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAuthorComponent } from './add-author/add-author.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewAuthorComponent } from './view-author/view-author.component';

const routes: Routes = [
  {
    path:'',
    component : ViewAuthorComponent,
    canActivate: [AuthGuard],
   },
  {
    path:'add',
    component : AddAuthorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddAuthorComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   {
    path:'view',
    component : ViewAuthorComponent,
    canActivate: [AuthGuard],
   },
   {
    path:'**',
    component : ViewAuthorComponent,
    canActivate: [AuthGuard],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
