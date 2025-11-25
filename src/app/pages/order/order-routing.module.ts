import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ViewSummaryComponent } from './view-summary/view-summary.component';

const routes: Routes = [
  { 
    path: "", 
    component: ViewOrderComponent, 
    canActivate: [AuthGuard]
   },
   {
    path: "add",
    component : AddOrderComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewOrderComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddOrderComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   {
     path: 'viewsummary/:id',
     component: ViewSummaryComponent,
     canActivate: [AuthGuard],
     data: {title: 'view'},
    },
   { 
    path: "**", 
    component: ViewOrderComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
