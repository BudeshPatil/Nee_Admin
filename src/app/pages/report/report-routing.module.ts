import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { MostViewedComponent } from './most-viewed/most-viewed.component';
import { ViewLastSearchComponent } from './view-last-search/view-last-search.component';
import { ViewTopSearchComponent } from './view-top-search/view-top-search.component';

const routes: Routes = [
  {
    path: "best-seller",
    component : BestSellerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "most-viewed",
    component : MostViewedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "last-search-item",
    component : ViewLastSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "top-search-item",
    component : ViewTopSearchComponent,
    canActivate: [AuthGuard],
  },
   { 
    path: "**", 
    component: BestSellerComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
