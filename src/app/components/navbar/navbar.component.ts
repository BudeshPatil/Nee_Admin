import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: { username?: string } | null = null;

  private readonly routeTitles: { [path: string]: string } = {
    dashboard: 'Dashboard',
    'banner-images': 'Banner images',
    counter: 'Counters',
    tvshow: 'Clients',
    category: 'Categories',
    project: 'Projects',
    service: 'Services',
    testimonial: 'Testimonials',
    blog: 'Blogs',
    priceonrequest: 'Price requests',
    about: 'About',
    homepage: 'Homepage',
    contact: 'Contact list',
    career: 'Careers',
    page: 'SEO pages',
    'user-profile': 'My profile',
    auth: 'Users',
    config: 'Settings',
    achievement: 'Achievements',
    award: 'Awards',
    gallery: 'Gallery',
    podcast: 'Podcasts',
    subscriber: 'Subscribers',
    tag: 'Tags',
    catalog: 'Catalog',
    company: 'Company',
    client: 'Clients',
    course: 'Courses',
    download: 'Downloads',
    maps: 'Maps',
    icons: 'Icons'
  };

  constructor(private router: Router) { }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  getTitle() {
    const routePath = this.router.url.split('?')[0].split('#')[0];
    const activeRoute = routePath.split('/').filter(Boolean)[0] || 'dashboard';

    return this.routeTitles[activeRoute] || activeRoute
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
