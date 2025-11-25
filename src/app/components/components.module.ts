import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NgToggleModule } from 'ng-toggle-button';
// import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgToggleModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
