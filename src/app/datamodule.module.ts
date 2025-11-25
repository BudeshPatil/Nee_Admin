import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';

// Libraries include
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './components/pagination/pagination.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgToggleModule } from 'ng-toggle-button';
import { PipemoduleModule } from './pipes/pipemodule.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, 
    NgxUploaderModule,
    AngularEditorModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgToggleModule,
    PipemoduleModule,
    DragDropModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule,
  ],
  exports:[PaginationComponent,PipemoduleModule]
})
export class DatamoduleModule { }
