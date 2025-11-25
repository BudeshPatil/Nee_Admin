import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { ViewSubcategoryComponent } from './view-subcategory/view-subcategory.component';

const routes: Routes = [
	{
		path: "",
		component: ViewSubcategoryComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "add",
		component: AddSubcategoryComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: ViewSubcategoryComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddSubcategoryComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: ViewSubcategoryComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoryRoutingModule { }
