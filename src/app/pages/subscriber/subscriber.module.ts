import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { NgxPaginationModule } from 'ngx-pagination';
import { BlogModule } from '../blog/blog.module';

import { SubscriberRoutingModule } from './subscriber-routing.module';
import { AddSubscriberComponent } from './add-subscriber/add-subscriber.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddSubscriberComponent,
    ViewSubscriberComponent
  ],
  imports: [
    CommonModule,
    SubscriberRoutingModule,
    CommonModule,
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
export class SubscriberModule { }
