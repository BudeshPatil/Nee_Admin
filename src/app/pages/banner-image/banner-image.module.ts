import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerImageRoutingModule } from './banner-image-routing.module';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { ViewBannerComponent } from './view-banner/view-banner.component';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from '../../pipemodule.module';

@NgModule({
  declarations: [
    AddBannerComponent,
    ViewBannerComponent
  ],
  imports: [
    CommonModule,
    BannerImageRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    PageModule,
    BlogModule,
    Ng2SearchPipeModule,
    NgToggleModule,
    PipemoduleModule
  ]
})
export class BannerImageModule { }
