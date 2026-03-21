import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomeBannerViewComponent } from './home-banner/home-banner-view/home-banner-view.component';
import { HomeBannerEditComponent } from './home-banner/home-banner-edit/home-banner-edit.component';

import { PageModule } from '../page/page.module';
import { BlogModule } from '../blog/blog.module';// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PipemoduleModule } from '../../pipemodule.module';
import { HomeAboutEditComponent } from './home-about/home-about-edit/home-about-edit.component';
import { HomeAboutViewComponent } from './home-about/home-about-view/home-about-view.component';
@NgModule({
	declarations: [
		HomeBannerViewComponent,
		HomeBannerEditComponent,
		HomeAboutEditComponent,
		HomeAboutViewComponent
	],
	imports: [
		CommonModule,
		HomepageRoutingModule,
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
export class HomepageModule { }
