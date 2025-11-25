import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewShopbyComponent } from './view-shopby/view-shopby.component';
import { AddShopbyComponent } from './add-shopby/add-shopby.component';

const routes: Routes = [
	{
		path: '',
		component: ViewShopbyComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'add',
		component: AddShopbyComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'view',
		component: ViewShopbyComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddShopbyComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: '**',
		component: ViewShopbyComponent,
		canActivate: [AuthGuard],
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShopbyRoutingModule { }
