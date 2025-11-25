import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewPageComponent } from './view-page/view-page.component';
import { ViewHomeComponent } from './view-home/view-home.component';
import { HomePageComponent } from './home-page/home-page.component';

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
