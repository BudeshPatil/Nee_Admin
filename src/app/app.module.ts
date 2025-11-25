//Built in Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
// Libraries include
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ClipboardModule } from 'ngx-clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgToggleModule } from 'ng-toggle-button';

//Created modules
import { PipemoduleModule } from './pipes/pipemodule.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxUploaderModule,
    AngularEditorModule,
    ToastrModule.forRoot(),
    // NgxQrcodeStylingModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    NgToggleModule.forRoot(),
    PipemoduleModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ClipboardModule,
    DragDropModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  exports:[PipemoduleModule]
})
export class AppModule { }
