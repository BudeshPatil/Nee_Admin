import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AddPaymentComponent,
    ViewPaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule,
    NgMultiSelectDropDownModule
  ]
})
export class PaymentMethodModule { }
