import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewAdditionalComponent } from './view-additional/view-additional.component';
import { AddAdditionalComponent } from './add-additional/add-additional.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewAdditionalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddAdditionalComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewAdditionalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddAdditionalComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewAdditionalComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdditionalRequirementsRoutingModule { }
