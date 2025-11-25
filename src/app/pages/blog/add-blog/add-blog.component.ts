import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
// Services
import { BlogService } from '../../../providers/blog/blog.service';
import * as moment from 'moment';
import { MediaService } from 'src/app/providers/media/media.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/providers/data/data.service';
@Component({
	selector: 'app-add-blog',
	templateUrl: './add-blog.component.html',
	styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent {

	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	blogImage: any;
	imagePath: any;
	videomsg: boolean = false;

	// Data Assign
	tagData: any;
	authorData: any;
	addBlogForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;

	token: any;
	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
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
	isMediaEdit = false;
	mediaID: any;
	blogData: any;
	ImageName: any;

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
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private modalService: NgbModal,
		private toastr: ToastrManager,
		private blogService: BlogService,
		private mediaService: MediaService,
		public dataService: DataService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addBlogForm = this.formBuilder.group({
			name: ['', Validators.required],
			// tag: [''],
			blog_category: [''],
			author: [''],
			video_link: [''],
			publication_date: [''],
			status: [true, Validators.required],
			content_html: ['', Validators.required]
		});
		this.imagePath = environment.baseUrl + '/public/';
		this.url = environment.Url + '/assets';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addBlogForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {

		this.id = this.route.snapshot.paramMap.get('id');
		this.get_tagdata();
		this.get_authordata()
		if (this.isEdit) {
			this.patchingdata(this.id);
		}
	}

	get_tagdata() {
		this.blogService.getTagDeta({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.tagData = response.result;
					}

				}
			},
		);
	}

	get_authordata() {
		this.blogService.getAuthorData({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.authorData = response.result;
					}

				}
			},
		);
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.blogService.getblogWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.blogData = response.result;
					this.blogImage = data?.image;
					this.mediaData = data?.media_data[0];

					this.addBlogForm.patchValue({
						name: data?.name,
						tag: data?.tag_list,
						blog_category: data?.category,
						author: data?.author,
						video_link: data?.video_link,
						featured: data?.featured,
						status: data?.status,
						content_html: data?.content,
						publication_date: moment(data?.publication_date).format('YYYY-MM-DD'),
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addBlogForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['mobile_image'] = this.ImageName;
		if (this.addBlogForm.invalid) {
			return;
		}
		if (this.mediaData) {
			obj['image'] = this.mediaData._id;
		}
		if (!this.isEdit) {
			this.blogService.addBlog(obj).subscribe(
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
						setTimeout(() => {
							this.router.navigate(['/blog/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.CreateErrorResponse(response);
					}
				},
			);
		}
		else {
			this.blogService.editBlogdata(obj, id).subscribe(
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
						setTimeout(() => {
							this.router.navigate(['/blog/view']);
						}, 2000);
					} else {
						this.CreateErrorResponse(response);
					}
				},
			);
		}
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
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass",size: 'xl',  backdrop: 'static' })
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
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass",size: 'xl',  backdrop: 'static' })
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

	onUploadOutput(output: UploadOutput, typeofImage): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/blog/addimage',
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
		}
		else {
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
							if (this.blogData.media_data && this.blogData.media_data.length > 0) {
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
	}

	deleteMedia(i, type) {
		this.images.splice(i, 1);
		this.isMediaDeleted = true;
		this.deletedMediaData = this.mediaData;
		this.mediaData = null;
	}

	deleteMediaData() {
		if (this.deletedMediaData) {
			var mylist = { id: this.deletedMediaData._id, file: this.deletedMediaData.src };
			this.blogService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
						this.deletedMediaFile = [];
						this.isMediaFileDeleted = false;
					}
				},
			);
		}
	}

	deleteMediaFile() {
		if (this.isUploaded && this.deletedMediaFile && this.deletedMediaFile.length > 0) {
			let obj = {};
			obj['files'] = this.deletedMediaFile;
			this.blogService.deletefile(obj).subscribe(
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
			this.dataService.addErrorResponse(obj).subscribe(
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
