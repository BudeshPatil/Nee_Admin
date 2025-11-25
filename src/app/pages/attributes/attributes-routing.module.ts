import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttributesComponent } from './add-attributes/add-attributes.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewAttributesComponent } from './view-attributes/view-attributes.component';
import { AttributesetAddComponent } from './attributeset-add/attributeset-add.component';
import { AttributesetViewComponent } from './attributeset-view/attributeset-view.component';

const routes: Routes = [
	{
		path: "add-attribute",
		component: AddAttributesComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view-attribute",
		component: ViewAttributesComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit-attribute/:id',
		component: AddAttributesComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "add",
		component: AttributesetAddComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: AttributesetViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AttributesetAddComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: AttributesetViewComponent,
		canActivate: [AuthGuard],
	}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributesRoutingModule { }
