import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guard/auth.guard';


export const AdminLayoutRoutes: Routes = [
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
	{ path: 'tables', component: TablesComponent, canActivate: [AuthGuard] },
	{ path: 'icons', component: IconsComponent, canActivate: [AuthGuard] },
	{ path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
	{
		path: 'page',
		loadChildren: () => import("./../../pages/page/page.module").then((m) => m.PageModule),
		data: { title: 'Page Module' },
	},
	{
		path: 'service',
		loadChildren: () => import("./../../pages/service/service.module").then((m) => m.ServiceModule),
		data: { title: 'Service Module' },
	},
	{
		path: 'banner-images',
		loadChildren: () => import("./../../pages/banner-image/banner-image.module").then((m) => m.BannerImageModule),
		data: { title: 'Banner Image Module' },
	},
	{
		path: 'blog',
		loadChildren: () => import("./../../pages/blog/blog.module").then((m) => m.BlogModule),
		data: { title: 'Blog Module' },
	},
	{
		path: 'blog-category',
		loadChildren: () => import("./../../pages/blog-category/blog-category.module").then((m) => m.BlogCategoryModule),
		data: { title: 'Blog Category Module' },
	},
	{
		path: 'career',
		loadChildren: () => import("./../../pages/career/career.module").then((m) => m.CareerModule),
		data: { title: 'Career Module' },
	},
	{
		path: 'config',
		loadChildren: () => import("./../../pages/config/config.module").then((m) => m.ConfigModule),
		data: { title: 'Config Module' },
	},
	{
		path: 'contact',
		loadChildren: () => import("./../../pages/contact/contact.module").then((m) => m.ContactModule),
		data: { title: 'Contact Module' },
	},
	{
		path: 'gallery',
		loadChildren: () => import("./../../pages/gallery/gallery.module").then((m) => m.GalleryModule),
		data: { title: 'Gallery Module' },
	},
	{
		path: 'subscriber',
		loadChildren: () => import("./../../pages/subscriber/subscriber.module").then((m) => m.SubscriberModule),
		data: { title: 'Subscriber Module' },
	},
	{
		path: 'testimonial',
		loadChildren: () => import("./../../pages/testimonial/testimonial.module").then((m) => m.TestimonialModule),
		data: { title: 'Testimonial Module' },
	},
	{
		path: 'author',
		loadChildren: () => import("./../../pages/author/author.module").then((m) => m.AuthorModule),
		data: { title: 'Author Module' },
	},
	{
		path: 'tag',
		loadChildren: () => import("./../../pages/tag/tag.module").then((m) => m.TagModule),
		data: { title: 'Tag Module' },
	},
	{
		path: 'auth',
		loadChildren: () => import("./../../pages/auth/auth.module").then((m) => m.AuthModule),
		data: { title: 'Users Module' },
	},
	{
		path: 'project',
		loadChildren: () => import("./../../pages/project/project.module").then((m) => m.ProjectModule),
		data: { title: 'Project Module' },
	},
	{
		path: 'catalog',
		loadChildren: () => import("./../../pages/catalog/catalog.module").then((m) => m.CatalogModule),
		data: { title: 'Catalog Module' },
	},
	{
		path: 'client',
		loadChildren: () => import("./../../pages/client/client.module").then((m) => m.ClientModule),
		data: { title: 'Client Module' },
	},
	{
		path: 'position',
		loadChildren: () => import("./../../pages/position/position.module").then((m) => m.PositionModule),
		data: { title: 'Position Module' },
	},
	{
		path: 'download',
		loadChildren: () => import("./../../pages/download/download.module").then((m) => m.DownloadModule),
		data: { title: 'Download Module' },
	},
	{
		path: 'category',
		loadChildren: () => import("./../../pages/category/category.module").then((m) => m.CategoryModule),
		data: { title: 'Category Module' },
	},
	{
		path: 'award',
		loadChildren: () => import("./../../pages/award/award.module").then((m) => m.AwardModule),
		data: { title: 'Award Module' },
	},
	{
		path: 'achievement',
		loadChildren: () => import("./../../pages/achievement/achievement.module").then((m) => m.AchievementModule),
		data: { title: 'Achievement Module' },
	},
	{
		path: 'podcast',
		loadChildren: () => import("./../../pages/podcast/podcast.module").then((m) => m.PodcastModule),
		data: { title: 'Podcast Module' },
	},
	{
		path: 'socialactivity',
		loadChildren: () => import("./../../pages/socialactivity/socialactivity.module").then((m) => m.SocialactivityModule),
		data: { title: 'Social Activity Module' },
	},
	{
		path: 'course',
		loadChildren: () => import("./../../pages/course/course.module").then((m) => m.CourseModule),
		data: { title: 'Course Module' },
	},
	{
		path: 'tvshow',
		loadChildren: () => import("./../../pages/tvshow/tvshow.module").then((m) => m.TvshowModule),
		data: { title: 'Tv Show Module' },
	},
	{
		path: 'student',
		loadChildren: () => import("./../../pages/student/student.module").then((m) => m.StudentModule),
		data: { title: 'Student Module' },
	},
	{
		path: 'podcast-category',
		loadChildren: () => import("./../../pages/podcast-category/podcast-category.module").then((m) => m.PodcastCategoryModule),
		data: { title: 'Podcast Category Module' },
	},
	{
		path: 'podcast-comments',
		loadChildren: () => import("./../../pages/podcast-comments/podcast-comments.module").then((m) => m.PodcastCommentsModule),
		data: { title: 'Podcast Comments Module' },
	},
	{
		path: 'about',
		loadChildren: () => import("./../../pages/about/about.module").then((m) => m.AboutModule),
		data: { title: 'About Module' },
	},
	{
		path: 'achievement-category',
		loadChildren: () => import("./../../pages/achievement-category/achievement-category.module").then((m) => m.AchievementCategoryModule),
		data: { title: 'Achievement Module' }
	},
	{
		path: 'counter',
		loadChildren: () => import("./../../pages/counter/counter.module").then((m) => m.CounterModule),
		data: { title: 'Counter Module' }
	},
	{
		path: 'homegallery',
		loadChildren: () => import("./../../pages/home-gallery/home-gallery.module").then((m) => m.GalleryModule),
		data: { title: 'Home Gallery Module' },
	},
	{
		path: 'company',
		loadChildren: () => import("./../../pages/company/company.module").then((m) => m.CompanyModule),
		data: { title: 'Company Module' },
	},
	{
		path: 'homepage',
		loadChildren: () => import("./../../pages/homepage/homepage.module").then((m) => m.HomepageModule),
		data: { title: 'Homepage Module' },
	},
	{
		path: 'aboutpage',
		loadChildren: () => import("./../../pages/aboutpage/aboutpage.module").then((m) => m.AboutpageModule),
		data: { title: 'About Module' },
	},
];
