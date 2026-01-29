import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';

import { TestimonialRoutingModule } from './testimonial-routing.module';
import { BlogModule } from '../blog/blog.module';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { ViewTestimonialComponent } from './view-testimonial/view-testimonial.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from '../../pipemodule.module';

@NgModule({ 
  declarations: [
    AddTestimonialComponent,
    ViewTestimonialComponent
  ], 
  imports: [
    CommonModule,
    TestimonialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUploaderModule,
    BlogModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    NgToggleModule,
    PipemoduleModule
  ]
})
export class TestimonialModule { }
