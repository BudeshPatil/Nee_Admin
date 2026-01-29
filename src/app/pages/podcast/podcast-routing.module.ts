import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPodcastComponent } from './add-podcast/add-podcast.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewPodcastComponent } from './view-podcast/view-podcast.component';

const routes: Routes = [
  {
    path:'add',
    component : AddPodcastComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewPodcastComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddPodcastComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewPodcastComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule { }
