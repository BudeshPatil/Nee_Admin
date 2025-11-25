import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';

const routes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'attribute',
		loadChildren: () => import("./../../pages/attributes/attributes.module").then((m) => m.AttributesModule),
		data: { title: 'Attributes Module' },
	},
	{
		path: 'banner',
		loadChildren: () => import("./../../pages/banner-image/banner-image.module").then((m) => m.BannerImageModule),
		data: { title: 'Banner Image Module' },
	},
	{
		path: 'auth',
		loadChildren: () => import("./../../pages/auth/auth.module").then((m) => m.AuthModule),
		data: { title: 'Auth Module' },
	},
	{
		path: 'author',
		loadChildren: () => import("./../../pages/author/author.module").then((m) => m.AuthorModule),
		data: { title: 'Author Module' },
	},
	{
		path: 'blog',
		loadChildren: () => import("./../../pages/blog/blog.module").then((m) => m.BlogModule),
		data: { title: 'Blog Module' },
	},
	{
		path: 'category',
		loadChildren: () => import("./../../pages/category/category.module").then((m) => m.CategoryModule),
		data: { title: 'Category Module' },
	},
	{
		path: 'subcategory',
		loadChildren: () => import("./../../pages/subcategory/subcategory.module").then((m) => m.SubcategoryModule),
		data: { title: 'Sub-Category Module' },
	},
	{
		path: 'cart',
		loadChildren: () => import("./../../pages/cart/cart.module").then((m) => m.CartModule),
		data: { title: 'Cart Module' },
	},
	{
		path: 'brand',
		loadChildren: () => import("./../../pages/brand/brand.module").then((m) => m.BrandModule),
		data: { title: 'Brand Module' },
	},
	{
		path: 'bodytype',
		loadChildren: () => import("./../../pages/bodytype/bodytype.module").then((m) => m.BodytypeModule),
		data: { title: 'Body Type Module' },
	},
	{
		path: 'cartype',
		loadChildren: () => import("./../../pages/cartype/cartype.module").then((m) => m.CartypeModule),
		data: { title: 'Cart Type Module' },
	},
	{
		path: 'colour',
		loadChildren: () => import("./../../pages/colour/colour.module").then((m) => m.ColourModule),
		data: { title: 'Colour Module' },
	},
	{
		path: 'collection',
		loadChildren: () => import("./../../pages/collection/collection.module").then((m) => m.CollectionModule),
		data: { title: 'Collection Module' },
	},
	{
		path: 'collection-category',
		loadChildren: () => import("./../../pages/collection-category/collection-category.module").then((m) => m.CollectionCategoryModule),
		data: { title: 'Collection Category Module' },
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
		path: 'customer',
		loadChildren: () => import("./../../pages/customer/customer.module").then((m) => m.CustomerModule),
		data: { title: 'Customer Module' },
	},
	{
		path: 'customer-groups',
		loadChildren: () => import("./../../pages/customer-group/customer-group.module").then((m) => m.CustomerGroupModule),
		data: { title: 'Customer Group Module' },
	},
	{
		path: 'displayonhome',
		loadChildren: () => import("./../../pages/displayonhome/displayonhome.module").then((m) => m.DisplayonhomeModule),
		data: { title: 'Display on Home' },
	},
	{
		path: 'displayonhomevehicle',
		loadChildren: () => import("./../../pages/vehicledisplayhome/vehicledisplayhome.module").then((m) => m.VehicledisplayhomeModule),
		data: { title: 'Display on Home Vehicle' },
	},
	{
		path: 'displayonhomeyatchs',
		loadChildren: () => import("./../../pages/displayonhomeyatchs/displayonhomeyatchs.module").then((m) => m.DisplayonhomeyatchsModule),
		data: { title: 'Display on Home Yatchs' },
	},
	{
		path: 'event',
		loadChildren: () => import("./../../pages/event/event.module").then((m) => m.EventModule),
		data: { title: 'Event Module' },
	},
	{
		path: 'feature',
		loadChildren: () => import("./../../pages/feature/feature.module").then((m) => m.FeatureModule),
		data: { title: 'Feature Module' },
	},
	{
		path: 'featured',
		loadChildren: () => import("./../../pages/feature-product/feature-product.module").then((m) => m.FeatureProductModule),
		data: { title: 'Featured Product on Home' },
	},
	{
		path: 'location',
		loadChildren: () => import("./../../pages/location/location.module").then((m) => m.LocationModule),
		data: { title: 'Location on Home' },
	},
	{
		path: 'media',
		loadChildren: () => import("./../../pages/media/media.module").then((m) => m.MediaModule),
		data: { title: 'Media Module' },
	},
	{
		path: 'model',
		loadChildren: () => import("./../../pages/model/model.module").then((m) => m.ModelModule),
		data: { title: 'Model Module' },
	},
	{
		path: 'order',
		loadChildren: () => import("./../../pages/order/order.module").then((m) => m.OrderModule),
		data: { title: 'Order Module' },
	},
	{
		path: 'page',
		loadChildren: () => import("./../../pages/page/page.module").then((m) => m.PageModule),
		data: { title: 'Page Module' },
	},
	{
		path: 'payments',
		loadChildren: () => import("./../../pages/payment-method/payment-method.module").then((m) => m.PaymentMethodModule),
		data: { title: 'Payments Module' },
	},
	{
		path: 'product',
		loadChildren: () => import("./../../pages/product/product.module").then((m) => m.ProductModule),
		data: { title: 'Product Module' },
	},
	{
		path: 'promocode',
		loadChildren: () => import("./../../pages/promocode/promocode.module").then((m) => m.PromocodeModule),
		data: { title: 'PromoCode Module' },
	},
	{
		path: 'report',
		loadChildren: () => import("./../../pages/report/report.module").then((m) => m.ReportModule),
		data: { title: 'Report' },
	},
	{
		path: 'response',
		loadChildren: () => import("./../../pages/response/response.module").then((m) => m.ResponseModule),
		data: { title: 'Response' },
	},
	{
		path: 'return',
		loadChildren: () => import("./../../pages/return/return.module").then((m) => m.ReturnModule),
		data: { title: 'Return Module' },
	},
	{
		path: 'shipping',
		loadChildren: () => import("./../../pages/shipping/shipping.module").then((m) => m.ShippingModule),
		data: { title: 'Shipping Module' },
	},
	{
		path: 'shopby',
		loadChildren: () => import("./../../pages/shopby/shopby.module").then((m) => m.ShopbyModule),
		data: { title: 'Shop By Collection' },
	},
	{
		path: 'size',
		loadChildren: () => import("./../../pages/size/size.module").then((m) => m.SizeModule),
		data: { title: 'Size Module' },
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
		path: 'vehicle',
		loadChildren: () => import("./../../pages/vehicle/vehicle.module").then((m) => m.VehicleModule),
		data: { title: 'Vehicle Module' },
	},
	{
		path: 'wallet',
		loadChildren: () => import("./../../pages/wallet/wallet.module").then((m) => m.WalletModule),
		data: { title: 'Wallet' },
	},
	{
		path: 'wishlist',
		loadChildren: () => import("./../../pages/wishlist/wishlist.module").then((m) => m.WishlistModule),
		data: { title: 'Wishlist Module' },
	},
	{
		path: 'additional',
		loadChildren: () => import("./../../pages/additional-requirements/additional-requirements.module").then((m) => m.AdditionalRequirementsModule),
		data: { title: 'AdditionalRequirement Module' },
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminLayoutRoutingModule { }
