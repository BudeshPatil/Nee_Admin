import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMediaComponent } from './edit-media/edit-media.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewMediaComponent } from './view-media/view-media.component';

const routes: Routes = [
	
	{
		path: "",
		component: ViewMediaComponent,
		canActivate: [AuthGuard],
	},
  {
		path: "add",
		component: EditMediaComponent,
		canActivate: [AuthGuard],
		data: { title: 'add' },
	},
	{
		path: "view",
		component: ViewMediaComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: EditMediaComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: "**",
		component: ViewMediaComponent,
		canActivate: [AuthGuard],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
