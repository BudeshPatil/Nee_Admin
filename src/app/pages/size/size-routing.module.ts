import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSizeComponent } from './add-size/add-size.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewSizeComponent } from './view-size/view-size.component';

const routes: Routes = [
  {
    path: "add",
    component : AddSizeComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewSizeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddSizeComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewSizeComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SizeRoutingModule { }
