import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { ViewFeatureComponent } from './view-feature/view-feature.component';
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
    AddFeatureComponent,
    ViewFeatureComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
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
export class FeatureModule { }
