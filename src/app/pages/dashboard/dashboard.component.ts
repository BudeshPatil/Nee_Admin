import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js';

// core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
//   chartExample3
// } from "../../variables/charts";
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { DataService } from '../../providers/data/data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OrderService } from 'src/app/providers/order/order.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	public datasets: any;
	public data: any;
	public salesChart: any;
	public pageChart: any;
	public clicked: boolean = true;
	public clicked1: boolean = false;
	allpage_count: any;
	blog_count: any;
	tag_count: any;
	author_count: any;
	testimonial_count: any;
	program_count: any;
	contact_count: any;
	career_count: any;
	user_count: any;
	banner_count: any;
	project_count: any;
	gallery_count: any;
	service_count: any;
	subscriber_count: any;
	catalog_count: any;
	cartCountValues: any;
	customer_count: any;
	new_customer: any;
	wishlist_count: any;
	order_average: any;
	order_lifetime: any;
	order_all: any;
	currency_type: any;
	cart_count: any;
	category_count: any;
	subcategory_count: any;
	collection_count: any;
	colors_count: any;
	sizes_count: any;
	events_count: any;
	products_count: any;
	orders_count: any;
	RMA_count: any;

	carType_count: any;
	bodyType_count: any;
	trendingCars_count: any;
	brand_count: any;
	vehicle_count: any;
	model_count: any;
	feature_count: any;
	cars_count: any;
	yachts_count: any;

	lastsearchterm: any = [];
	topsearchtems: any = [];
	mostviewedProducts: any = [];
	viewed_products: any = [];
	bestsellerProducts: any = [];
	seller_products: any = [];
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 5;
	orderData: any = [];
	totalRecord: number = 10;
	msg_danger = false;
	constructor(private router: Router,
		private dashboardService: DataService,
		private orderService: OrderService,
		private toastr: ToastrManager) { }

	ngOnInit() {
		this.dashboard_data();
		this.get_orderData();
		// this.datasets = [
		//   [0, 20, 10, 30, 15, 40, 20, 60, 60],
		//   [0, 20, 5, 25, 10, 30, 15, 40, 40]
		// ];
		// this.data = this.datasets[0];
		// var chartOrders = document.getElementById('chart-orders');
		// parseOptions(Chart, chartOptions());
		// var chartSales = document.getElementById('chart-sales');
		// this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
		// var chartPages = document.getElementById('chart-pages');
		// this.pageChart = new Chart(chartPages, {
		//   type: 'bar',
		//   options: chartExample3.options,
		//   data: chartExample3.data
		// });
	}


	public updateOptions() {
		this.salesChart.data.datasets[0].data = this.data;
		this.salesChart.update();
	}

	dashboard_data() {
		this.dashboardService.getboardDetails({}).subscribe(
			(response) => {
				if (response.code == 200) {
					this.allpage_count = response.count_page;
					this.blog_count = response.count_blog;
					this.tag_count = response.count_tag;
					this.author_count = response.count_author;
					this.testimonial_count = response.count_testimonial;
					this.program_count = response.count_program;
					this.contact_count = response.count_contact;
					this.career_count = response.count_career;
					this.user_count = response.count_user;
					this.banner_count = response.count_banner;
					this.service_count = response.count_service;
					this.gallery_count = response.count_gallery;
					this.project_count = response.count_project;
					this.subscriber_count = response.count_subscriber;
					this.catalog_count = response.count_catalog;
					this.new_customer = response.new_customer;
					this.order_average = response.order_average;
					this.order_lifetime = response.order_lifetime;
					this.currency_type = response.currency_type;
					this.order_all = response.order_data_all;
					this.cart_count = response.count_cart;
					this.customer_count = response.count_customer;
					this.category_count = response.count_category;
					this.subcategory_count = response.count_subcategory;
					this.collection_count = response.count_collection;
					this.colors_count = response.count_colors;
					this.sizes_count = response.count_sizes;
					this.events_count = response.count_events;
					this.products_count = response.count_products;
					this.orders_count = response.count_orders;
					this.RMA_count = response.count_RMA;
					this.bodyType_count = response.count_body_type;
					this.trendingCars_count = response.count_trending_cars;
					this.brand_count = response.count_brand;
					this.vehicle_count = response.count_vehicle;
					this.carType_count = response.count_car_type;
					this.model_count = response.count_model;
					this.feature_count = response.count_feature;
					this.cars_count = response.count_cars;
					this.yachts_count = response.count_yachts;
					this.wishlist_count = response.count_wishlist;
					this.lastsearchterm = response.last_search_items.slice(Math.max(response.last_search_items.length - 5, 0));
					this.topsearchtems = response.top_search_items;
					this.mostviewedProducts = response.most_viewed_products.slice(Math.max(response.most_viewed_products.length - 10, 0));
					this.viewed_products = response.viewed_products;
					this.bestsellerProducts = response.best_seller_products.slice(Math.max(response.best_seller_products.length - 10, 0));
					this.seller_products = response.seller_products;
					// this.topsearchtems = this.topsearchtems.sort( function ( a, b ) { return b.results - a.results; } );
					this.cartCountValues = [this.banner_count, this.blog_count,
					this.career_count, this.catalog_count, this.contact_count, this.gallery_count,
					this.project_count, this.allpage_count, this.service_count, this.subscriber_count,
					this.testimonial_count, this.user_count,]
					// this.toastr.successToastr(response.message);
					if (this.mostviewedProducts && this.mostviewedProducts.length > 0) {
						this.mostviewedProducts.forEach((item: any) => {
							if (item && this.viewed_products.length > 0) {
								let tempProd = this.viewed_products.filter((prod: any) => prod._id.toString() == item.product_id.toString());
								if (tempProd && tempProd.length > 0) {
									item['product'] = tempProd[0];
								}
							}
						});
					}
					if (this.bestsellerProducts && this.bestsellerProducts.length > 0) {
						this.bestsellerProducts.forEach((item: any) => {
							if (item && this.seller_products.length > 0) {
								let tempProd = this.seller_products.filter((prod: any) => {
									if (prod && prod._id.toString() == item.product_id.toString()) {
										return prod;
									}
								});
								if (tempProd && tempProd.length > 0) {
									item['product'] = tempProd[0];
								}
							}
						});
					}
					// this.updateChartOptions();
				} else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
	}

	get_orderData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.orderService.getOrderDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.orderData = response.result;
						this.totalRecord = response?.count;
						window.scroll(0, 0);
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	// public updateChartOptions() {
	//   this.pageChart.data.datasets[0].data = this.cartCountValues;
	//   this.pageChart.update();
	// }
}
