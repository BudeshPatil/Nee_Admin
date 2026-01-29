import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// SERVICES
import {LoginService} from '../../../providers/auth/login.service';
import { ToastrManager } from 'ng6-toastr-notifications';

import { from } from 'rxjs';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  msg_danger: boolean = false;
  userData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  public tableData1: TableData;
  public tableData2: TableData;
  searchText = '';

  constructor(
    private router: Router,
    private userService:LoginService,
    private toastr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.get_userData();
    this.tableData1 = {
      headerRow: [ 'ID', 'Name', 'Country', 'City', 'Salary'],
      dataRows: [
          ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
          ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
          ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
          ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
          ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
          ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
  };
  this.tableData2 = {
      headerRow: [ 'ID', 'Name',  'Salary', 'Country', 'City' ],
      dataRows: [
          ['1', 'Dakota Rice','$36,738', 'Niger', 'Oud-Turnhout' ],
          ['2', 'Minerva Hooper', '$23,789', 'Curaçao', 'Sinaai-Waas'],
          ['3', 'Sage Rodriguez', '$56,142', 'Netherlands', 'Baileux' ],
          ['4', 'Philip Chaney', '$38,735', 'Korea, South', 'Overland Park' ],
          ['5', 'Doris Greene', '$63,542', 'Malawi', 'Feldkirchen in Kärnten', ],
          ['6', 'Mason Porter', '$78,615', 'Chile', 'Gloucester' ]
      ]
  };
  }

  get_userData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.userService.getallusers(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.userData = response.result; 
              this.totalRecord = response?.count;
              window.scroll(0,0);
            }
            else
            {
              this.msg_danger   = true;
            }
           
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );
  }

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_userData();
  }

  deleteCareer(listid:any)
  {
    if(confirm("Are you sure to delete this User"))
    {
      var mylist = {id:listid};
      this.userService.deleteuser(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_userData();
            this.router.navigate(['/auth/view-user']);
          }
        },
      );
    }
  }

  onCancel(){
    this.router.navigate(['/auth/view']);
  }

  searchUser(){
    if(this.searchText){
      this.currentLimit = 100; 
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_userData();
  }

}
