import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { from } from 'rxjs';
import { ServiceService } from '../../../providers/service/service.service';
@Component({
	selector: 'app-view-service',
	templateUrl: './view-service.component.html',
	styleUrls: ['./view-service.component.scss']
})
export class ViewServiceComponent implements OnInit {

	msg_danger: boolean = false;
	authorData: any;
	imagePath: any;
	serviceData: any;

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
	isactive: any;

	constructor(
		private router: Router,
		private serviceservice: ServiceService
	) {
		this.imagePath = environment.baseUrl + '/public/service/';
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.isactive = 'none';
	}

	ngOnInit(): void {
		// this.get_authorData();
		this.get_serviceData();
	}

	get_serviceData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.serviceservice.getAllServices(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.serviceData = response.result;
						this.totalRecord = response?.count;
					} else {
						this.msg_danger = true;
					}
				}
			}
		)
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_serviceData();
	}

	deleteService(listId: string): void {
		if (confirm("Are you sure you want to delete this service?")) {
			const payload = { _id: listId };

			this.serviceservice.deleteService(payload).subscribe({
				next: (response) => {
					if (response?.code === 200) {
						this.get_serviceData();
						this.router.navigate(['/service/view']);
					}
				},
				error: (err) => {
					console.error('Delete service failed:', err);
					// Optionally show error toast/message to user
				}
			});
		}
	}


	searchService() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_serviceData();
	}

	changeStatus() {
		if (this.isactive != 'none') {
			this.config.switchColor.checked = '#ffffff';
			this.config.color.checked = 'green';
			this.config.labels.checked = 'Active';
		} else {
			if (this.isactive) {
				this.isactive = false;
				this.config.switchColor.unchecked = 'crimson';
				this.config.color.unchecked = '#423f3f';
				this.config.labels.unchecked = 'Deactive';
			} else {
				this.isactive = true
			}
		}
	}

	resetFilter() {
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.config.switchColor.unchecked = '#dcdcdc';
		this.config.color.unchecked = '#dcdcdc';
		this.config.labels.unchecked = 'Change';
		this.isactive = 'none';
	}

}
