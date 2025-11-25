import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRoutingModule } from './vehicle-routing.module';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { BlogModule } from '../blog/blog.module';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DatamoduleModule } from 'src/app/datamodule.module';

@NgModule({
  declarations: [
    AddVehicleComponent,
    ViewVehicleComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgxUploaderModule,
		AngularEditorModule,
		BlogModule,
		NgSelectModule,
		Ng2SearchPipeModule,
		NgToggleModule,
		DatamoduleModule,
    NgbModule,
    NgMultiSelectDropDownModule
  ]
})
export class VehicleModule { }
