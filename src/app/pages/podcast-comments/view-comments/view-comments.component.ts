import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { PodcastcommentsService } from '../../../providers/podcastcomments/podcastcomments.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.component.html',
  styleUrls: ['./view-comments.component.scss']
})
export class ViewCommentsComponent implements OnInit {

  msg_danger: boolean = false;
  commentsData: any;
  imagePath : any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;

  constructor(
    private router: Router,
    private commentsService:PodcastcommentsService
  )
  {
    this.imagePath = environment.baseUrl+'/public/';
  }

  ngOnInit(): void {
    this.get_commentsData();
  }

  get_commentsData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.commentsService.getCommentsDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.commentsData = response.result; 
              this.totalRecord = response?.count; 
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
    this.get_commentsData();
  } 

  deletecomments(listid:any)
  {
    if(confirm("Are you sure to delete this comments"))
    {
      var mylist = {id:listid};
      this.commentsService.deletecomments(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_commentsData();
            this.router.navigate(['/podcast-comments/view']);
          }
        },
      );
    }
  }

}
