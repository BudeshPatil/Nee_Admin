import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewReviewComponent } from './view-review/view-review.component';

const routes: Routes = [
  {
    path: "",
    component : ViewProductComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "add",
    component : AddProductComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddProductComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   {
     path: "review",
     component : ViewReviewComponent,
     canActivate: [AuthGuard],
   },
   { 
    path: "**", 
    component: ViewProductComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
