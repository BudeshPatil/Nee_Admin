import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnRoutingModule } from './return-routing.module';
import { AddReturnComponent } from './add-return/add-return.component';
import { ViewReturnComponent } from './view-return/view-return.component';
import { ViewReasonComponent } from './view-reason/view-reason.component';
import { AddReasonComponent } from './add-reason/add-reason.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddReturnComponent,
    ViewReturnComponent,
    ViewReasonComponent,
    AddReasonComponent
  ],
  imports: [
    CommonModule,
    ReturnRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class ReturnModule { }
