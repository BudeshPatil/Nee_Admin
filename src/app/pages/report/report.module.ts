import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { ViewLastSearchComponent } from './view-last-search/view-last-search.component';
import { ViewTopSearchComponent } from './view-top-search/view-top-search.component';
import { MostViewedComponent } from './most-viewed/most-viewed.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    BestSellerComponent,
    ViewLastSearchComponent,
    ViewTopSearchComponent,
    MostViewedComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class ReportModule { }
