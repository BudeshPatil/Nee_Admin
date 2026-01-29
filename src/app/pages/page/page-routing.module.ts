import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Add Component
import { AddPageComponent } from './add-page/add-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewHomeComponent } from './view-home/view-home.component';

// Auth Services
import {AuthGuard} from '../../guard/auth.guard';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: AddPageComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
  {
    path:'view',
    component : ViewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'homepage',
    component : ViewHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home-edit/:id',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   {
     path: 'addpage',
     component: AddPageComponent,
     canActivate: [AuthGuard],
     data: {title: 'add'},
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
