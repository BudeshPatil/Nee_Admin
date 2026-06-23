import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceonrequestRoutingModule } from './priceonrequest-routing.module';
import { ViewpricesComponent } from './viewprices/viewprices.component';
import { BlogModule } from '../blog/blog.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ViewpricesComponent
  ],
  imports: [
    CommonModule,
    PriceonrequestRoutingModule,
    BlogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PriceonrequestModule { }
