import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewColourComponent } from './view-colour/view-colour.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AddColourComponent } from './add-colour/add-colour.component';

const routes: Routes = [
  
  { 
    path: "", 
    component: ViewColourComponent, 
    canActivate: [AuthGuard]
   },
   {
    path: "add",
    component : AddColourComponent,
    canActivate: [AuthGuard],
    data: {title: 'add'},
  },
  {
    path: "view",
    component : ViewColourComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddColourComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
   },
   { 
    path: "**", 
    component: ViewColourComponent, 
    canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColourRoutingModule { }
