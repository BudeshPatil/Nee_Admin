import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import { PageService } from '../../../providers/page/page.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent {
  msg_danger: boolean = false;
  pageData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';

  constructor(
    private router: Router,
    private pageService:PageService,
		private toastr: ToastrManager
  )
  {

  }

  ngOnInit(): void {
    this.get_pageData();
  }

  get_pageData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.pageService.getPageDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(response.result != null && response.result != '')
            {
              this.pageData    = response.result;
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


	deletePage(listid:any)
  {
    if(confirm("Are you sure to delete this Page"))
    {
      var mylist = {id:listid};
      this.pageService.deletePage(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						this.toastr.successToastr(response.message);
						this.get_pageData();
            this.router.navigate(['/page/view']);
          }
        },
      );
    }
  }


  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_pageData();
  }

  searchPage(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_pageData();
  }
}
