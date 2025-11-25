import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureProductRoutingModule } from './feature-product-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    FeatureProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class FeatureProductModule { }
