import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TeamsRoutingModule } from './teams-routing.module';

import { AddTeamsComponent } from './add-teams/add-teams.component';
import { ViewTeamsComponent } from './view-teams/view-teams.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AddTeamsComponent,
    ViewTeamsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
  ]
})
export class TeamsModule { }
