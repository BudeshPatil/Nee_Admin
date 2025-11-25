import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBrandComponent } from '../brand/view-brand/view-brand.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddBrandComponent } from '../brand/add-brand/add-brand.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewBrandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddBrandComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewBrandComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddBrandComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewBrandComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
