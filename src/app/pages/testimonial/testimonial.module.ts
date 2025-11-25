import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialRoutingModule } from './testimonial-routing.module';
import { ViewTestimonialComponent } from './view-testimonial/view-testimonial.component';
import { AddTestimonialComponent } from './add-testimonial/add-testimonial.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';

@NgModule({
  declarations: [
    ViewTestimonialComponent,
    AddTestimonialComponent
  ],
  imports: [
    CommonModule,
    TestimonialRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule,
    NgToggleModule
  ]
})
export class TestimonialModule { }
