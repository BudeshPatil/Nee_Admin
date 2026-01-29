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

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.css']
})
export class ViewHomeComponent implements OnInit {

  msg_danger: boolean = false;
  pageData: any;

  constructor(
    private router: Router,
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    this.get_pageData();
  }

  get_pageData()
  {
    this.pageService.getHomePageDetails({}).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.pageData    = response.result;
            }
            else
            {
              this.msg_danger   = true;
            }
           
          }
        },
      );
  }

}
