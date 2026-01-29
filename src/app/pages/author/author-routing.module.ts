import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add Component
import { AddAuthorComponent } from './add-author/add-author.component';
import { ViewAuthorComponent } from './view-author/view-author.component';

// Auth Services
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
