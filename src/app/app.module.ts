import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
// Libraries include
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUploaderModule } from 'ngx-uploader';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ng6-toastr-notifications';
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AngMusicPlayerModule } from  'ang-music-player';
import { UiSwitchModule } from 'ngx-ui-switch';
import { PipemoduleModule } from './pipemodule.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
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
    NgSelectModule,
    Ng2SearchPipeModule,
    UiSwitchModule,
    PipemoduleModule.forRoot(),
    AngMusicPlayerModule,
    UiSwitchModule
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
