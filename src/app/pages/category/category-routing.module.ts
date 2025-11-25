import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';

import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

const routes: Routes = [
	
	{
		path: "",
		component: ViewCategoryComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "add",
		component: AddCategoryComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: ViewCategoryComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddCategoryComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: ViewCategoryComponent,
		canActivate: [AuthGuard],
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CategoryRoutingModule { }
