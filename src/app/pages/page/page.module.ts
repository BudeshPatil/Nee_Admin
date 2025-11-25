import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { ViewPageComponent } from './view-page/view-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { ViewHomeComponent } from './view-home/view-home.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    ViewPageComponent,
    AddPageComponent,
    ViewHomeComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class PageModule { }
