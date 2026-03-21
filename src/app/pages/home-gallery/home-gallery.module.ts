import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { GalleryRoutingModule } from './home-gallery-routing.module';
import { AddGalleryComponent } from './add-home-gallery/add-home-gallery.component';
import { ViewGalleryComponent } from './view-home-gallery/view-home-gallery.component';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PipemoduleModule } from '../../pipemodule.module';

@NgModule({
  declarations: [
    AddGalleryComponent,
    ViewGalleryComponent
  ],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    PageModule,
    BlogModule,
    Ng2SearchPipeModule,
    UiSwitchModule,
    PipemoduleModule
  ]
})
export class GalleryModule { }
