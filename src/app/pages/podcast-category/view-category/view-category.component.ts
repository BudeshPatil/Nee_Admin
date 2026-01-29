import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { PodcastcategoryService } from '../../../providers/podcastcategory/podcastcategory.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  msg_danger: boolean = false;
  categoryData: any;
  imagePath : any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;

  constructor(
    private router: Router,
    private categoryService:PodcastcategoryService
  )
  {
    this.imagePath = environment.baseUrl+'/public/';
  }

  ngOnInit(): void {
    this.get_categoryData();
  }

  get_categoryData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.categoryService.getCategoryDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.categoryData = response.result; 
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
    this.get_categoryData();
  } 

  deletecategory(listid:any)
  {
    if(confirm("Are you sure to delete this category"))
    {
      var mylist = {id:listid};
      this.categoryService.deletecategory(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_categoryData();
            this.router.navigate(['/podcast-category/view']);
          }
        },
      );
    }
  }

}
