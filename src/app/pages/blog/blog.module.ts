import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { EventRoutingModule } from '../event/event-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from 'src/app/pipes/pipemodule.module';


@NgModule({
	declarations: [
		AddBlogComponent,
		ViewBlogComponent
	],
	imports: [
		CommonModule,
		BlogRoutingModule,
		CommonModule,
		EventRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		Ng2SearchPipeModule,
		NgToggleModule,
		PipemoduleModule
	]
})
export class BlogModule { }
