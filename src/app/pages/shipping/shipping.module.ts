import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRoutingModule } from './shipping-routing.module';
import { AddShippingComponent } from './add-shipping/add-shipping.component';
import { ViewShippingComponent } from './view-shipping/view-shipping.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddShippingComponent,
    ViewShippingComponent
  ],
  imports: [
    CommonModule,
    ShippingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class ShippingModule { }
