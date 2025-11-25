import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadInput, UploadOutput, UploaderOptions } from 'ngx-uploader';
import { CustomerService } from '../../../providers/customer/customer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-customer-group',
  templateUrl: './add-customer-group.component.html',
  styleUrls: ['./add-customer-group.component.scss']
})
export class AddCustomerGroupComponent {
  // File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	customer_groupImage: any;
	imagePath: any;
	customer_groupMultiImages: any = [];
	// Data Assign
	customer_groupForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;

	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;

	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private toast: ToastrManager,
		private dataService: CustomerService
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.uploadInput = new EventEmitter<UploadInput>();
		this.customer_groupForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(255)]],
			role: ['', Validators.required],
			status: [true, Validators.required]
		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.customer_groupForm.controls[controlName].hasError(errorName);
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			// this.patchingdata(this.id);
			this.patchingdata(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.dataService.getCustomer_GroupById(obj).subscribe(
			(response) => {
				if (response.code === 200) {
					let data = response?.result;
					this.customer_groupForm.patchValue({
						name: data?.name,
						role: data?.role,
						status: data?.status
					})
					this.submitted = true;
				} else {
					this.submitted = false;
					this.msg_success = false;
					this.msg_danger = true;
				}
			}
		)
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.customer_groupForm.value;
		let id = this.id;
		if (this.customer_groupForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.dataService.customer_groupadd(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg   = response.message 
						this.msg_success = true;
						this.toast.successToastr(response.message);
						setTimeout(() => {
							this.throw_msg   = ''; 
							this.msg_danger = true;
							this.router.navigate(['/customer-groups/view']);
						}, 2000);
					}
					else {
						this.throw_msg    = response.message
						this.msg_danger = true;
						this.toast.errorToastr(response.message);
						setTimeout(() => {
							this.throw_msg   = ''; 
							this.msg_danger = false;
						}, 2000);
					}
				},
			);

		} else {
			this.dataService.customer_groupupdate(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message 
						this.msg_success = true;
						this.toast.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/customer-groups/view']);
						}, 2000);
					} else {
						this.toast.errorToastr(response.message);
					}
				},
			);
		}
	}

	onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/home/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.customer_groupImage = output.file.response.result;
			this.customer_groupMultiImages.push(output.file.response.result);
		}
	}

	onCancel() {
		this.router.navigate(['/customer-groups/view']);
	}

	removeImage(index) {
		if (confirm("Are you sure to delete this image")) {
			this.customer_groupMultiImages.splice(index, 1);
		}
	}
}
