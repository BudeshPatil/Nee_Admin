import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';

const routes: Routes = [
	{ path: "add", component: AddProjectComponent, canActivate: [AuthGuard] },
	{ path: "view", component: ViewProjectComponent, canActivate: [AuthGuard] },
	{ path: 'edit/:id', component: AddProjectComponent, canActivate: [AuthGuard], data: { title: 'edit' } },
	{ path: "**", component: ViewProjectComponent, canActivate: [AuthGuard] }];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectRoutingModule { }
