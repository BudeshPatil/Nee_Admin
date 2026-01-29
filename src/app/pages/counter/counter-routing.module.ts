import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCounterComponent } from './view-counter/view-counter.component';


const routes: Routes = [
	{
		path:'view',
		component : ViewCounterComponent,
		canActivate: [AuthGuard],
	},
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CounterRoutingModule { }
