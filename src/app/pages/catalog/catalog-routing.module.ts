import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCatalogComponent } from './add-catalog/add-catalog.component';
import { ViewCatalogComponent } from './view-catalog/view-catalog.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path:'add',
    component : AddCatalogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCatalogComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'view',
    component : ViewCatalogComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
