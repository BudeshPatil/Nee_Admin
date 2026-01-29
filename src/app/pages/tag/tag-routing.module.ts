import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add Component
import { AddTagComponent } from './add-tag/add-tag.component';
import { ViewTagComponent } from './view-tag/view-tag.component';

// Auth Services
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path:'add',
    component : AddTagComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddTagComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
  {
    path:'view',
    component : ViewTagComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagRoutingModule { }
