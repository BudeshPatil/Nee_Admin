import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PipemoduleModule } from '../../pipemodule.module';

import { TvshowRoutingModule } from './tvshow-routing.module';
import { AddTvshowComponent } from './add-tvshow/add-tvshow.component';
import { ViewTvshowComponent } from './view-tvshow/view-tvshow.component';


@NgModule({
  declarations: [
    AddTvshowComponent,
    ViewTvshowComponent
  ],
  imports: [
    CommonModule,
    TvshowRoutingModule,
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
export class TvshowModule { }
