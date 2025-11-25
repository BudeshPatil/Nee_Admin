import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewResponseComponent } from './view-response/view-response.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
	{
		path: "",
		component: ViewResponseComponent,
		canActivate: [AuthGuard],
		data: { title: 'view' },
	},
  {
		path: "view",
		component: ViewResponseComponent,
		canActivate: [AuthGuard],
		data: { title: 'view' },
	},
	{
		path: '**',
		component: ViewResponseComponent,
		canActivate: [AuthGuard],
		data: { title: 'view' },
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResponseRoutingModule { }
