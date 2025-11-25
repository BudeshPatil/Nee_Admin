import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewModelComponent } from './view-model/view-model.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddModelComponent } from './add-model/add-model.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewModelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddModelComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewModelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddModelComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewModelComponent,
    canActivate: [AuthGuard],
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
