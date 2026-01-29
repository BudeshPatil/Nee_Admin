import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AuthorRoutingModule } from './author-routing.module';
import { BlogModule } from '../blog/blog.module';
import { AddAuthorComponent } from './add-author/add-author.component';
import { ViewAuthorComponent } from './view-author/view-author.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddAuthorComponent,
    ViewAuthorComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    BlogModule,
    Ng2SearchPipeModule
  ]
})
export class AuthorModule { }
