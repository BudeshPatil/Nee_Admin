import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColourRoutingModule } from './colour-routing.module';
import { ViewColourComponent } from './view-colour/view-colour.component';
import { AddColourComponent } from './add-colour/add-colour.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ViewColourComponent,
    AddColourComponent
  ],
  imports: [
    CommonModule,
    ColourRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class ColourModule { }
