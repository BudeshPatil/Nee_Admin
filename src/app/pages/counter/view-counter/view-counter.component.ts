import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CounterService } from 'src/app/providers/counter/counter.service';


@Component({
	selector: 'app-view-counter',
	templateUrl: './view-counter.component.html',
	styleUrls: ['./view-counter.component.scss']
})
export class ViewCounterComponent implements OnInit {
	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// Data Assign
	addForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

	// Edit Action Here
	id: any;
	CounterData: any;

	// pagination
	currentPage: number = 1;
	currentLimit: number = 10;
	totalRecord: number = 0;

	constructor(
		private router: Router,
		private counterService: CounterService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager,
	) {
		this.addForm = this.formBuilder.group({
			total_reviews: [''],
			total_projects: [''],
			total_years_exp: [''],
			total_countries: [''],
			total_home: [''],
			total_commercial: [''],
			total_client: [''],
			total_year: [''],
		});
		this.token = localStorage.getItem('neelgund-admin-token');


	}

	ngOnInit(): void {
		this.get_CounterData();
	}

	get_CounterData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.counterService.getData(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CounterData = response.result;
						this.totalRecord = response?.count;
						let data = this.CounterData[0];
						this.addForm.patchValue({
							total_reviews: data?.total_reviews,
							total_projects: data?.total_projects,
							total_years_exp: data?.total_years_exp,
							total_countries: data?.total_countries,
							total_home: data?.total_home,
							total_commercial: data?.total_commercial,
							total_client: data?.total_client,
							total_year: data?.total_year,
						});
						window.scroll(0, 0);
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addForm.value;
		let id = this.CounterData[0]._id;
		obj['neelgund-admin-token'] = this.token;
		if (this.addForm.invalid) {
			return;
		}
		this.counterService.editCounterdata(obj, id).subscribe(
			(response) => {
				if (response.code == 200) {
					this.throw_msg = response.message
					this.msg_success = true;
					setTimeout(() => {
						this.router.navigate(['/counter/view']);
						this.toastr.successToastr(response.message);
					}, 2000);
				} else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addForm.controls[controlName].hasError(errorName);
	};

}
