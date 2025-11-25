import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import { WishlistService } from '../../../providers/wishlist/wishlist.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ProductService } from '../../../providers/product/product.service';
import { LoginService } from '../../../providers/auth/login.service';
import { CustomerService } from 'src/app/providers/customer/customer.service';

@Component({
  selector: 'app-add-wishlist',
  templateUrl: './add-wishlist.component.html',
  styleUrls: ['./add-wishlist.component.scss']
})
export class AddWishlistComponent {
  addWishlistForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;

	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	selectedFile: any;
	document: any;
	imagePath: any;
	allproducts: any = [];
	token: any;
	allusers: any = [];
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 1000;
	totalRecord: number = 0;
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private wishlistservice: WishlistService,
		private toastr: ToastrManager,
		public productService: ProductService,
		public loginService: LoginService,
		public customerService: CustomerService
	) {
		this.addWishlistForm = this.formBuilder.group({
			product: ['', Validators.required],
			user: ['', Validators.required]
		});
		this.uploadInput = new EventEmitter<UploadInput>();
		this.token = localStorage.getItem('ghoastrental-token');
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addWishlistForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.imagePath = environment.baseUrl + '/public/';
		this.getallProducts();
		this.getallUsers();
		if (this.isEdit) {
			this.patchingdata(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.wishlistservice.getWishlistWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.addWishlistForm.patchValue({
						product: data?.product,
						user: data?.user
					});
				} else {

				}
			},
		);

	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addWishlistForm.value;
		let id = this.id;
		if (this.addWishlistForm.invalid) {
			return;
		}
		obj['token'] = this.token;
		obj['id'] = this.addWishlistForm.value.product;
		obj['customer_id'] = this.addWishlistForm.value.user;
		if (!this.isEdit) {
			this.wishlistservice.addWishlist(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/wishlist/view']);
						}, 2000);
					}
					else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		} else {

			this.wishlistservice.editwishlistdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/wishlist/view']);
						}, 2000);
					} else {
						this.toastr.errorToastr(response.message);
					}
				},
			);

		}
	}

	getallProducts() {
		this.productService.getallProducts({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.allproducts = response.result;
					}
					else {
					}
				}
			},
		);
	}

	getallUsers() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.customerService.getCustomerDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.allusers = response.result;
					}
					else {
					}
				}
			},
		);
	}

	onCancel() {
		this.router.navigate(['/wishlist/view']);
	}
}
