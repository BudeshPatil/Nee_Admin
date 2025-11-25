import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoryRoutingModule } from './subcategory-routing.module';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { ViewSubcategoryComponent } from './view-subcategory/view-subcategory.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AddSubcategoryComponent,
    ViewSubcategoryComponent
  ],
  imports: [
    CommonModule,
    SubcategoryRoutingModule,
		AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
		BlogModule,
    PageModule,
    DatamoduleModule,
    NgMultiSelectDropDownModule
  ]
})
export class SubcategoryModule { }
