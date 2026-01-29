import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutpageRoutingModule } from './aboutpage-routing.module';
import { AboutBannerViewComponent } from './about-banner/about-banner-view/about-banner-view.component';
import { AboutBannerEditComponent } from './about-banner/about-banner-edit/about-banner-edit.component';
import { AboutEditComponent } from './about/about-edit/about-edit.component';
import { AboutViewComponent } from './about/about-view/about-view.component';


import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from '../../pipemodule.module';


@NgModule({
	declarations: [
		AboutBannerViewComponent,
		AboutBannerEditComponent,
		AboutEditComponent,
		AboutViewComponent
	],
	imports: [
		CommonModule,
		AboutpageRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		PageModule,
		BlogModule,
		Ng2SearchPipeModule,
		NgToggleModule,
		PipemoduleModule
	]
})
export class AboutpageModule { }
