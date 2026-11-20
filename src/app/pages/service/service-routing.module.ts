import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceComponent } from './add-service/add-service.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { AuthGuard } from '../../guard/auth.guard';

const routes: Routes = [
  { path: "add", component: AddServiceComponent, canActivate: [AuthGuard] },
  { path: "view", component: ViewServiceComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddServiceComponent, canActivate: [AuthGuard], data: { title: 'edit' } },
  { path: "**", component: ViewServiceComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
