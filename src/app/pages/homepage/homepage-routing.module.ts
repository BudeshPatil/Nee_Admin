import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { HomeBannerViewComponent } from './home-banner/home-banner-view/home-banner-view.component';
import { HomeBannerEditComponent } from './home-banner/home-banner-edit/home-banner-edit.component';
import { HomeAboutEditComponent } from './home-about/home-about-edit/home-about-edit.component';
import { HomeAboutViewComponent } from './home-about/home-about-view/home-about-view.component';

const routes: Routes = [
	{
		path: 'banner-add',
		component: HomeBannerEditComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'banner-view',
		component: HomeBannerViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'banner-edit/:id',
		component: HomeBannerEditComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},

	{
		path: 'about-add',
		component: HomeAboutEditComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'about-view',
		component: HomeAboutViewComponent,
		canActivate: [AuthGuard],
	},
	{
		path: 'about-edit/:id',
		component: HomeAboutEditComponent,
		canActivate: [AuthGuard],
		data: { title: 'edit' },
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomepageRoutingModule { }
