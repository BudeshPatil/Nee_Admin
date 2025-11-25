import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';

import { PromocodeService } from 'src/app/providers/promocode/promocode.service';
import * as moment from 'moment';
import { CustomerService } from '../../../providers/customer/customer.service';

@Component({
  selector: 'app-add-promocode',
  templateUrl: './add-promocode.component.html',
  styleUrls: ['./add-promocode.component.scss']
})
export class AddPromocodeComponent {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;


	// Data Assign

	addPromoForm: FormGroup;

	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	customerGroups: any = [];

	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '200px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Enter text here...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [
			{ class: 'career_box', name: 'Rajdhani sans-serif' },
		],
	}

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private promocodeservice: PromocodeService,
		private toastr: ToastrManager,
		private customerService: CustomerService
	) {

		this.addPromoForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(255)]],
			code: ['', Validators.required],
			cond_subtotal: ['', Validators.required],
			uses_per_coupon: ['', Validators.required],
			discount: ['', Validators.required],
			from: ['', Validators.required],
			to: ['', Validators.required],
			action: ['true', Validators.required],
			// slug: [''],
			customer_group: ['']
		})
		let date = moment().format("DD.MM.YYYY");

	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addPromoForm.controls[controlName].hasError(errorName);
	}

	ngOnInit(): void {
		this.getCustomerGroupsData();
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			// this.patchingdata(this.id);
			this.addData(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
	}

	addData(id: any) {
		let obj = { _id: id };
		this.promocodeservice.getPromocodeById(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					// let from: string = moment(data.from).format('DD/MM/YYYY');
					// let to: string = moment(data.to).format('DD/MM/YYYY');

					// data.from = moment(data.from).format('DD/MM/YYYY');
					// data.to = moment(data.to).format('DD/MM/YYYY');

					// data.from = data.from.toString().replace('Z', '').replace('T', '');
					// data.to = data.to.toString().replace('Z', '').replace('T', '');

					this.addPromoForm.patchValue({
						name: data?.name,
						code: data?.code,
						cond_subtotal: data?.cond_subtotal,
						uses_per_coupon: data?.uses_per_coupon,
						discount: data?.discount,
						from: moment(data?.from).format('YYYY-MM-DD'),
						to: moment(data?.to).format('YYYY-MM-DD'),
						// slug: data?.slug,
						customer_group: data?.customer_group,
						action: data?.action
					})
				} else {

				}
			}
		)
	}


	onSubmit() {
		this.submitted = true;
		let obj = this.addPromoForm.value;
		let id = this.id;


		if (this.addPromoForm.invalid) {
			return;
		}

		if (!this.isEdit) {
			this.promocodeservice.addPromocode(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/promocode/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message;
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);

		}
		else {
			this.promocodeservice.editPromoCodeData(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/promocode/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message;
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}

	}


	onCancel() {
		this.router.navigate(['/promocode/view']);
	}

	getCustomerGroupsData() {
		let obj = {};
		this.customerService.getAllCustomer_Group(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					this.customerGroups = response?.result;
				} else {
					this.customerGroups = [];
				}
			});
	}
}
