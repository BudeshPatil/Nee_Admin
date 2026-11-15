import { Component, OnInit } from '@angular/core';

import { DashboardService } from '../../providers/dashboard/dashboard.service';
import { ToastrManager } from 'ng6-toastr-notifications';

interface DashboardMetric {
  label: string;
  count: number | string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public featuredMetrics: DashboardMetric[] = [];
  public contentMetrics: DashboardMetric[] = [];
  public isLoading = true;
  public dashboardError: string | null = null;

  constructor(
    private dashboardService: DashboardService,
    private toastr: ToastrManager
  ) { }

  ngOnInit() {
    this.dashboard_data();
  }

  dashboard_data() {
    this.isLoading = true;
    this.dashboardError = null;

    this.dashboardService.getboardDetails({}).subscribe(
      (response) => {
        this.isLoading = false;

        if (response.code !== 200) {
          this.dashboardError = response.message || 'The dashboard data could not be loaded.';
          this.toastr.errorToastr(this.dashboardError);
          return;
        }

        this.featuredMetrics = [
          { label: 'Projects', count: response.count_project, icon: 'ni-folder-17', route: '/project/view' },
          { label: 'Services', count: response.count_service, icon: 'ni-briefcase-24', route: '/service/view' },
          { label: 'Blog posts', count: response.count_blog, icon: 'ni-single-copy-04', route: '/blog/view' },
          { label: 'Contact enquiries', count: response.count_contact, icon: 'ni-email-83', route: '/contact/list' }
        ];

        this.contentMetrics = [
          { label: 'Banner images', count: response.count_banner, icon: 'ni-image', route: '/banner-images/view' },
          { label: 'Clients', count: response.count_tvshows, icon: 'ni-single-02', route: '/tvshow/view' },
          { label: 'Categories', count: response.count_category, icon: 'ni-tag', route: '/category/view' },
          { label: 'Testimonials', count: response.count_testimonial, icon: 'ni-satisfied', route: '/testimonial/view' },
          { label: 'SEO pages', count: response.count_page, icon: 'ni-align-left-2', route: '/page/view' },
          { label: 'Subscribers', count: response.count_subscriber, icon: 'ni-send', route: '/subscriber/view' },
          { label: 'Podcasts', count: response.count_podcast, icon: 'ni-headphones', route: '/podcast/view' },
          { label: 'Gallery', count: response.count_gallery, icon: 'ni-album-2', route: '/gallery/view' },
          { label: 'Authors', count: response.count_author, icon: 'ni-single-02', route: '/author/view' },
          { label: 'Tags', count: response.count_tag, icon: 'ni-tag', route: '/tag/view' },
          { label: 'Awards', count: response.count_award, icon: 'ni-trophy', route: '/award/view' },
          { label: 'Achievements', count: response.count_achievement, icon: 'ni-check-bold', route: '/achievement/view' },
          { label: 'Social activity', count: response.count_socialactivity, icon: 'ni-world', route: '/socialactivity/view' },
          { label: 'Users', count: response.count_user, icon: 'ni-circle-08', route: '/auth/view-user' }
        ];
      },
      () => {
        this.isLoading = false;
        this.dashboardError = 'Check your connection and try again.';
        this.toastr.errorToastr('Dashboard data could not be loaded.');
      }
    );
  }
}
