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
import { PodcastRoutingModule } from './podcast-routing.module';
import { AddPodcastComponent } from './add-podcast/add-podcast.component';
import { ViewPodcastComponent } from './view-podcast/view-podcast.component';
import { AngMusicPlayerModule } from  'ang-music-player';

@NgModule({
  declarations: [
    AddPodcastComponent,
    ViewPodcastComponent
  ],
  imports: [
    CommonModule,
    PodcastRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    PageModule,
    BlogModule,
    Ng2SearchPipeModule,
    UiSwitchModule,
    PipemoduleModule,
    AngMusicPlayerModule
  ]
})
export class PodcastModule { }
