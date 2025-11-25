import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/providers/category/category.service';
import { SubcategoryService } from 'src/app/providers/subcategory/subcategory.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MediaService } from '../../../providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseService } from '../../../providers/response/response.service';
import { CollectionService } from '../../../providers/collection/collection.service';
import { CollectioncategoryService } from 'src/app/providers/collectioncategory/collectioncategory.service';

@Component({
	selector: 'app-add-subcategory',
	templateUrl: './add-subcategory.component.html',
	styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent {
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	categoryImage: any;
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addsubcategoryForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
	CategoryData: any = [];
	// Edit Action Here
	applyAction: any;
	id: any;
	selectedCatData: any;
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
			{ class: 'blog-descriptiondetail', name: 'Rajdhani sans-serif' },
		],
	}
	mediaData: any;
	images: any = [];
	closeResult: any = '';
	addmediaForm: FormGroup;
	submittedMedia: boolean = false;
	fileFormat: any;
	temp_sequence_number = 0;
	mediaFile: any;
	isUploaded: boolean = false;
	url: any;
	isMediaDeleted = false;
	deletedMediaData: any;
	isMediaFileDeleted = false;
	deletedMediaFile: any = [];
	categoryData: any;
	isMediaEdit = false;
	mediaID: any;
	collectionData: any = [];
	selectedcollectionData: any;
	parentcollection:any;
	dropdownSettings = {};
	collectionCategoryData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private subcategoryService: SubcategoryService,
		private toastr: ToastrManager,
		private modalService: NgbModal,
		private mediaService: MediaService,
		public responseService: ResponseService,
		public collectionService: CollectionService,
		public collectionCategoryService: CollectioncategoryService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addsubcategoryForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: ['', Validators.required],
			description: ['', Validators.required],
			url_key: ['', Validators.required],
			parent_category: [''],
			parent_collection: [''],
			parent_collection_categories: ['', Validators.required]
		});
		this.token = localStorage.getItem('token');
		this.url = environment.Url + '/assets';
		this.imagePath = environment.baseUrl + '/public/';
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format: [''],
			file_type: ['image'],
			alt: [''],
			role: [''],
			resolution: [''],
			size: [''],
			height: [''],
			width: [''],
			mute: ['muted'],
			autoplay: [true],
			loop: [true],
			full_screen: [''],
		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addsubcategoryForm.controls[controlName].hasError(errorName);
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
		this.getallCategory();
		this.get_collectionData();
		this.get_collectionCategoryData();
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
		return this.addsubcategoryForm.controls;
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.subcategoryService.getSubCategoryWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.selectedCatData = data.parent_category;
					this.selectedcollectionData = data.parent_collection;
					this.mediaData = data?.media_data[0];
					this.categoryImage = data?.image;
					let tempcategoriesData = [];
					if (data?.parent_category && data.parent_category.length > 0) {
						data.parent_category.forEach((item, index) => {
							tempcategoriesData.push({ _id: item.parent_Category_id, name: item.parent_Category_name });
						});
					}
					let tempcollectionData = [];
					if (data?.parent_collection && data.parent_collection.length > 0) {
						data.parent_collection.forEach((item, index) => {
							tempcollectionData.push({ _id: item.parent_collection_id, name: item.parent_collection_name });
						});
					}
					let tempcollectioncatData = [];
					if (data?.parent_collection_categories && data.parent_collection_categories.length > 0) {
						data.parent_collection_categories.forEach((item, index) => {
							tempcollectioncatData.push({ _id: item.parent_collection_id, name: item.parent_collection_name });
						});
					}
					this.addsubcategoryForm.patchValue({
						name: data?.name,
						status: data?.status,
						description: data?.description,
						url_key: data?.url_key,
						parent_category: tempcategoriesData,
						parent_collection: tempcollectionData,
						parent_collection_categories:tempcollectioncatData
					});
				} else {

				}
			},
		);
	}

	get_collectionCategoryData() {
		const obj = {
			token: this.token,
		};
		this.collectionCategoryService.getallCollectionCategoryDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.collectionCategoryData = response.result;
						if (this.collectionCategoryData && this.collectionCategoryData.length > 0) {
							let tempData = [];
							this.collectionCategoryData.forEach((item, index) => {
								tempData.push({ _id: item._id, name: item.name });
							});
							this.collectionCategoryData = tempData;
						}
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	getallCategory() {
		this.categoryService.getallCategoryDetails({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CategoryData = response.result;
						if (this.CategoryData && this.CategoryData.length > 0) {
							let tempData = [];
							this.CategoryData.forEach((item, index) => {
								tempData.push({ _id: item._id, name: item.name });
							});
							this.CategoryData = tempData;
						}
					}
					else {
					}
				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addsubcategoryForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.mediaData) {
			obj['image'] = this.mediaData._id;
		}
		let categoriesData: any = [];
		if (this.addsubcategoryForm.value.parent_category && this.addsubcategoryForm.value.parent_category.length > 0) {
			this.addsubcategoryForm.value.parent_category.forEach((category) => {
				let obj = {
					parent_Category_id: category._id,
					parent_Category_name: category.name
				};
				categoriesData.push(obj);
			})
			obj['parent_category'] = categoriesData;
		}
		let collection = [];
		if (this.addsubcategoryForm.value.parent_collection && this.addsubcategoryForm.value.parent_collection.length > 0) {
			this.addsubcategoryForm.value.parent_collection.forEach((coll) => {
				let obj = {
					parent_collection_id: coll._id,
					parent_collection_name: coll.name
				};
				collection.push(obj);
			})
			obj['parent_collection'] = collection;
		}
		let collection_category = [];
		if (this.addsubcategoryForm.value.parent_collection_categories && this.addsubcategoryForm.value.parent_collection_categories.length > 0) {
			this.addsubcategoryForm.value.parent_collection_categories.forEach((coll) => {
				let obj = {
					parent_collection_id: coll._id,
					parent_collection_name: coll.name
				};
				collection_category.push(obj);
			})
			obj['parent_collection_categories'] = collection_category;
		}
		if (this.addsubcategoryForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.subcategoryService.addSubCategory(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						if (this.isMediaDeleted) {
							this.deleteMediaData();
						}
						if (this.isMediaFileDeleted) {
							this.deleteMediaFile();
						}
						this.msg_success = true;
						this.isUploaded = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/subcategory/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
						this.CreateErrorResponse(response);
					}
				},
			);
		}
		else {
			this.subcategoryService.editSubCategorydata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						if (this.isMediaDeleted) {
							this.deleteMediaData();
						}
						if (this.isMediaFileDeleted) {
							this.deleteMediaFile();
						}
						this.msg_success = true;
						this.isUploaded = true;						
						setTimeout(() => {
							this.router.navigate(['/subcategory/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
						this.CreateErrorResponse(response);
					}
				},
			);
		}
	}


	onCancel() {
		this.router.navigate(['/subcategory/view']);
	}

	get_collectionData() {
		const obj = {
			token: this.token,
		};
		this.collectionService.getallCollectionDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.collectionData = response.result;
						if (this.collectionData && this.collectionData.length > 0) {
							let tempData = [];
							this.collectionData.forEach((item, index) => {
								tempData.push({ _id: item._id, name: item.name });
							});
							this.collectionData = tempData;
						}
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}


	selectParentCollection(collection) {
		if (this.collectionData && this.collectionData.length > 0) {
			let tempcat = this.collectionData.filter((item) => item._id == collection);
			if (tempcat) {
				this.parentcollection = tempcat[0];
			}
		}
	}

	onUploadOutput(output: UploadOutput, typeofImage): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/subcategory/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.isUploaded = true;
			this.fileFormat = output.file.type;
			if (this.mediaFile) {
				this.deletedMediaFile.push(this.mediaFile);
				this.isMediaFileDeleted = true;
			}
			this.mediaFile = output.file.response.result;
			this.addmediaForm.value.resolution = output.file.size;
			this.submittedMedia = false;
			this.addmediaForm.patchValue({
				src: this.mediaFile
			});
		}
	}
	selectImageRole(event, role) {
		if (role == 'base') {
			this.addmediaForm.patchValue({
				height: 1100,
				width: 1100,
			});
		} else if (role == 'small') {
			this.addmediaForm.patchValue({
				height: 309,
				width: 309,
			});
		} else if (role == 'thumbnail') {
			this.addmediaForm.patchValue({
				height: 150,
				width: 150,
			});
		}
	}

	public hasMediaFormError = (controlName: string, errorName: string) => {
		return this.addmediaForm.controls[controlName].hasError(errorName);
	};

	deleteMedia() {
		this.images.splice(1, 1);
		this.isMediaDeleted = true;
		this.deletedMediaData = this.mediaData;
		this.mediaData = null;
	}

	openMedia(content: any) {
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format: [''],
			file_type: ['image'],
			alt: [''],
			role: [''],
			resolution: [''],
			size: [''],
			height: [''],
			width: [''],
			mute: ['muted'],
			autoplay: [true],
			loop: [true],
			full_screen: [''],
		});
		this.mediaFile = '';
		this.isMediaEdit = false;
		this.mediaID = '';
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	editMedia(content: any, mediaData, type) {
		this.isMediaEdit = true;
		this.mediaFile = mediaData.src;
		this.mediaID = mediaData._id;
		this.addmediaForm.patchValue({
			name: mediaData.name,
			status: mediaData.status,
			sequence_number: mediaData.sequence_number,
			src: mediaData.src,
			format: mediaData.format,
			file_type: mediaData.file_type,
			alt: mediaData.alt,
			role: mediaData.role,
			resolution: mediaData.resolution,
			size: mediaData.size,
			height: mediaData.height,
			width: mediaData.width,
			mute: mediaData.mute,
			autoplay: mediaData.autoplay,
			loop: mediaData.loop,
			full_screen: mediaData.full_screen,
		});
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
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

	onSubmitMedia(type) {
		let obj = this.addmediaForm.value;
		let id = this.mediaID;
		obj['token'] = this.token;
		obj['src'] = this.mediaFile;
		obj['format'] = this.fileFormat;
		this.submittedMedia = true;
		if (this.addmediaForm.invalid) {
			return;
		}
		if (!this.isMediaEdit) {
		this.mediaService.addMedia(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					this.submittedMedia = false;
					if (this.deletedMediaFile.length > 0) {
						this.deleteMediaFile();
					}
					this.toastr.successToastr(response.message);
					if (this.addmediaForm.value.sequence_number) {
						this.temp_sequence_number = this.addmediaForm.value.sequence_number
					} else {
						this.temp_sequence_number = this.temp_sequence_number + 1;
					}
					this.images.push({
						media_id: response.result._id,
						file_name: response.result.name,
						sequence_number: this.addmediaForm.value.sequence_number
					});
					this.mediaData = response.result;
					this.mediaFile = '';
					this.isUploaded = false;
					this.addmediaForm = this.formBuilder.group({
						name: ['', Validators.required],
						status: [true, Validators.required],
						sequence_number: [''],
						src: ['', Validators.required],
						format: [''],
						file_type: ['image'],
						alt: [''],
						role: [''],
						resolution: [''],
						size: [''],
						height: [''],
						width: [''],
						mute: ['muted'],
						autoplay: [true],
						loop: [true],
						full_screen: [''],
					});
					this.modalService.dismissAll();

				}
				else {
					this.toastr.errorToastr(response.message);
				}
			},
		);
		} else {
			if (id) {
				this.mediaService.editMediadata(obj, id).subscribe(
					(response) => {
						if (response.code == 200) {
							this.throw_msg = response.message
							this.msg_success = true;
							this.toastr.successToastr(response.message);
							if (this.mediaData) {
								this.deletedMediaFile.push(this.mediaData.src);
								this.deleteMediaFile();
							}
							setTimeout(() => {
								this.mediaData.src = response.result.src;
								window.location.reload();
							}, 1000);
							this.mediaData.src = response.result.src;
							if (this.categoryData.media_data && this.categoryData.media_data.length > 0) {
								this.patchingdata(this.id);
							}
							this.modalService.dismissAll();
						} else {
							this.throw_msg = response.message
							this.msg_danger = true;
							this.toastr.errorToastr(response.message);
						}
					},
				);
			}
		}
	}

	onCancelMedia() {
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format: [''],
			file_type: ['image'],
			alt: [''],
			role: [''],
			resolution: [''],
			size: [''],
			height: [''],
			width: [''],
			mute: ['muted'],
			autoplay: [true],
			loop: [true],
			full_screen: [''],
		});
		this.modalService.dismissAll();
		this.deletedMediaFile.push(this.mediaFile);
		this.deleteMediaFile();
		// this.mediaFile = '';
	}

	deleteMediaFile() {
		if (this.isUploaded && this.deletedMediaFile && this.deletedMediaFile.length > 0) {
			let obj = {};
			obj['files'] = this.deletedMediaFile;
			this.categoryService.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.isUploaded = false;
						this.mediaFile = '';
						this.deletedMediaFile = [];
					}
				},
			);
		}
	}

	deleteMediaData() {
		if (this.deletedMediaData) {
			var mylist = { id: this.deletedMediaData._id, file: this.deletedMediaData.src };
			this.categoryService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.deletedMediaFile = [];
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

	CreateErrorResponse(responseData) {
		if (responseData) {
			let obj = {
				model: 'Category',
				request: responseData,
				errorCode: 400,
				error: responseData.error,
				status: responseData.status,
				massage: responseData.massage
			};
			if (this.isEdit) {
				obj['log_type'] = 'Update';
			} else {
				obj['log_type'] = 'Add';
			}
			this.responseService.addErrorResponse(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						console.log('logs updated');
					}
					else {
					}
				},
			);
		}
	}
}
