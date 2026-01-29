import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { TagRoutingModule } from './tag-routing.module';
import { BlogModule } from '../blog/blog.module';
import { AddTagComponent } from './add-tag/add-tag.component';
import { ViewTagComponent } from './view-tag/view-tag.component';

@NgModule({
  declarations: [  
    AddTagComponent,
    ViewTagComponent,
  ], 
  imports: [ 
    CommonModule,
    TagRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    BlogModule
  ],
})
export class TagModule { }
