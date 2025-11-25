import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayonhomeyatchsRoutingModule } from './displayonhomeyatchs-routing.module';
import { ViewYatchsComponent } from './view-yatchs/view-yatchs.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ViewYatchsComponent
  ],
  imports: [
    CommonModule,
    DisplayonhomeyatchsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class DisplayonhomeyatchsModule { }
