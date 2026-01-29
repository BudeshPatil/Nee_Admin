import { Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { from } from 'rxjs';
import { TeamsService } from 'src/app/teams/teams.service';
@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.scss']
})
export class ViewTeamsComponent implements OnInit {
  msg_danger: boolean = false;
  teamsData: any;
  imagePath : any;
  searchText;
  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  constructor(
    private router: Router,
    private teamsservice:TeamsService
  ) { 
    this.imagePath = environment.baseUrl+'/public/';
  }

  ngOnInit(): void {
    this.get_teamsData();
  }
  get_teamsData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.teamsservice.getallTeamsDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.teamsData = response.result;
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

  deleteTeams(listid:any)
  {
    if(confirm("Are you sure to delete this teams"))
    {
      var mylist = {id:listid};
      this.teamsservice.deleteTeams(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_teamsData();
            this.router.navigate(['/teams/view']);
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
    this.get_teamsData();
  }
}
