import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayonhomeRoutingModule } from './displayonhome-routing.module';
import { ViewProductdComponent } from './view-productd/view-productd.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ViewProductdComponent
  ],
  imports: [
    CommonModule,
    DisplayonhomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class DisplayonhomeModule { }
