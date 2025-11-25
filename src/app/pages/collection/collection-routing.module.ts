import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCollectionComponent } from './view-collection/view-collection.component';

const routes: Routes = [
	
	{
		path: "",
		component: ViewCollectionComponent,
		canActivate: [AuthGuard],
	},
	{
		path: "add",
		component: AddCollectionComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: ViewCollectionComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddCollectionComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: ViewCollectionComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
