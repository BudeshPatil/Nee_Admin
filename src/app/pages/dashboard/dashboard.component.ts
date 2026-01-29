import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample3
} from "../../variables/charts";
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { DashboardService } from '../../providers/dashboard/dashboard.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public pageChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  allpage_count:any;
  blog_count:any;
  tag_count:any;
  author_count:any;
  testimonial_count:any;
  program_count:any;
  contact_count:any;
  career_count:any;
  user_count :any;
  banner_count:any;
  project_count:any;
  gallery_count:any;
  service_count:any;
  subscriber_count:any;
  catalog_count:any;
  cartCountValues:any;
  achievement_count:any;
  award_count:any;
  media_count:any;
  homegallery_count:any;
  podcast_count:any;
  socialactivity_count:any;
  tvshows_count:any;
  category_count:any;
  constructor( private router: Router,
    private dashboardService:DashboardService,
    private toastr: ToastrManager) { }

  ngOnInit() {
    this.dashboard_data();
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

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

  dashboard_data()
  {
    this.dashboardService.getboardDetails({}).subscribe(
        (response)=> {
          if (response.code == 200)
          {
              this.allpage_count =  response.count_page;
              this.blog_count    =  response.count_blog;
              this.tag_count     =  response.count_tag;
              this.author_count  =  response.count_author;
              this.testimonial_count = response.count_testimonial;
              this.program_count  =  response.count_program;
              this.contact_count  =  response.count_contact;
              this.career_count   =  response.count_career;
              this.user_count     =  response.count_user;
              this.banner_count    =  response.count_banner;
              this.service_count =  response.count_service;
              this.gallery_count = response.count_gallery;
              this.project_count  =  response.count_project;
              this.subscriber_count = response.count_subscriber;
              this.catalog_count = response.count_catalog;
              this.achievement_count = response.count_achievement;
              this.media_count = response.count_media;
              this.homegallery_count = response.count_homegallery;
              this.award_count = response.count_award;
              this.podcast_count = response.count_podcast;
              this.socialactivity_count = response.count_socialactivity;
              this.tvshows_count = response.count_tvshows;
              this.category_count = response.count_category;
              this.cartCountValues = [this.achievement_count,this.award_count,
                this.podcast_count,this.socialactivity_count,this.contact_count,this.gallery_count,
                this.allpage_count,this.subscriber_count,this.testimonial_count,this.user_count,]
              // this.toastr.successToastr(response.message);
              // this.updateChartOptions();
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );
  }

  public updateChartOptions() {
    this.pageChart.data.datasets[0].data = this.cartCountValues;
    this.pageChart.update();
  }


}
