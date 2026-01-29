import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAchievementComponent } from './add-achievement/add-achievement.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { ViewAchievementComponent } from './view-achievement/view-achievement.component';

const routes: Routes = [
  {
    path:'add',
    component : AddAchievementComponent,
    canActivate: [AuthGuard],
  },
  {
    path:'view',
    component : ViewAchievementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: AddAchievementComponent,
    canActivate: [AuthGuard],
    data: {title: 'edit'},
  },
  {
    path:'**',
    component : ViewAchievementComponent,
    canActivate: [AuthGuard],
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AchievementRoutingModule { }
