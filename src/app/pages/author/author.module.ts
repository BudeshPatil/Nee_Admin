import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AddAuthorComponent } from './add-author/add-author.component';
import { ViewAuthorComponent } from './view-author/view-author.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AddAuthorComponent,
    ViewAuthorComponent
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule,
    DragDropModule,
  ]
})
export class AuthorModule { }
