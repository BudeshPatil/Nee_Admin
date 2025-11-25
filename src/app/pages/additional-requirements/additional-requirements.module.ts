import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdditionalRequirementsRoutingModule } from './additional-requirements-routing.module';
import { AddAdditionalComponent } from './add-additional/add-additional.component';
import { ViewAdditionalComponent } from './view-additional/view-additional.component';
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
    AddAdditionalComponent,
    ViewAdditionalComponent
  ],
  imports: [
    CommonModule,
    AdditionalRequirementsRoutingModule,
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
export class AdditionalRequirementsModule { }
