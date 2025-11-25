import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddPaymentComponent } from './add-payment/add-payment.component';


const routes: Routes = [
	{
		path: "",
		component: ViewPaymentComponent,
		canActivate: [AuthGuard],
	},{
		path: "add",
		component: AddPaymentComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: ViewPaymentComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddPaymentComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: ViewPaymentComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMethodRoutingModule { }
