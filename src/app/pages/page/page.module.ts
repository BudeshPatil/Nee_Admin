import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';

import { PageRoutingModule } from './page-routing.module';
import { BlogModule } from '../blog/blog.module';
import { AddPageComponent } from './add-page/add-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewHomeComponent } from './view-home/view-home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AddPageComponent,
    ViewPageComponent,
    HomePageComponent,
    ViewHomeComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    BlogModule,
    Ng2SearchPipeModule
  ]
})
export class PageModule { }
