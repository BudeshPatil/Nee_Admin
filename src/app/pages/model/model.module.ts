import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { AddModelComponent } from './add-model/add-model.component';
import { ViewModelComponent } from './view-model/view-model.component';
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
    AddModelComponent,
    ViewModelComponent
  ],
  imports: [
    CommonModule,
    ModelRoutingModule,
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
export class ModelModule { }
