import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { ViewAboutComponent } from './view-about/view-about.component';
import { PipemoduleModule } from 'src/app/pipemodule.module';
import { NgToggleModule } from 'ng-toggle-button';
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
    NgxQrcodeStylingModule,
		Ng2SearchPipeModule,
    NgToggleModule,
    PipemoduleModule
  ],

})
export class AboutModule { }
