import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartypeRoutingModule } from './cartype-routing.module';
import { AddCartypeComponent } from './add-cartype/add-cartype.component';
import { ViewCartypeComponent } from './view-cartype/view-cartype.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AddCartypeComponent,
    ViewCartypeComponent
  ],
  imports: [
    CommonModule,
    CartypeRoutingModule,
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
export class CartypeModule { }
