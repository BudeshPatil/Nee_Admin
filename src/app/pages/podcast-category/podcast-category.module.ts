import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { BlogModule } from '../blog/blog.module';

import { PodcastCategoryRoutingModule } from './podcast-category-routing.module';


@NgModule({
  declarations: [
    AddCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    PodcastCategoryRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    BlogModule
  ]
})
export class PodcastCategoryModule { }
