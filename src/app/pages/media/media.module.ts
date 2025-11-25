import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { ViewMediaComponent } from './view-media/view-media.component';
import { EditMediaComponent } from './edit-media/edit-media.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    ViewMediaComponent,
    EditMediaComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule,
    ClipboardModule
  ]
})
export class MediaModule { }
