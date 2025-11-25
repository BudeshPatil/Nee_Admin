import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPromocodeComponent } from './view-promocode/view-promocode.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddPromocodeComponent } from './add-promocode/add-promocode.component';

const routes: Routes = [
  {
		path: "",
		component: ViewPromocodeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "view",
		component: ViewPromocodeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "add",
		component: AddPromocodeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "edit/:id",
		component: AddPromocodeComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' }
	},
	{
		path: "**",
		component: ViewPromocodeComponent,
		canActivate: [AuthGuard],

	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromocodeRoutingModule { }
