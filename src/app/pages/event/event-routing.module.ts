import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEventComponent } from './view-event/view-event.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
	{
		path: '',
		component: ViewEventComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'add',
		component: AddEventComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'view',
		component: ViewEventComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'edit/:id',
		component: AddEventComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
	{
		path: '**',
		component: ViewEventComponent,
		canActivate: [AuthGuard],
	}

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventRoutingModule { }
