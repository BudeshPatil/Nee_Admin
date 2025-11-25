import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocationService } from 'src/app/providers/location/location.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MediaService } from '../../../providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent {
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addlocationForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	dropdownSettings = {};
	url: any;
	locationData: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private locationService: LocationService,
		private toastr: ToastrManager,
		private modalService: NgbModal,
		private mediaService: MediaService,
	) {
		this.addlocationForm = this.formBuilder.group({
			name: ['', Validators.required],
			address: [''],
			status: ['', Validators.required],
			city: [''],
			state: [''],			
			country: [''],
			coordinates: [''],
			isAirport: [false],
			isPort: [false],
			url_key: ['', Validators.required],
			sequence_number:[1]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addlocationForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			this.patchingdata(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
		this.dropdownSettings = {
			singleSelection: false,
			idField: '_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 6,
			allowSearchFilter: true
		};
	}

	onItemSelect(item: any) {
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}

	selectLocation(data) {
		console.log(data);
	}

	get f() {
		return this.addlocationForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.locationService.getLocationWithId(obj).subscribe(
			(response) => {
				if (response.code == 200 && response?.result.length > 0) {
					let data = response?.result[0];
					this.locationData = response?.result[0];
					this.addlocationForm.patchValue({
						name: data?.name,
						address: data?.address,
						status: data?.status,
						city: data?.city,
						state: data?.state,	
						country: data?.country,
						coordinates: data?.coordinates,
						isAirport: data?.isAirport,
						isPort: data?.isPort,
						url_key: data?.url_key,
						sequence_number: data?.sequence_number,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addlocationForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addlocationForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.locationService.addLocation(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);

						setTimeout(() => {
							this.router.navigate(['/location/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
		else {
			this.locationService.editLocationdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/location/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
	}


	onCancel() {
		this.router.navigate(['/location/view']);
	}


}
