import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUploaderModule } from 'ngx-uploader';
import { BlogModule } from '../blog/blog.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from '../../pipemodule.module';

@NgModule({
  declarations: [
    ClientAddComponent,
    ClientViewComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
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
export class ClientModule { }
