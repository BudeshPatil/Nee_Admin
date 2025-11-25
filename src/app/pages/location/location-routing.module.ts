import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewLocationComponent } from './view-location/view-location.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddLocationComponent } from './add-location/add-location.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewLocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddLocationComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewLocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddLocationComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewLocationComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
