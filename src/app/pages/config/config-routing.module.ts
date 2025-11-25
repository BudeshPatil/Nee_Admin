import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewConfigComponent } from './view-config/view-config.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'',
    component : ViewConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewConfigComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'**',
    component : ViewConfigComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
