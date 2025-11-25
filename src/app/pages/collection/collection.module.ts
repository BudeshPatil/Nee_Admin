import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';

import { CollectionRoutingModule } from './collection-routing.module';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { ViewCollectionComponent } from './view-collection/view-collection.component';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AddCollectionComponent,
    ViewCollectionComponent
  ],
  imports: [
    CommonModule,
    CollectionRoutingModule,
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
export class CollectionModule { }
