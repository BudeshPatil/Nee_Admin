import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    DatamoduleModule,
    RouterModule
  ]
})
export class AdminLayoutModule { }
