import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guard/auth.guard';
import { AddGalleryComponent } from './add-gallery/add-gallery.component';
import { ViewGalleryComponent } from './view-gallery/view-gallery.component';

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
