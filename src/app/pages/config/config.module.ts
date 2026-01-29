import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module

import { ConfigRoutingModule } from './config-routing.module';
import { ViewConfigComponent } from './view-config/view-config.component';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';

@NgModule({
  declarations: [
    ViewConfigComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    PageModule,
    BlogModule,
    NgxQrcodeStylingModule
  ]
})
export class ConfigModule { }
