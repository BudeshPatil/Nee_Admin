import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromocodeRoutingModule } from './promocode-routing.module';
import { AddPromocodeComponent } from './add-promocode/add-promocode.component';
import { ViewPromocodeComponent } from './view-promocode/view-promocode.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddPromocodeComponent,
    ViewPromocodeComponent
  ],
  imports: [
    CommonModule,
    PromocodeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class PromocodeModule { }
