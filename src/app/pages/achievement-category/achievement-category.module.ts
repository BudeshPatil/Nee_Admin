import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementCategoryRoutingModule } from './achievement-category-routing.module';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogModule } from '../blog/blog.module';


@NgModule({
  declarations: [
    AddCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    AchievementCategoryRoutingModule,
		HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    BlogModule
  ]
})
export class AchievementCategoryModule { }
