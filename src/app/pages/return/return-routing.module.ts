import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReturnComponent } from './add-return/add-return.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewReturnComponent } from './view-return/view-return.component';
import { AddReasonComponent } from './add-reason/add-reason.component';
import { ViewReasonComponent } from './view-reason/view-reason.component';

const routes: Routes = [
	{
		path: "add",
		component: AddReturnComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: ViewReturnComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddReturnComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "add-reason",
		component: AddReasonComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view-reason",
		component: ViewReasonComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit-reason/:id',
		component: AddReasonComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: ViewReturnComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnRoutingModule { }
