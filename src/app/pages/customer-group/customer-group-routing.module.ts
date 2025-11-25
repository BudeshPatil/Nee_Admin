import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCustomerGroupComponent } from './view-customer-group/view-customer-group.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddCustomerGroupComponent } from './add-customer-group/add-customer-group.component';

const routes: Routes = [
  
  { 
    path: "", 
    component: ViewCustomerGroupComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "add",
    component : AddCustomerGroupComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewCustomerGroupComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCustomerGroupComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewCustomerGroupComponent, 
    canActivate: [AuthGuard]
   }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerGroupRoutingModule { }
