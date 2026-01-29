import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/providers/client/client.service';
import { environment } from 'src/environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
	selector: 'app-client-view',
	templateUrl: './client-view.component.html',
	styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit {

	msg_danger: boolean = false;
	authorData: any;
	imagePath: any;
	clientData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';
	config = {
    value: true,
    name: '',
    disabled: false,
    height: 25,
    width: 90,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: '#36aef5',
      unchecked: '#423f3f',
    },
    switchColor: {
      checked: '#3366FF',
      unchecked: 'crimson',
    },
    labels: {
      unchecked: 'Deactive',
      checked: 'Active',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
  };
  isactive :any ;
	constructor(
		private router: Router,
		private dataService: ClientService
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.isactive = 'none';
	}

	ngOnInit(): void {
		this.getClient();
	}

	getClient() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.dataService.getClient(obj).subscribe(
			(response) => {
				if (response.status === 200) {
					if (response.data != null && response.data != '') {
						this.clientData = response.data;
						this.initialized = true;
						this.totalRecord = response.totalRecord;
						// this.msg_danger = false;						
						// console.log(this.clientData);
						// console.log(this.totalRecord);

					}
				} else {
					this.msg_danger = true;
					// this.initialized = false;
					// this.clientData = [];
				}
			}
		)
	}
	onListChangePage(event: any) {
		this.currentPage = event;
		this.getClient();
	}

	clientDelete(listid: any) {
		if (confirm("Are you sure to delete this Client")) {
			var mylist = { _id: listid };
			this.dataService.clientdelete(mylist).subscribe(
				(response) => {
					if (response.status == 200) {
						this.getClient();
						this.router.navigate(['/client/view'])
					}
				}
			)

		}
	}

	searchClient(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.getClient();
  }
	changeStatus(){
    if(this.isactive != 'none'){
      this.config.switchColor.checked = '#ffffff';
      this.config.color.checked = 'green';
      this.config.labels.checked = 'Active';
    } else {
      if(this.isactive){
        this.isactive = false;
        this.config.switchColor.unchecked = 'crimson';
        this.config.color.unchecked = '#423f3f';
        this.config.labels.unchecked = 'Deactive';
      } else {
        this.isactive = true
      }
    }
	}

  resetFilter(){
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.config.switchColor.unchecked = '#dcdcdc';
    this.config.color.unchecked = '#dcdcdc';
    this.config.labels.unchecked = 'Change';
    this.isactive = 'none';
	}

}
