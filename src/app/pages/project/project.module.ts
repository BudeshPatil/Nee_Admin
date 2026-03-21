import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { BlogModule } from '../blog/blog.module';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PipemoduleModule } from '../../pipemodule.module';

@NgModule({
	declarations: [
		AddProjectComponent,
		ViewProjectComponent
	],
	imports: [
		CommonModule,
		ProjectRoutingModule,
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
export class ProjectModule { }
