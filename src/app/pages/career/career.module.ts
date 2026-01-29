import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { NgxPaginationModule } from 'ngx-pagination';
import { BlogModule } from '../blog/blog.module';


import { CareerRoutingModule } from './career-routing.module';
import { AddCareerComponent } from './add-career/add-career.component';
import { ViewCareerComponent } from './view-career/view-career.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddCareerComponent,
    ViewCareerComponent
  ],
  imports: [
    CommonModule,
    CareerRoutingModule,
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
export class CareerModule { }
