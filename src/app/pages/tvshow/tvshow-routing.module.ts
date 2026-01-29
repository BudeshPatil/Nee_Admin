import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTvshowComponent } from './add-tvshow/add-tvshow.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewTvshowComponent } from './view-tvshow/view-tvshow.component';

const routes: Routes = [
  {
    path:'add',
    component : AddTvshowComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewTvshowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddTvshowComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewTvshowComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TvshowRoutingModule { }
