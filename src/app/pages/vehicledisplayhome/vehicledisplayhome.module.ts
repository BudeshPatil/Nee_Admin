import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicledisplayhomeRoutingModule } from './vehicledisplayhome-routing.module';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { DatamoduleModule } from 'src/app/datamodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ViewVehicleComponent
  ],
  imports: [
    CommonModule,
    VehicledisplayhomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    AngularEditorModule,
    Ng2SearchPipeModule,
    DatamoduleModule
  ]
})
export class VehicledisplayhomeModule { }
