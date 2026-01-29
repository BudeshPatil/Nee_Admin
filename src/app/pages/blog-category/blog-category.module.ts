import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CategoryRoutingModule } from './blog-category-routing.module';
import { AddCategoryComponent } from './add-blog-category/add-blog-category.component';
import { ViewCategoryComponent } from './view-blog-category/view-blog-category.component';



@NgModule({
  declarations: [
    AddCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule
  ]
})
export class BlogCategoryModule { }
