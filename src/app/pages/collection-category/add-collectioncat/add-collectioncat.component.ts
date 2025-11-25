import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CollectioncategoryService } from 'src/app/providers/collectioncategory/collectioncategory.service';

@Component({
  selector: 'app-add-collectioncat',
  templateUrl: './add-collectioncat.component.html',
  styleUrls: ['./add-collectioncat.component.scss']
})
export class AddCollectioncatComponent {
	// Data Assign
	addcollectionForm: FormGroup;
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
	temp_sequence_number = 0;
	submittedMedia: boolean = false;
	url: any;
	collectionData: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private collectionService: CollectioncategoryService,
		private toastr: ToastrManager,
	) {
		this.addcollectionForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: ['', Validators.required],
			url_key: ['', Validators.required]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.url = environment.Url + '/assets';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addcollectionForm.controls[controlName].hasError(errorName);
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

	selectCollection(data) {
		console.log(data);
	}

	get f() {
		return this.addcollectionForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.collectionService.getCollectionCategoryWithId(obj).subscribe(
			(response) => {
				if (response.code == 200 && response?.result.length > 0) {
					let data = response?.result[0];
					this.collectionData = response?.result[0];
					this.addcollectionForm.patchValue({
						name: data?.name,
						status: data?.status,
						url_key: data?.url_key,
						isApproved: data?.isApproved,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addcollectionForm.value;
		let id = this.id;
		obj['token'] = this.token;
		let categoriesData: any = [];
		if (this.addcollectionForm.value.categories && this.addcollectionForm.value.categories.length > 0) {
			this.addcollectionForm.value.categories.forEach((category) => {
				let obj = {
					category_id: category._id,
					category_name: category.name
				};
				categoriesData.push(obj);
			})
		}
		obj['categories'] = categoriesData;
		if (this.addcollectionForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.collectionService.addCollectionCategory(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/collection-category/view']);
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
			this.collectionService.editCollectionCategorydata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/collection-category/view']);
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
		this.router.navigate(['/collection-category/view']);
	}
}
