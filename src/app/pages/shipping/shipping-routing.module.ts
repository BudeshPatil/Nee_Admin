import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShippingComponent } from './add-shipping/add-shipping.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewShippingComponent } from './view-shipping/view-shipping.component';

const routes: Routes = [
  {
    path: "add",
    component : AddShippingComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewShippingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddShippingComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewShippingComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingRoutingModule { }
