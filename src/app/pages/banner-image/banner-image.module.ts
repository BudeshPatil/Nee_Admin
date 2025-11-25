import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerImageRoutingModule } from './banner-image-routing.module';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { ViewBannerComponent } from './view-banner/view-banner.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddBannerComponent,
    ViewBannerComponent
  ],
  imports: [
    CommonModule,
    BannerImageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class BannerImageModule { }
