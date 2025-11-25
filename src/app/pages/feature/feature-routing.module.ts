import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewFeatureComponent } from './view-feature/view-feature.component';
import { AddFeatureComponent } from './add-feature/add-feature.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewFeatureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddFeatureComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewFeatureComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddFeatureComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewFeatureComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
