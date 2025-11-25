import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWishlistComponent } from './add-wishlist/add-wishlist.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewWishlistComponent } from './view-wishlist/view-wishlist.component';

const routes: Routes = [
  {
    path: "add",
    component : AddWishlistComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewWishlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddWishlistComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewWishlistComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
