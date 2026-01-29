import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AddPositionComponent } from './add-position/add-position.component';
import { ViewPositionComponent } from './view-position/view-position.component';


const routes: Routes = [
  {
    path: "add",
    component : AddPositionComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewPositionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddPositionComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
