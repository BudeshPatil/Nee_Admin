import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
isSidebar = true;
isDarkMode = false;
user:any;
isFilterActive : boolean = false;
config = {
  value: true,
  name: '',
  disabled: false,
  height: 25,
  width: 65,
  margin: 3,
  fontSize: 10,
  speed: 300,
  color: {
    checked: 'white',
    unchecked: '#423f3f',
  },
  switchColor: {
    checked: 'crimson',
    unchecked: 'crimson',
  },
  labels: {
    unchecked: 'Dark',
    checked: 'Light',
  },
  checkedLabel: '',
  uncheckedLabel: '',
  fontColor: {
    checked: '#000',
    unchecked: '#fafafa',
  },
};
ngOninit(){
  let tempUser = localStorage.getItem('user');
  this.user = JSON.parse(tempUser);
  var body = $('body');
  var sidebarIconOnly = body.hasClass("sidebar-icon-only");
  var sidebarFixed = body.hasClass("sidebar-fixed");
  if (sidebarIconOnly) {
    if (sidebarFixed) {
        body.removeClass('sidebar-icon-only');
    } else {
      var $menuItem = $(this);
        $menuItem.addClass('hover-open')
      }
    }
  }

toggeleSidebar(){
  if(this.isSidebar){
    this.isSidebar = false;
    $("body").addClass("sidebar-icon-only");
  } else {
    this.isSidebar = true;
    $("body").removeClass("sidebar-icon-only");
  }
}

// tab and mobile screen menubar
toggleMenu() {
  if(this.isSidebar){
    this.isSidebar = false;
    $(".sidebar.sidebar-offcanvas").addClass("active");
  } else {
    this.isSidebar = true;
    $(".sidebar.sidebar-offcanvas").removeClass("active");
  }

}

logout(){
  localStorage.clear();
  window.location.reload();
}
toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
  const themeClass = this.isDarkMode ? 'dark-theme' : '';
  document.body.className = themeClass;
}

toggelFilter(){
  if(this.isFilterActive){
    this.isFilterActive = false;
    const themeClass = 'dark-theme';
    document.body.className = themeClass;
  } else {
    this.isFilterActive = true;
    const themeClass = '';
    document.body.className = themeClass;
  }
}

}
