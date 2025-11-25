import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CollectionService } from 'src/app/providers/collection/collection.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SubcategoryService } from '../../../providers/subcategory/subcategory.service';
import { MediaService } from '../../../providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/providers/category/category.service';
import { CollectioncategoryService } from 'src/app/providers/collectioncategory/collectioncategory.service';

@Component({
	selector: 'app-add-collection',
	templateUrl: './add-collection.component.html',
	styleUrls: ['./add-collection.component.scss']
})
export class AddCollectionComponent {
	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
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
	subCategoryData: any = [];
	dropdownSettings = {};
	images: any = [];
	gallery_images: any = [];
	addmediaForm: FormGroup;
	addgalleryForm: FormGroup;
	mediaFile: any;
	galleryFile: any;
	fileFormat: any;
	temp_sequence_number = 0;
	submittedMedia: boolean = false;
	mediaData: any = [];
	galleryData: any = [];
	closeResult = '';
	url: any;
	isUploaded: boolean = false;
	deletedMediaFiles: any = [];
	isMediaEdit = false;
	mediaID: any;
	collectionData: any;
	deletedMediaData: any = [];
	isMediaDeleted = false; // its true if media is changed with new image
	isMediaFileDeleted = false;
	deletedMediaFile: any = [];
	CategoryData: any;
	CollectioncategoryData:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private collectionService: CollectionService,
		private toastr: ToastrManager,
		private subcategoryService: SubcategoryService,
		private modalService: NgbModal,
		private mediaService: MediaService,
		private categoryService: CategoryService,
		public collectionCategoryService:CollectioncategoryService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addcollectionForm = this.formBuilder.group({
			name: ['', Validators.required],
			title: [''],
			status: ['', Validators.required],
			description: [''],
			categories: [''],
			collection_category: ['', Validators.required],
			url_key: ['', Validators.required]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.getallCategory();
		this.get_SubCategoryData();
		this.getallCollectionCategory();
		this.url = environment.Url + '/assets';
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
		this.collectionService.getCollectionWithId(obj).subscribe(
			(response) => {
				if (response.code == 200 && response?.result.length > 0) {
					let data = response?.result[0];
					this.collectionData = response?.result[0];
					let tempcategoriesData = [];
					if (data?.categories) {
						data.categories.forEach((item, index) => {
							tempcategoriesData.push({ _id: item.category_id, name: item.category_name });
						});
					}
					if (data?.media_data) {
						this.mediaData = data?.media_data;
						this.temp_sequence_number = data?.media_data.length;
					} else {
						this.mediaData = [];
					}
					if (data?.galleyimagedata) {
						this.galleryData = data?.galleyimagedata;
						this.temp_sequence_number = data?.galleyimagedata.length;
					} else {
						this.galleryData = [];
					}
					if (data?.image) {
						this.images = data?.image;
					} else {
						this.images = [];
					}
					if (data?.gallery_image) {
						this.gallery_images = data?.gallery_image;
					} else {
						this.gallery_images = [];
					}
					this.addcollectionForm.patchValue({
						name: data?.name,
						title: data?.title,
						status: data?.status,
						description: data?.description,
						url_key: data?.url_key,
						isApproved: data?.isApproved,
						categories: tempcategoriesData,
						collection_category: data?.collection_category,
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
		obj['image'] = this.images;
		obj['gallery_image'] = this.gallery_images;
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
			this.collectionService.addCollection(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						if (this.isMediaDeleted) {
							this.deleteMediaMultiFiles();
						}
						if (this.isMediaFileDeleted) {
							this.deleteMediaFile();
						}
						setTimeout(() => {
							this.router.navigate(['/collection/view']);
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
			this.collectionService.editCollectiondata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.deleteMediaMultiFiles();
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/collection/view']);
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

	getallCollectionCategory() {
		this.collectionCategoryService.getallCollectionCategoryDetails({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CollectioncategoryData = response.result;
					}
					else {
					}
				}
			},
		);
	}


	onCancel() {
		this.router.navigate(['/collection/view']);
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
		this.galleryFile = '';
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

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	editMedia(content: any, mediaData, type) {
		this.isMediaEdit = true;
		this.mediaID = mediaData._id;
		if (type == 'gallery') {
			this.galleryFile = mediaData.src;
		} else {
			this.mediaFile = mediaData.src;
		}
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
				url: environment.baseUrl + '/api/collection/addimage',
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
				this.addmediaForm.value.resolution = output.file.size;
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

	public hasMediaFormError = (controlName: string, errorName: string) => {
		return this.addmediaForm.controls[controlName].hasError(errorName);
	};

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

	onSubmitMedia(type) {
		let obj = this.addmediaForm.value;
		let id = this.mediaID;
		obj['token'] = this.token;
		if (type == 'gallery') {
			obj['src'] = this.galleryFile;
		} else {
			obj['src'] = this.mediaFile;
		}
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
						} else {
							this.images.push({
								media_id: response.result._id,
								file_name: response.result.name,
								sequence_number: this.addmediaForm.value.sequence_number
							});
							this.mediaData.push(response.result);
							this.mediaFile = '';
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
						this.modalService.dismissAll();
					}
					else {
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
		else {
			if (id) {
				this.mediaService.editMediadata(obj, id).subscribe(
					(response) => {
						if (response.code == 200) {
							this.throw_msg = response.message
							this.msg_success = true;
							this.toastr.successToastr(response.message);
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
							if (type == 'gallery') {
								if (this.galleryData && this.galleryData.length > 0) {
									this.galleryData.forEach(media => {
										if (media._id == response.result._id) {
											this.deletedMediaFile.push(this.mediaData.src);
											this.deleteMediaFile();
											media.src = response.result.src;
										}
									});
									if (this.collectionData.gallery_image && this.collectionData.gallery_image.length > 0) {
										this.patchingdata(this.id);
									}
									this.modalService.dismissAll();
								}
							} else {
								if (this.mediaData && this.mediaData.length > 0) {
									this.mediaData.forEach(media => {
										if (media._id == response.result._id) {
											this.deletedMediaFile.push(media.src);
											this.deleteMediaFile();
											media.src = response.result.src;
										}
									});
									if (this.collectionData.media_data && this.collectionData.media_data.length > 0) {
										this.patchingdata(this.id);
									}
									this.modalService.dismissAll();
								}
							}
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

	deleteMediaFile() {
		if (this.isUploaded && this.deletedMediaFile && this.deletedMediaFile.length > 0) {
			let obj = {};
			obj['files'] = this.deletedMediaFile;
			this.collectionService.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.isUploaded = false;
						this.mediaFile = '';
						this.deletedMediaFile = [];
					}
					else {
						// this.bannerVideo = this.bannerVideo;
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

	deleteMedia(i, id) {
		let tempMedia = this.mediaData.filter((item) => item._id == id);
		if (tempMedia && tempMedia.length > 0) {
			this.deletedMediaFiles.push(tempMedia[0].src);
			this.deletedMediaData.push(tempMedia[0]);
			this.isMediaDeleted = true;
		}
		this.images.splice(i, 1);
		this.mediaData.splice(i, 1);
	}

	deleteGallery(i, id) {
		let tempMedia = this.galleryData.filter((item) => item._id == id);
		if (tempMedia && tempMedia.length > 0) {
			this.deletedMediaFiles.push(tempMedia[0].src);
			this.deletedMediaData.push(tempMedia[0]);
		}
		this.gallery_images.splice(i, 1);
		this.galleryData.splice(i, 1);
	}

}
