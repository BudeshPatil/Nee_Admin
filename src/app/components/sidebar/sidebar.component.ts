import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [,
    { path: '/banner-images/view', title: 'Banners',  icon: 'ni ni-image text-orange', class: '' },
    { path: '/counter/view', title: 'Insights',  icon:'ni ni-book-bookmark text-blue', class: '' },
    { path: '/about/view', title: 'Founders Message',  icon:'ni ni-paper-diploma text-black', class: '' },
    { path: '/homegallery/view', title: 'Recent Projects',  icon:'ni ni-album-2 text-pink', class: '' },
		{ path: '/tvshow/view', title: 'Our Clients',  icon:'ni-planet text-blue', class: '' },
    { path: '/testimonial/view', title: 'Testimonials',  icon:'ni ni-caps-small text-green', class: '' },
    { path: '/contact/list', title: 'Contacts',  icon:'ni ni-chat-round text-green', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentRoute: string = '';
  currentLocation:any = '/home';
  baseUrl = environment.Url+'/#/';
  public menuItems: any[];
  public isCollapsed = true;
  constructor(private router: Router,
    private http: HttpClient,
    public location: Location,
    private route: ActivatedRoute
  ){

  }

  ngOnInit() {
    this.router.events.subscribe(params => {
      this.currentLocation = '';
      this.currentRoute = this.router.url;
      var _location = this.location.path();
      _location = _location.split('/')[1];
      if(_location && this.currentRoute != '/'){
        this.currentLocation = _location;
      }
    });
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

}
