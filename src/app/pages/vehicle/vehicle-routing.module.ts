import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

const routes: Routes = [
  {
    path: "",
    component : ViewVehicleComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "add",
    component : AddVehicleComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewVehicleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddVehicleComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewVehicleComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule { }
