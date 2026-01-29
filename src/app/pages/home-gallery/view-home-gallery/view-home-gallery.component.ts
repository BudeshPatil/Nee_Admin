import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import {LoginService} from '../../../providers/auth/login.service';
import { from } from 'rxjs';
import { HomegalleryService } from '../../../providers/homegallery/homegallery.service';

@Component({
  selector: 'app-view-home-gallery',
  templateUrl: './view-home-gallery.component.html',
  styleUrls: ['./view-home-gallery.component.scss']
})
export class ViewGalleryComponent implements OnInit {

  msg_danger: boolean = false;
  GalleryData: any;
  imagePath : any;
  token: any;
  VendorData: any;
  vendorid: any = '';

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  config = {
    value: true,
    name: '',
    disabled: false,
    height: 25,
    width: 90,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: '#36aef5',
      unchecked: '#423f3f',
    },
    switchColor: {
      checked: '#3366FF',
      unchecked: 'crimson',
    },
    labels: {
      unchecked: 'Deactive',
      checked: 'Active',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
  };
  isactive :any ;

  constructor(
    private router: Router,
    private loginService:LoginService,
    private galleryService:HomegalleryService
  )
  {
    this.imagePath = environment.baseUrl+'/public/homegallery/';
    this.token     = localStorage.getItem('token');
    this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.isactive = 'none';
  }

  ngOnInit(): void {
    this.get_GalleryData();
  }

  get_GalleryData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      vendor_id: this.vendorid,
      token: this.token,
    };
    this.galleryService.getGalleryDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(response.result != null && response.result != '')
            {
              this.GalleryData = response.result;
              this.totalRecord = response?.count;
              window.scroll(0,0);
            }
            else
            {
              this.msg_danger   = true;
            }

          }
        },
      );
  }

  changeVendorList(event:any) {
    this.vendorid = event.currentTarget.value;
    this.get_GalleryData();
  }

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_GalleryData();
  }

  deleteGallery(listid:any)
  {
    if(confirm("Are you sure to delete this product"))
    {
      var mylist = {id:listid};
      this.galleryService.deletegallery(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_GalleryData();
            this.router.navigate(['/homegallery/view']);
          }
        },
      );
    }
  }

  searchGallery(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_GalleryData();
  }

  changeStatus(){
    if(this.isactive != 'none'){
      this.config.switchColor.checked = '#ffffff';
      this.config.color.checked = 'green';
      this.config.labels.checked = 'Active';
    } else {
      if(this.isactive){
        this.isactive = false;
        this.config.switchColor.unchecked = 'crimson';
        this.config.color.unchecked = '#423f3f';
        this.config.labels.unchecked = 'Deactive';
      } else {
        this.isactive = true
      }
    }
	}

  resetFilter(){
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.config.switchColor.unchecked = '#dcdcdc';
    this.config.color.unchecked = '#dcdcdc';
    this.config.labels.unchecked = 'Change';
    this.isactive = 'none';
	}

}
