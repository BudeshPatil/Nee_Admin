import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogModule } from '../blog/blog.module';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PodcastCommentsRoutingModule } from './podcast-comments-routing.module';
import { AddCommentsComponent } from './add-comments/add-comments.component';
import { ViewCommentsComponent } from './view-comments/view-comments.component';


@NgModule({
  declarations: [
    AddCommentsComponent,
    ViewCommentsComponent
  ],
  imports: [
    CommonModule,
    PodcastCommentsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    BlogModule,
    NgbModule
  ]
})
export class PodcastCommentsModule { }
