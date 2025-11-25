import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddCartComponent } from './add-cart/add-cart.component';

const routes: Routes = [
  
  { 
    path: "", 
    component: ViewCartComponent, 
    canActivate: [AuthGuard]
   },
   {
    path: "add",
    component : AddCartComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewCartComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCartComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewCartComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
