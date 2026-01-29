import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { ViewAboutComponent } from './view-about/view-about.component';


const routes: Routes = [
  {
    path:'add',
    component : EditAboutComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewAboutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditAboutComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewAboutComponent,
    canActivate: [AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
