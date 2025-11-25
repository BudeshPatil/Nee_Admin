import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributesRoutingModule } from './attributes-routing.module';
import { AddAttributesComponent } from './add-attributes/add-attributes.component';
import { ViewAttributesComponent } from './view-attributes/view-attributes.component';
import { AttributesetAddComponent } from './attributeset-add/attributeset-add.component';
import { AttributesetViewComponent } from './attributeset-view/attributeset-view.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AddAttributesComponent,
    ViewAttributesComponent,
    AttributesetAddComponent,
    AttributesetViewComponent
  ],
  imports: [
    CommonModule,
    AttributesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule,
    DragDropModule
  ]
})
export class AttributesModule { }
