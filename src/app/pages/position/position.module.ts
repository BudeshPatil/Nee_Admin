import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogModule } from '../blog/blog.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { PositionRoutingModule } from './position-routing.module';
import { AddPositionComponent } from './add-position/add-position.component';
import { ViewPositionComponent } from './view-position/view-position.component';

@NgModule({
  declarations: [
    AddPositionComponent,
    ViewPositionComponent
  ],
  imports: [
    CommonModule,
    PositionRoutingModule,
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
export class PositionModule { }
