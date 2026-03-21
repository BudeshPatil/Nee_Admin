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

import { AchievementRoutingModule } from './achievement-routing.module';
import { AddAchievementComponent } from './add-achievement/add-achievement.component';
import { ViewAchievementComponent } from './view-achievement/view-achievement.component';


@NgModule({
  declarations: [
    AddAchievementComponent,
    ViewAchievementComponent
  ],
  imports: [
    CommonModule,
    AchievementRoutingModule,
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
export class AchievementModule { }
