import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CounterService } from 'src/app/providers/counter/counter.service';

@Component({
	selector: 'app-view-counter',
	templateUrl: './view-counter.component.html',
	styleUrls: ['./view-counter.component.scss']
})
export class ViewCounterComponent implements OnInit {
	addForm: FormGroup;
	throw_msg = '';
	msg_success = false;
	token: string;
	CounterData: any[] = [];
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	isLoading = true;
	isSaving = false;
	loadError = false;

	constructor(
		private counterService: CounterService,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager
	) {
		this.addForm = this.formBuilder.group({
			total_plots: [''],
			plots_desc: [''],
			total_clients: [''],
			clients_desc: [''],
			total_experience: [''],
			experience_desc: [''],
			total_projects: [''],
			projects_desc: ['']
		});
		this.token = localStorage.getItem('neelgund-admin-token');
	}

	ngOnInit(): void {
		this.get_CounterData();
	}

	get_CounterData() {
		this.isLoading = true;
		this.loadError = false;
		this.msg_success = false;

		const request = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token
		};

		this.counterService.getData(request).subscribe({
			next: (response) => {
				this.isLoading = false;

				if (response.code !== 200) {
					this.CounterData = [];
					this.totalRecord = 0;
					this.loadError = true;
					this.toastr.errorToastr(response.message || 'Counter settings could not be loaded.');
					return;
				}

				this.CounterData = Array.isArray(response.result) ? response.result : [];
				this.totalRecord = Number(response.count) || 0;

				if (this.CounterData.length === 0) {
					this.addForm.reset();
					return;
				}

				this.addForm.patchValue(this.CounterData[0]);
			},
			error: () => {
				this.isLoading = false;
				this.CounterData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr('Counter settings could not be loaded.');
			}
		});
	}

	onSubmit() {
		const counter = this.CounterData[0];
		if (!counter || !counter._id) {
			this.toastr.errorToastr('Counter settings are unavailable.');
			return;
		}

		if (this.addForm.invalid || this.isSaving) {
			return;
		}

		this.isSaving = true;
		const payload = {
			...this.addForm.value,
			'neelgund-admin-token': this.token
		};

		this.counterService.editCounterdata(payload, counter._id).subscribe({
			next: (response) => {
				this.isSaving = false;

				if (response.code === 200) {
					this.throw_msg = response.message || 'Counter settings saved.';
					this.msg_success = true;
					this.toastr.successToastr(this.throw_msg);
					return;
				}

				this.toastr.errorToastr(response.message || 'Counter settings could not be saved.');
			},
			error: () => {
				this.isSaving = false;
				this.toastr.errorToastr('Counter settings could not be saved.');
			}
		});
	}
}
