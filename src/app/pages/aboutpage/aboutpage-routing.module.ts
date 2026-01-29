import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutBannerEditComponent } from './about-banner/about-banner-edit/about-banner-edit.component';
import { AboutBannerViewComponent } from './about-banner/about-banner-view/about-banner-view.component';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { AboutComponent } from '../about/about.component';
import { AboutEditComponent } from './about/about-edit/about-edit.component';
import { AboutViewComponent } from './about/about-view/about-view.component';

const routes: Routes = [
	{
		path: 'banner-add',
		component: AboutBannerEditComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'banner-view',
		component: AboutBannerViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'banner-edit/:id',
		component: AboutBannerEditComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},

	{
		path: 'about-add',
		component: AboutEditComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'about-view',
		component: AboutViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'about-edit/:id',
		component: AboutEditComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutpageRoutingModule { }
