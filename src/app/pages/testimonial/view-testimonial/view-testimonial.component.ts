import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-testimonial',
  templateUrl: './view-testimonial.component.html',
  styleUrls: ['./view-testimonial.component.css']
})
export class ViewTestimonialComponent implements OnInit {
  msg_danger: boolean = false;
  testimonialData: any;
  imagePath : any;
  searchText;
  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
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
    private testimonialservice:TestimonialService
  )
  {
    this.imagePath = environment.baseUrl+'/public/testimonial/';
    this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.isactive = 'none';
  }

  ngOnInit(): void {
    this.get_testimonialData();
  }

  get_testimonialData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.testimonialservice.getTestimonialDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(response.result != null && response.result != '')
            {
              this.testimonialData = response.result;
              this.totalRecord     = response?.count;
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

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_testimonialData();
  }

  deleteTestimonial(listid:any)
  {
    if(confirm("Are you sure to delete this testimonial"))
    {
      var mylist = {id:listid};
      this.testimonialservice.deleteTestimonial(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_testimonialData();
            this.router.navigate(['/testimonial/view']);
          }
        },
      );
    }
  }
  searchProduct(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_testimonialData();
  }0

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
