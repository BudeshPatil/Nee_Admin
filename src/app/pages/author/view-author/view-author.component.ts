import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { AuthorService } from '../../../providers/author/author.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-author',
  templateUrl: './view-author.component.html',
  styleUrls: ['./view-author.component.css']
})
export class ViewAuthorComponent implements OnInit {
  msg_danger: boolean = false;
  authorData: any;
  imagePath : any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';

  constructor(
    private router: Router,
    private authorservice:AuthorService
  )
  { 
    this.imagePath = environment.baseUrl+'/public/';
  }

  ngOnInit(): void {
    this.get_authorData();
  }

  get_authorData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.authorservice.getAuthorDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.authorData = response.result; 
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
    this.get_authorData();
  } 

  deleteAuthor(listid:any)
  {
    if(confirm("Are you sure to delete this author"))
    {
      var mylist = {id:listid};
      this.authorservice.deleteauthor(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_authorData();
            this.router.navigate(['/author/view']);
          }
        },
      );
    }
  }

  searchAuthor(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_authorData();
  }
}
