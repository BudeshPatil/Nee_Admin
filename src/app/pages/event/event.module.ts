import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { ViewEventComponent } from './view-event/view-event.component';
import { AddEventComponent } from './add-event/add-event.component';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from '../../pipes/pipemodule.module';

@NgModule({
	declarations: [
		ViewEventComponent,
		AddEventComponent
	],
	imports: [
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
export class EventModule { }
