import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogModule } from '../blog/blog.module';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewReviewComponent } from './view-review/view-review.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';

@NgModule({
  declarations: [
    ViewProductComponent,
    AddProductComponent,
    ViewReviewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		BlogModule,
		NgSelectModule,
		Ng2SearchPipeModule,
		NgToggleModule,
		DatamoduleModule,
    NgbModule,
    NgMultiSelectDropDownModule
  ]
})
export class ProductModule { }
