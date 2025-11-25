import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerGroupRoutingModule } from './customer-group-routing.module';
import { AddCustomerGroupComponent } from './add-customer-group/add-customer-group.component';
import { ViewCustomerGroupComponent } from './view-customer-group/view-customer-group.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddCustomerGroupComponent,
    ViewCustomerGroupComponent
  ],
  imports: [
    CommonModule,
    CustomerGroupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class CustomerGroupModule { }
