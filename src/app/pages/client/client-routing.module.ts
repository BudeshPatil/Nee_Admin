import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAddComponent } from './client-add/client-add.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ClientViewComponent } from './client-view/client-view.component';

const routes: Routes = [
	{ path: 'add', component: ClientAddComponent, canActivate: [AuthGuard] },
	{ path: 'view', component: ClientViewComponent, canActivate: [AuthGuard] },
	{ path: 'edit/:id', component: ClientAddComponent, canActivate: [AuthGuard], data: { title: 'edit' } },
	{ path: "**", component: ClientViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ClientRoutingModule { }
