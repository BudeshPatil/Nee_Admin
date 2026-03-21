import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { ViewAboutComponent } from './view-about/view-about.component';
import { PipemoduleModule } from 'src/app/pipemodule.module';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AboutComponent,
    EditAboutComponent,
    ViewAboutComponent
  ],
  imports: [
    AboutRoutingModule,
    CommonModule,
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
  ],

})
export class AboutModule { }
