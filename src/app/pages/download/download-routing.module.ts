import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDownloadComponent } from './add-download/add-download.component';
import { ViewDownloadComponent } from './view-download/view-download.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: "add",
    component : AddDownloadComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewDownloadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddDownloadComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule { }
