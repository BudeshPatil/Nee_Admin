import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';

const routes: Routes = [
  {
    path: "add",
    component : AddSubscriberComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewSubscriberComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddSubscriberComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriberRoutingModule { }
