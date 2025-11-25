import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { ReviewService } from '../../../providers/review/review.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.scss']
})
export class ViewReviewComponent {
  msg_danger: boolean = false;
  reviewData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath :any;
  constructor(
    private router: Router,
    private reviewService:ReviewService
  ) {
    this.imagePath = environment.baseUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_reviewData();
  }

  get_reviewData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.reviewService.getallReview(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.reviewData = response.result; 
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
    this.get_reviewData();
  }
  
  deleteReview(listid:any)
  {
    if(confirm("Are you sure to delete this Review Job"))
    {
      var mylist = {id:listid};
      this.reviewService.deletereview(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_reviewData();
            this.router.navigate(['/review/view']);
          }
        },
      );
    }
  }

  searchReview(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_reviewData();
  }
}
