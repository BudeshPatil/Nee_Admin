import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewWalletComponent } from './view-wallet/view-wallet.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddWalletComponent } from './add-wallet/add-wallet.component';

const routes: Routes = [
	{
		path: "view",
		component: ViewWalletComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "add",
		component: AddWalletComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "edit/:id",
		component: AddWalletComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' }
	},
	{
		path: "**",
		component: ViewWalletComponent,
		canActivate: [AuthGuard],
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
