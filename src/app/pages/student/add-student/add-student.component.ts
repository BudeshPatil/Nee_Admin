import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

// Services
import { StudentService } from '../../../providers/student/student.service';
import { MediaService } from '../../../providers/media/media.service';
import { ResponseService } from '../../../providers/response/response.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	studentImage: any;
	studentVideo: any;
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addstudentForm: FormGroup;
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
	studentData: any;
	courseData: any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private studentService: StudentService,
		private modalService: NgbModal,
		private mediaService: MediaService,
		private toastr: ToastrManager,
		public responseService: ResponseService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'] };
		this.addstudentForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			email: ['', Validators.required],
			contact: ['', Validators.required],
			course: ['', Validators.required],
		});
		this.token = localStorage.getItem('token');
		this.imagePath = environment.baseUrl + '/public/';
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
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addstudentForm.controls[controlName].hasError(errorName);
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
		this.get_coursedata();
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.studentService.getStudentWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.studentData = response.result;
					this.studentImage = data?.image;
					this.mediaData = data?.media_data[0];
					this.addstudentForm.patchValue({
						name: data?.name,
						status: data?.status,
						email: data?.email,
						contact: data?.contact,
						course: data?.course,
					});
				} else {

				}
			},
		);
	}

	get_coursedata()
  {
    this.studentService.getCourseData({}).subscribe(
      (response)=> {  
        if (response.code == 200) 
        {
          if(response.result != null && response.result != '')
          {
            this.courseData  = response.result;
          }
          
        }
      },
    );
  }

	onSubmit() {
		this.submitted = true;
		let obj = this.addstudentForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addstudentForm.invalid) {
			return;
		}
		if (this.mediaData) {
			obj['image'] = this.mediaData._id;
		}
		if (!this.isEdit) {
			this.studentService.addStudent(obj).subscribe(
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
							this.router.navigate(['/student/view']);
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
			this.studentService.editStudentdata(obj, id).subscribe(
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
							this.router.navigate(['/student/view']);
						}, 2000);
					} else {
						this.CreateErrorResponse(response);
					}
				},
			);
		}
	}

	onCancel() {
		this.router.navigate(['/student/view']);
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
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' })
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
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' })
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
				url: environment.baseUrl + '/api/student/addimage',
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
							if (this.studentData.media_data && this.studentData.media_data.length > 0) {
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
			this.studentService.deleteMediaData(mylist).subscribe(
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
			this.studentService.deletefile(obj).subscribe(
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
