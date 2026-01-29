import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCategoryComponent } from './view-category/view-category.component';

const routes: Routes = [
  {
    path:'add',
    component : AddCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCategoryComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
  {
    path:'view',
    component : ViewCategoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    component : ViewCategoryComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastCategoryRoutingModule { }
