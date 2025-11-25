import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  
  {
    path: "",
    component : ViewProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "view",
    component : ViewProductComponent,
    canActivate: [AuthGuard],
  },
   { 
    path: "**", 
    component: ViewProductComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureProductRoutingModule { }
