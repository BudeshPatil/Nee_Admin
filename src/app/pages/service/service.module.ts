import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceRoutingModule } from './service-routing.module';
import { AddServiceComponent } from './add-service/add-service.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogModule } from '../blog/blog.module';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PipemoduleModule } from '../../pipemodule.module';

@NgModule({
  declarations: [
    AddServiceComponent,
    ViewServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		BlogModule,
		NgSelectModule,
    Ng2SearchPipeModule,
    UiSwitchModule,
    PipemoduleModule
  ]
})
export class ServiceModule { }
