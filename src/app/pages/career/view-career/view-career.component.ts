import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { CareerService } from '../../../providers/career/career.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-career',
  templateUrl: './view-career.component.html',
  styleUrls: ['./view-career.component.css']
})
export class ViewCareerComponent implements OnInit {

  msg_danger: boolean = false;
  careerData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath :any;
  constructor(
    private router: Router,
    private careerService:CareerService
  ) {
    this.imagePath = environment.baseUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_careerData();
  }

  get_careerData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.careerService.getCareerDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.careerData = response.result; 
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

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_careerData();
  }
  
  deleteCareer(listid:any)
  {
    if(confirm("Are you sure to delete this Career Job"))
    {
      var mylist = {id:listid};
      this.careerService.deletecareer(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_careerData();
            this.router.navigate(['/career/view']);
          }
        },
      );
    }
  }

  searchCareer(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_careerData();
  }

}
