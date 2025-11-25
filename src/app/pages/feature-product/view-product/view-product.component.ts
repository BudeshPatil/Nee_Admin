import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { VehicleService } from '../../../providers/vehicle/vehicle.service';
import { from } from 'rxjs';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-view-product',
	templateUrl: './view-product.component.html',
	styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent {

	msg_danger: boolean = false;
	vehicleData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 20;
	totalRecord: number = 0;
	searchText = '';
	searchTextdisplay = '';
	imagePath: any;
	isFilterActive: boolean = false;
	filterArray: any = [];
	_id: any;
	filter_price_from: number = 0;
	filter_price_to: number = 0;
	filter_quantity_from: number = 0;
	filter_quantity_to: number = 0;
	name: any;
	vehicle_type: any;
	sku: any;
	visibility: any;
	status: any = 'true';
	user: any;
	config = {
		value: true,
		name: '',
		disabled: false,
		height: 25,
		width: 80,
		margin: 3,
		fontSize: 10,
		speed: 300,
		color: {
			checked: 'green',
			unchecked: '#423f3f',
		},
		switchColor: {
			checked: 'crimson',
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
	selectedVehicle: any;
	modalReference = null;
	closeResult = '';
	disbaledvehicleData: any = [];
	totaldisbaledRecord: any;

	availableColorData: any = [];
	available_colors: any = [];
	availableVehiclesList: any = [];
	id: any;

	constructor(
		private router: Router,
		private vehicleService: VehicleService,
		public loginService: LoginService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		let tempuser = localStorage.getItem('user');
		this.user = JSON.parse(tempuser);
	}

	ngOnInit(): void {
		this.get_vehicleData();
		this.get_Disabled_Vehicles();
	}

	get_vehicleData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.filterArray.push({
			featured_vehicle: true
		});
		this.filterArray.push({
			vehicle_type: 'Car'
		});
		if (this.filterArray && this.filterArray.length > 0) {
			obj['filterArray'] = this.filterArray
		}
		// obj['isdisplayonhome'] = true;
		this.vehicleService.getDisplayonHomeVehicleDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.vehicleData = response.result;
						this.totalRecord = response?.count;
						if (this.filterArray && this.filterArray.length > 0) {
							this.updateFilterInUsers();
						}
						window.scroll(0, 0);
					}
					else {
						this.msg_danger = true;
						this.vehicleData = [];
					}

				}
			},
		);
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_vehicleData();
	}

	deleteVehicle() {
		if (this.selectedVehicle) {
			var mylist = { id: this.selectedVehicle._id, featured_vehicle: true };
			this.vehicleService.deletedisplayonehomevehicle(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_vehicleData();
						this.router.navigate(['/displayonhomevehicle/view']);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

	open(content, data) {
		this.selectedVehicle = data;
		if (this.selectedVehicle) {
			var mylist = { id: this.selectedVehicle._id };
			this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
				(result) => {
					this.closeResult = `Closed with: ${result}`;
				},
				(reason) => {
					this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				},
			);
		}
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	searchVehicle() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_vehicleData();
	}

	onListChangeLimit(event: any) {
		this.currentLimit = parseInt(event.target.value);
		this.get_vehicleData();
		// this.getAllVehicles();
	}

	updateFilterInUsers() {
		if (this.user) {
			let obj = this.user;
			obj['filter'] = this.filterArray;
			obj['id'] = this.user._id;
			this.loginService.updateProfile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						console.log('Filter Updated to User');
					} else {
						console.log('Failed to Updated filters')
					}
				},
			);
		}
	}

	get_Disabled_Vehicles() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.filterArray.push({
			featured_vehicle: false
		});
		this.filterArray.push({
			vehicle_type: 'Car'
		});
		if (this.filterArray && this.filterArray.length > 0) {
			obj['filterArray'] = this.filterArray
		}
		// obj['isdisplayonhome'] = true;
		this.vehicleService.getDisplayonHomeDisabledVehicles(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.disbaledvehicleData = response.result;
						this.totaldisbaledRecord = response?.count;
						window.scroll(0, 0);
					}
					else {
						this.msg_danger = true;
						this.disbaledvehicleData = [];
					}

				}
			},
		);
	}



	searchDisplayVehicle() {
		if (this.searchText) {
			this.currentLimit = 100;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_Disabled_Vehicles();
	}

	openDisplayonHome(displayonhome: any) {
		this.get_Disabled_Vehicles();
		this.modalService.open(displayonhome, { ariaLabelledBy: 'modal-basic-title', windowClass: "displayonHomepopup", size: 'lg', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	addDisplayonHomeVehicle(prod, i) {
		if (prod) {
			var mylist = { id: prod._id, isdisplayonhome: true };
			this.vehicleService.adddisplayonehomevehicle(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_Disabled_Vehicles();
						this.get_vehicleData();
						this.router.navigate(['/displayonhomevehicle/view']);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

	onDisListChangePage(event: any) {
		this.currentPage = event;
		this.get_Disabled_Vehicles();
	}

}
