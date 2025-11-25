import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCollectioncatComponent } from './view-collectioncat/view-collectioncat.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddCollectioncatComponent } from './add-collectioncat/add-collectioncat.component';

const routes: Routes = [
  
  {
    path: "",
    component: ViewCollectioncatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "add",
    component: AddCollectioncatComponent,
    canActivate: [AuthGuard],
    data: { title: 'add' },
  },
  {
    path: "view",
    component: ViewCollectioncatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddCollectioncatComponent,
    canActivate: [AuthGuard],
    data: { title: 'edit' },
  },
  {
    path: "**",
    component: ViewCollectioncatComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionCategoryRoutingModule { }
