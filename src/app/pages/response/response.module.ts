import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponseRoutingModule } from './response-routing.module';
import { ViewResponseComponent } from './view-response/view-response.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ViewResponseComponent
  ],
  imports: [
    CommonModule,
    ResponseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class ResponseModule { }
