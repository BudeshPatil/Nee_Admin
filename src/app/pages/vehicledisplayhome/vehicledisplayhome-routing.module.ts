import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [

  {
    path: "",
    component: ViewVehicleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view",
    component : ViewVehicleComponent,
    canActivate: [AuthGuard],
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
export class VehicledisplayhomeRoutingModule { }
