import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  
  { 
    path: "", 
    component: ViewCustomerComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "add",
    component : AddCustomerComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewCustomerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCustomerComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewCustomerComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
