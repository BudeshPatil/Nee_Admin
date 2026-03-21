import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../environments/environment';

// Services
import { from } from 'rxjs';
import { AboutService } from '../../providers/about/about.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MediaService } from 'src/app/providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ResponseService } from 'src/app/providers/response/response.service';
@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	image_banner: any = [];
	image_desc: any = [];
	imagePath: any;
	imageArr: any = [];

	//Media
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

	// Data Assign
	addaboutForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

	// Edit Action Here
	id: any;
	AboutData: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	extension = 'svg';
	qrCode = null;
	@ViewChild('canvas', { static: true }) canvas: ElementRef;
	QRcodeImage: any = '';
	qrcodeurl: any = 'http://makemycard.online/';
	@ViewChild('qrcode', { static: true }) qrcode: ElementRef;
	isUpdate: any = false;
	user: any;
	document: any;
	selectedFile: any;

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
		private router: Router,
		private aboutService: AboutService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager,
		private mediaService: MediaService,
		private modalService: NgbModal,
		public responseService: ResponseService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addaboutForm = this.formBuilder.group({
			title_sign: ['', Validators.required],
			title_name: ['', Validators.required],
			desc_short: ['', Validators.required],
			desc_long: ['', Validators.required],
			video_url: ['', Validators.required],
			video_desc: [''],
			image_banner: [''],
			image_desc: [''],
			status: ['false', Validators.required],
		});

		this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'] };
		// this.addmediaForm = this.formBuilder.group({
		//   name: ['', Validators.required],
		//   status: [true, Validators.required],
		//   sequence_number: [''],
		//   src: ['', Validators.required],
		//   format: [''],
		//   file_type: ['image'],
		//   alt: [''],
		//   role: [''],
		//   resolution: [''],
		//   size: [''],
		//   height: [''],
		//   width: [''],
		//   mute: ['muted'],
		//   autoplay: [true],
		//   loop: [true],
		//   full_screen: [''],
		// });

		this.token = localStorage.getItem('neelgund-admin-token');
		this.imagePath = environment.baseUrl + '/public/';
		let tempuser = localStorage.getItem('user');
		this.user = JSON.parse(tempuser);
	}

	ngOnInit(): void {
		this.get_AboutData();
	}

	get_AboutData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		// this.aboutService.getaboutDetails(obj).subscribe(
		this.aboutService.getAboutWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.AboutData = response.result;
						this.totalRecord = response?.count;
						let data = this.AboutData[0];

						this.image_banner = data?.image_banner;
						this.image_desc = data?.image_desc;
						this.mediaData = data?.image_desc_data[0];
						this.addaboutForm.patchValue({
							title_sign: data?.title_sign,
							title_name: data?.title_name,
							desc_short: data?.desc_short,
							desc_long: data?.desc_long,
							video_url: data?.video_url,
							video_desc: data?.video_desc,
							status: data?.status,
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

	// patchingdata(id: any) {
	// 	let obj = { id: id };
	// 	this.aboutService.getAboutWithId(obj).subscribe(
	// 		(response) => {
	// 			if (response.code == 200) {
	// 				let data = response?.result;
	// 				this.AboutData = response.result;
	// 				this.image_banner = data?.image_banner;
	// 				this.image_desc = data?.image_desc;
	// 				this.mediaData = data?.media_data[0];
	// 				this.addaboutForm.patchValue({
	// 					name: data?.name,
	// 					status: data?.status,
	// 					description: data?.description,
	// 					short_desc: data?.short_desc,
	// 					url_key: data?.url_key,
	// 				});
	// 			} else {

	// 			}
	// 		},
	// 	);
	// }

	public hasError = (controlName: string, errorName: string) => {
		return this.addaboutForm.controls[controlName].hasError(errorName);
	};

	onSubmit() {
	// 	this.submitted = true;
	// 	let obj = this.addaboutForm.value;
	// 	let id = this.AboutData[0]._id;
	// 	if (id === null || id.trim() === "") {
	// 		this.onSubmitNew();
	// 	}
	// 	obj['token'] = this.token;
	// 	obj['image_banner'] = this.image_banner;
	// 	// obj['image_desc'] = this.image_desc;

	// 	if (this.mediaData) {
	// 		obj['image_desc'] = this.mediaData._id;
	// 	}

	// 	if (this.addaboutForm.invalid) {
	// 		return;
	// 	}
	// 	this.aboutService.editaboutdata(obj, id).subscribe(
	// 		(response) => {
	// 			if (response.code == 200) {
	// 				this.throw_msg = response.message
	// 				this.msg_success = true;
	// 				this.isUploaded = true;
	// 				if (this.isMediaDeleted) {
	// 					this.deleteMediaData();
	// 				}
	// 				if (this.isMediaFileDeleted) {
	// 					this.deleteMediaFile();
	// 				}
	// 				setTimeout(() => {
	// 					this.router.navigate(['/about']);
	// 					this.toastr.successToastr(response.message);
	// 				}, 2000);
	// 			}
	// 			else {
	// 				this.throw_msg = response.message
	// 				this.msg_danger = true;
	// 				this.CreateErrorResponse(response);
	// 			}
	// 		},
	// 	);
	}

	// onSubmitNew() {
	//   this.submitted = true;
	//   let obj = this.addaboutForm.value;
	//   obj['token'] = this.token;
	//   obj['image_banner'] = this.image_banner;

	//   if (this.mediaData) {
	//     obj['image_desc'] = this.mediaData._id;
	//   }

	//   if (this.addaboutForm.invalid) {
	//     return;
	//   }

	//   // Call the service method to create a new entry
	//   this.aboutService.addAboutData(obj).subscribe(
	//     (response) => {
	//       if (response.code == 200) {
	//         this.throw_msg = response.message;
	//         this.msg_success = true;
	//         this.isUploaded = true;
	// 				if (this.isMediaDeleted) {
	//           this.deleteMediaData();
	//         }
	//         if (this.isMediaFileDeleted) {
	//           this.deleteMediaFile();
	//         }
	//         setTimeout(() => {
	//           this.router.navigate(['/about']);
	//           this.toastr.successToastr(response.message);
	//         }, 2000);
	//       } else {
	//         this.throw_msg = response.message;
	//         this.msg_danger = true;
	//         this.CreateErrorResponse(response);
	//       }
	//     },
	//   );
	// }



	onUploadFileBanner(output: UploadOutput): void {
		this.selectedFile = output;
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/about/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.image_banner = output.file.response.result;
			this.throw_msg = output.file.response.message;
			this.msg_success = true;
		}
	}

	onCancel() {
		this.router.navigate(['/about']);
	}

	// openMedia(content: any) {
	//   this.addmediaForm = this.formBuilder.group({
	//     name: ['', Validators.required],
	//     status: [true, Validators.required],
	//     sequence_number: [''],
	//     src: ['', Validators.required],
	//     format: [''],
	//     file_type: ['image'],
	//     alt: [''],
	//     role: [''],
	//     resolution: [''],
	//     size: [''],
	//     height: [''],
	//     width: [''],
	//     mute: ['muted'],
	//     autoplay: [true],
	//     loop: [true],
	//     full_screen: [''],
	//   });
	//   this.mediaFile = '';
	//   this.isMediaEdit = false;
	//   this.mediaID = '';
	//   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' })
	//     .result.then((result) => {
	//       this.closeResult = `Closed with: ${result}`;
	//     }, (reason) => {
	//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	//     });
	// }

	// editMedia(content: any, mediaData, type) {
	//   this.isMediaEdit = true;
	//   this.mediaFile = mediaData.src;
	//   this.mediaID = mediaData._id;
	//   this.addmediaForm.patchValue({
	//     name: mediaData.name,
	//     status: mediaData.status,
	//     sequence_number: mediaData.sequence_number,
	//     src: mediaData.src,
	//     format: mediaData.format,
	//     file_type: mediaData.file_type,
	//     alt: mediaData.alt,
	//     role: mediaData.role,
	//     resolution: mediaData.resolution,
	//     size: mediaData.size,
	//     height: mediaData.height,
	//     width: mediaData.width,
	//     mute: mediaData.mute,
	//     autoplay: mediaData.autoplay,
	//     loop: mediaData.loop,
	//     full_screen: mediaData.full_screen,
	//   });
	//   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' })
	//     .result.then((result) => {
	//       this.closeResult = `Closed with: ${result}`;
	//     }, (reason) => {
	//       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	//     });
	// }

	// private getDismissReason(reason: any): string {
	//   if (reason === ModalDismissReasons.ESC) {
	//     return 'by pressing ESC';
	//   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
	//     return 'by clicking on a backdrop';
	//   } else {
	//     return `with: ${reason}`;
	//   }
	// }

	// onUploadOutput(output: UploadOutput, typeofImage): void {
	//   if (output.type === 'allAddedToQueue') {
	//     const event: UploadInput = {
	//       type: 'uploadAll',
	//       url: environment.baseUrl + '/api/about/addimage',
	//       method: 'POST',
	//       data: {},
	//     };
	//     this.uploadInput.emit(event);
	//   }
	//   else if (output.type === 'done' && typeof output.file !== 'undefined') {
	//     this.isUploaded = true;
	//     this.fileFormat = output.file.type;
	//     if (this.mediaFile) {
	//       this.deletedMediaFile.push(this.mediaFile);
	//       this.isMediaFileDeleted = true;
	//     }
	//     this.mediaFile = output.file.response.result;
	//     this.addmediaForm.value.resolution = output.file.size;
	//     this.submittedMedia = false;
	//     this.addmediaForm.patchValue({
	//       src: this.mediaFile
	//     });
	//   }
	// }

	// selectImageRole(event, role) {
	//   if (role == 'base') {
	//     this.addmediaForm.patchValue({
	//       height: 1100,
	//       width: 1100,
	//     });
	//   } else if (role == 'small') {
	//     this.addmediaForm.patchValue({
	//       height: 309,
	//       width: 309,
	//     });
	//   } else if (role == 'thumbnail') {
	//     this.addmediaForm.patchValue({
	//       height: 150,
	//       width: 150,
	//     });
	//   }
	// }

	// public hasMediaFormError = (controlName: string, errorName: string) => {
	//   return this.addmediaForm.controls[controlName].hasError(errorName);
	// };

	// onSubmitMedia(type) {
	//   let obj = this.addmediaForm.value;
	//   let id = this.mediaID;
	//   obj['token'] = this.token;
	//   obj['src'] = this.mediaFile;
	//   obj['format'] = this.fileFormat;
	//   this.submittedMedia = true;
	//   if (this.addmediaForm.invalid) {
	//     return;
	//   }
	//   if (!this.isMediaEdit) {
	//     this.mediaService.addMedia(obj).subscribe(
	//       (response) => {
	//         if (response.code == 200) {
	//           this.submittedMedia = false;
	//           if (this.deletedMediaFile.length > 0) {
	//             this.deleteMediaFile();
	//           }
	//           this.toastr.successToastr(response.message);
	//           if (this.addmediaForm.value.sequence_number) {
	//             this.temp_sequence_number = this.addmediaForm.value.sequence_number
	//           } else {
	//             this.temp_sequence_number = this.temp_sequence_number + 1;
	//           }
	//           this.images.push({
	//             media_id: response.result._id,
	//             file_name: response.result.name,
	//             sequence_number: this.addmediaForm.value.sequence_number
	//           });
	//           this.mediaData = response.result;
	//           this.mediaFile = '';
	//           this.isUploaded = false;
	//           this.addmediaForm = this.formBuilder.group({
	//             name: ['', Validators.required],
	//             status: [true, Validators.required],
	//             sequence_number: [''],
	//             src: ['', Validators.required],
	//             format: [''],
	//             file_type: ['image'],
	//             alt: [''],
	//             role: [''],
	//             resolution: [''],
	//             size: [''],
	//             height: [''],
	//             width: [''],
	//             mute: ['muted'],
	//             autoplay: [true],
	//             loop: [true],
	//             full_screen: [''],
	//           });
	//           this.modalService.dismissAll();
	//         }
	//         else {
	//           this.toastr.errorToastr(response.message);
	//         }
	//       },
	//     );
	//   }
	//   else {
	//     if (id) {
	//       this.mediaService.editMediadata(obj, id).subscribe(
	//         (response) => {
	//           if (response.code == 200) {
	//             this.throw_msg = response.message
	//             this.msg_success = true;
	//             this.toastr.successToastr(response.message);
	//             if (this.mediaData) {
	//               this.deletedMediaFile.push(this.mediaData.src);
	//               this.deleteMediaFile();
	//             }
	//             setTimeout(() => {
	//               this.mediaData.src = response.result.src;
	//               window.location.reload();
	//             }, 1000);
	//             this.mediaData.src = response.result.src;
	//             if (this.AboutData.media_data && this.AboutData.media_data.length > 0) {
	//               this.patchingdata(this.id);
	//             }
	//             this.modalService.dismissAll();
	//           } else {
	//             this.throw_msg = response.message
	//             this.msg_danger = true;
	//             this.toastr.errorToastr(response.message);
	//           }
	//         },
	//       );
	//     }
	//   }
	// }

	// onCancelMedia() {
	//   this.addmediaForm = this.formBuilder.group({
	//     name: ['', Validators.required],
	//     status: [true, Validators.required],
	//     sequence_number: [''],
	//     src: ['', Validators.required],
	//     format: [''],
	//     file_type: ['image'],
	//     alt: [''],
	//     role: [''],
	//     resolution: [''],
	//     size: [''],
	//     height: [''],
	//     width: [''],
	//     mute: ['muted'],
	//     autoplay: [true],
	//     loop: [true],
	//     full_screen: [''],
	//   });
	//   this.modalService.dismissAll();
	//   this.deletedMediaFile.push(this.mediaFile);
	//   this.deleteMediaFile();
	// }

	// deleteMedia(i, type) {
	//   this.images.splice(i, 1);
	//   this.isMediaDeleted = true;
	//   this.deletedMediaData = this.mediaData;
	//   this.mediaData = null;
	// }

	deleteMediaData() {
	  if (this.deletedMediaData) {
	    var mylist = { id: this.deletedMediaData._id, file: this.deletedMediaData.src };
	    this.aboutService.deleteMediaData(mylist).subscribe(
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
	    this.aboutService.deletefile(obj).subscribe(
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
