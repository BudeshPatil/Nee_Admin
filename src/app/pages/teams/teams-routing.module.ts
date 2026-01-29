import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamsComponent } from './add-teams/add-teams.component';
import { AuthGuard } from '../../guard/auth.guard';
import { ViewTeamsComponent } from './view-teams/view-teams.component';
const routes: Routes = [
  {
    path:'add',
    component : AddTeamsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddTeamsComponent,
    data: {title: 'edit'},
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewTeamsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
