import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { CategoryService } from 'src/app/providers/category/category.service';
import { MediaService } from '../../../providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CollectionService } from '../../../providers/collection/collection.service';
import { ResponseService } from '../../../providers/response/response.service';
import { SubcategoryService } from '../../../providers/subcategory/subcategory.service';

@Component({
	selector: 'app-add-category',
	templateUrl: './add-category.component.html',
	styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	categoryImage: any;
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	collectionData: any = [];
	dropdownSettings = {};
	artData: any;
	countryData: any;
	addcategoryForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
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
	deletedMediaData: any = [];
	isMediaFileDeleted = false;
	deletedMediaFile: any = [];
	categoryData: any;
	isMediaEdit = false;
	mediaID: any;
	subCategoryData: any = [];
	galleryData: any = [];
	deletedMediaFiles: any = [];
	galleryFile: any;
	addgalleryForm: FormGroup;
	gallery_images: any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private categoryService: CategoryService,
		private toastr: ToastrManager,
		public collectionService: CollectionService,
		private modalService: NgbModal,
		private mediaService: MediaService,
		public responseService: ResponseService,
		private subcategoryService: SubcategoryService,
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addcategoryForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: ['', Validators.required],
			description: ['', Validators.required],
			url_key: ['', Validators.required],
			sub_categories: [''],
			collection_id: ['', Validators.required],
			collection_title: [''],
			collection_description: [''],
			sequence_number: [1]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
		this.dropdownSettings = {
			singleSelection: false,
			idField: '_id',
			textField: 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 6,
			allowSearchFilter: true
		};
		this.get_SubCategoryData();
		this.get_collectionData();
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

		this.addgalleryForm = this.formBuilder.group({
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
		return this.addcategoryForm.controls[controlName].hasError(errorName);
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
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.categoryService.getCategoryWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.categoryData = data;
					this.categoryImage = data?.image;
					this.mediaData = data?.media_data[0];
					if (data?.galleyimagedata) {
						this.galleryData = data?.galleyimagedata;
						this.temp_sequence_number = data?.galleyimagedata.length;
					} else {
						this.galleryData = [];
					}
					if (data?.gallery_image) {
						this.gallery_images = data?.gallery_image;
					} else {
						this.gallery_images = [];
					}
					let tempsubcategoryData = [];
					if (data?.sub_categories) {
						data.sub_categories.forEach((item, index) => {
							tempsubcategoryData.push({ _id: item.sub_category_id, name: item.sub_category_name });
						});
					}
					this.addcategoryForm.patchValue({
						name: data?.name,
						status: data?.status,
						description: data?.description,
						url_key: data?.url_key,
						collection_title: data?.collection_title,
						collection_description: data?.collection_description,
						sub_categories: tempsubcategoryData,
						sequence_number: data?.sequence_number,
						collection_id: data?.collection_id
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addcategoryForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.mediaData) {
			obj['image'] = this.mediaData._id;
		}
		obj['gallery_image'] = this.gallery_images;
		let subcategory_Data: any = [];
		if (this.addcategoryForm.value.sub_categories && this.addcategoryForm.value.sub_categories.length > 0) {
			this.addcategoryForm.value.sub_categories.forEach((subcategory) => {
				let obj = {
					sub_category_id: subcategory._id,
					sub_category_name: subcategory.name
				};
				subcategory_Data.push(obj);
			})
		}
		if (this.addcategoryForm.invalid) {
			return;
		}
		obj['sub_categories'] = subcategory_Data;
		if (!this.isEdit) {
			this.categoryService.addCategory(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						this.isUploaded = true;
						if (this.isMediaDeleted) {
							this.deleteMediaData();
						}
						if (this.isMediaFileDeleted) {
							this.deleteMediaFile();
						}
						if (this.isMediaDeleted) {
							this.deleteMediaMultiFiles();
						}
						setTimeout(() => {
							this.router.navigate(['/category/view']);
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
			this.categoryService.editCategorydata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.isUploaded = true;
						if (this.isMediaDeleted) {
							this.deleteMediaData();
						}
						if (this.isMediaFileDeleted) {
							this.deleteMediaFile();
						}
						this.deleteMediaMultiFiles();
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/category/view']);
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

	get f() {
		return this.addcategoryForm.controls;
	}

	onCancel() {
		this.router.navigate(['/banner/view']);
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

	get_SubCategoryData() {
		const obj = {
			token: this.token,
		};
		this.subcategoryService.getallSubCategory(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.subCategoryData = response.result;
						if (this.subCategoryData && this.subCategoryData.length > 0) {
							let tempData = [];
							this.subCategoryData.forEach((item, index) => {
								tempData.push({ _id: item._id, name: item.name });
							});
							this.subCategoryData = tempData;
						}
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
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
		this.galleryFile = '';
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	editMedia(content: any, mediaData, type) {
		if (type == 'gallery') {
			this.galleryFile = mediaData.src;
		} else {
			this.mediaFile = mediaData.src;
		}
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

	onUploadOutputMedia(output: UploadOutput, type): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/category/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			if (type == 'gallery') {
				if (this.galleryFile) {
					this.deletedMediaFile.push(this.galleryFile);
					this.isMediaFileDeleted = true;
				}
				this.galleryFile = output.file.response.result;
				this.addmediaForm.value.resolution = output.file.size;
				this.submittedMedia = false;
				this.addmediaForm.patchValue({
					src: this.galleryFile
				});				
			} else {
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
	}

	onUploadVideo(output: UploadOutput, type): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/collection/addVideo',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.fileFormat = output.file.type;
			this.isUploaded = true;
			if (type == 'gallery') {
				if (this.galleryFile) {
					this.deletedMediaFile.push(this.galleryFile);
					this.isMediaFileDeleted = true;
				}
				this.galleryFile = output.file.response.result;
				this.submittedMedia = false;
				this.addmediaForm.patchValue({
					src: this.galleryFile
				});
			} else {
				if (this.mediaFile) {
					this.deletedMediaFile.push(this.mediaFile);
					this.isMediaFileDeleted = true;
				}
				this.mediaFile = output.file.response.result;
				this.submittedMedia = false;
				this.addmediaForm.patchValue({
					src: this.mediaFile
				});
			}
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
		if (type == 'gallery') {
			obj['src'] = this.galleryFile;
		} else {
			obj['src'] = this.mediaFile;
		}
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
						if (type == 'gallery') {
							this.gallery_images.push({
								media_id: response.result._id,
								file_name: response.result.name,
								sequence_number: this.addmediaForm.value.sequence_number
							});
							this.galleryData.push(response.result);
							this.galleryFile = '';
							this.addgalleryForm = this.formBuilder.group({
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
						} else {
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
		if (this.galleryFile) {
			this.deletedMediaFile.push(this.mediaData.src);
			this.deleteMediaFile();
		}
		if (this.mediaFile) {
			this.deletedMediaFile.push(this.mediaFile);
			this.deleteMediaFile();
		}
	}

	deleteMedia() {
		this.images.splice(1, 1);
		this.isMediaDeleted = true;
		this.deletedMediaData = this.mediaData;
		this.mediaData = null;
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

	deleteMediaMultiFiles() {
		if (this.deletedMediaFiles) {
			let obj = {};
			obj['files'] = this.deletedMediaFiles;
			obj['ids'] = this.deletedMediaData.map(md => { return md._id });
			this.collectionService.deleteMediaData(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.isUploaded = false;
						if (this.galleryFile) {
							this.galleryFile = '';
						} else {
							this.mediaFile = '';
						}
					}
					else {
						// this.bannerVideo = this.bannerVideo;
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
				massage: responseData.massage,
				token: this.token
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
