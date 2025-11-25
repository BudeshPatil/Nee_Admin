import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';
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
    AddLocationComponent,
    ViewLocationComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
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
export class LocationModule { }
