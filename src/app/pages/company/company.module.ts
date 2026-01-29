import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';


import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUploaderModule } from 'ngx-uploader';
import { BlogModule } from '../blog/blog.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from '../../pipemodule.module';
import { CompanyAddComponent } from './company-add/company-add.component';
import { CompanyViewComponent } from './company-view/company-view.component';

@NgModule({
	declarations: [
  CompanyAddComponent,
  CompanyViewComponent
	],
	imports: [
		CommonModule,
		CompanyRoutingModule,
		AngularEditorModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		NgxUploaderModule,
		BlogModule,
		Ng2SearchPipeModule,
		NgToggleModule,
		PipemoduleModule
	]
})
export class CompanyModule { }
