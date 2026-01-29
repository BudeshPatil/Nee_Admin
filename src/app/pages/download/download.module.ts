import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogModule } from '../blog/blog.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DownloadRoutingModule } from './download-routing.module';
import { AddDownloadComponent } from './add-download/add-download.component';
import { ViewDownloadComponent } from './view-download/view-download.component';


@NgModule({
  declarations: [
    AddDownloadComponent,
    ViewDownloadComponent
  ],
  imports: [
    CommonModule,
    DownloadRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    NgxUploaderModule,
    AngularEditorModule,
    NgxPaginationModule,
    BlogModule,
    Ng2SearchPipeModule
  ]
})
export class DownloadModule { }
