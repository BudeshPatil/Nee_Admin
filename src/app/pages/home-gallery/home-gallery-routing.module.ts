import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AddGalleryComponent } from './add-home-gallery/add-home-gallery.component';
import { ViewGalleryComponent } from './view-home-gallery/view-home-gallery.component';

const routes: Routes = [
  {
    path:'add',
    component : AddGalleryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddGalleryComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'view',
    component : ViewGalleryComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
