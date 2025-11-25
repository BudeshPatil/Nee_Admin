import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from '../feature-product/view-product/view-product.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewProductdComponent } from './view-productd/view-productd.component';

const routes: Routes = [

  {
    path: "",
    component: ViewProductdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view",
    component : ViewProductdComponent,
    canActivate: [AuthGuard],
  },
  {
  path: "**",
  component: ViewProductdComponent,
  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayonhomeRoutingModule { }
