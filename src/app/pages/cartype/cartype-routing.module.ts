import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewCartypeComponent } from './view-cartype/view-cartype.component';
import { AddCartypeComponent } from './add-cartype/add-cartype.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewCartypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddCartypeComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewCartypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCartypeComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewCartypeComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartypeRoutingModule { }
