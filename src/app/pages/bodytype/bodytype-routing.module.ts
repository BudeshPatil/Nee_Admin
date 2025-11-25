import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewBoudytypeComponent } from './view-boudytype/view-boudytype.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddBoudytypeComponent } from './add-boudytype/add-boudytype.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewBoudytypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddBoudytypeComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewBoudytypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddBoudytypeComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewBoudytypeComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodytypeRoutingModule { }
