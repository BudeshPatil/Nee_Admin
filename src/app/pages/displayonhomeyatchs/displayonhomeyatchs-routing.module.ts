import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewYatchsComponent } from './view-yatchs/view-yatchs.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [

  {
    path: "",
    component: ViewYatchsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view",
    component : ViewYatchsComponent,
    canActivate: [AuthGuard],
  },
  {
  path: "**",
  component: ViewYatchsComponent,
  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayonhomeyatchsRoutingModule { }
