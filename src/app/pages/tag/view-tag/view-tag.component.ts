import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { TagService } from '../../../providers/tag/tag.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-tag',
  templateUrl: './view-tag.component.html',
  styleUrls: ['./view-tag.component.css']
})
export class ViewTagComponent implements OnInit {
  msg_danger: boolean = false;
  tagData: any;
  imagePath : any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;

  constructor(
    private router: Router,
    private tagService:TagService
  )
  {
    this.imagePath = environment.baseUrl+'/public/';
  }

  ngOnInit(): void {
    this.get_tagData();
  }

  get_tagData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.tagService.getTagDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.tagData = response.result; 
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
    this.get_tagData();
  } 

  deletetag(listid:any)
  {
    if(confirm("Are you sure to delete this tag"))
    {
      var mylist = {id:listid};
      this.tagService.deletetag(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_tagData();
            this.router.navigate(['/tag/view']);
          }
        },
      );
    }
  }
}
