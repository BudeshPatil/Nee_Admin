import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionCategoryRoutingModule } from './collection-category-routing.module';
import { AddCollectioncatComponent } from './add-collectioncat/add-collectioncat.component';
import { ViewCollectioncatComponent } from './view-collectioncat/view-collectioncat.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AddCollectioncatComponent,
    ViewCollectioncatComponent
  ],
  imports: [
    CommonModule,
    CollectionCategoryRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    BlogModule,
    PageModule,
    ClipboardModule,
    NgMultiSelectDropDownModule,
    DatamoduleModule
  ]
})
export class CollectionCategoryModule { }
