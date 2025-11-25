import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { ClipboardModule } from 'ngx-clipboard';
import { BodytypeRoutingModule } from './bodytype-routing.module';
import { AddBoudytypeComponent } from './add-boudytype/add-boudytype.component';
import { ViewBoudytypeComponent } from './view-boudytype/view-boudytype.component';

@NgModule({
  declarations: [
    AddBoudytypeComponent,
    ViewBoudytypeComponent
  ],
  imports: [
    CommonModule,
    BodytypeRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
		BlogModule,
    PageModule,
    ClipboardModule,
    NgMultiSelectDropDownModule,
    DatamoduleModule
  ]
})
export class BodytypeModule { }
