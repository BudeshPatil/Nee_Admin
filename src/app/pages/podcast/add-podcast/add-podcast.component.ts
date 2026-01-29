import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

// Services
import { PodcastService } from '../../../providers/podcast/podcast.service';
import { MediaService } from '../../../providers/media/media.service';
import { ResponseService } from '../../../providers/response/response.service';
import { PodcastcategoryService } from 'src/app/providers/podcastcategory/podcastcategory.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AudioService } from '../../../providers/audio/audio.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-podcast',
  templateUrl: './add-podcast.component.html',
  styleUrls: ['./add-podcast.component.scss']
})
export class AddPodcastComponent implements OnInit {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	podcastImage: any;
	podcastImage2: any;
	podcastVideo: any;
	imagePath: any;
	imageArr: any = [];
	// Data Assign
	artData: any;
	countryData: any;
	addpodcastForm: FormGroup;
	addAudioForm: FormGroup;
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
	podcastData: any = [];
	categoryData: any = [];
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
      {class: 'career_box', name: 'Rajdhani sans-serif'},
    ],
  }
	submittedAudio:boolean = false;
	isAudioEdit = false;
	audioFile : any;
	audioID = '';
	deletedAudioFile:any = [];
	audioData: any;
	isAudioFileDeleted = false;
	deletedAudioData:any = [];
	audioList = [];
	audioImageFile: any;
	tempAudio = [];
	podcastAudio = [];
	currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
	relatedPodcastData:any = [];
	relatedProdcast:any = [];
	searchText = '';
	podcasts:any = [];
	selectedFile: any;

	currentDate: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private podcastService: PodcastService,
		private modalService: NgbModal,
		private mediaService: MediaService,
		private toastr: ToastrManager,
		public responseService: ResponseService,
		public categorySerice : PodcastcategoryService,
		public audioService : AudioService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.options = { concurrency: 0, allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'] };
		this.addpodcastForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			podcast_category: ["", Validators.required],
			event_date: ['', Validators.required],
			description: ['', Validators.required],
			short_desc: [''],
			url_key: ['', Validators.required],
			video_url: [''],
			searchText:[''],
			type:['']
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
		this.addAudioForm = this.formBuilder.group({
			title: ['', Validators.required],
			status: [true, Validators.required],
			description: [''],
			link: ['', Validators.required],
			image: [''],
			date: [''],
			artist: [''],
			duration: [''],
			mediaType: [''],
			apple_podcast: [''],
			spotify_link: [''],
		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addpodcastForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		const today = new Date();
    this.currentDate = today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD to match the input type 'date'

		this.get_categorydata();
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
		this.podcastService.getPodcastWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.podcastData = response.result;
					this.podcastImage = data?.image;
					this.podcastImage2 = data?.image_2;
					this.mediaData = data?.media_data[0];
					this.audioData = data?.audio_data[0];
					this.addpodcastForm.patchValue({
						name: data?.name,
						status: data?.status,
						type: data?.type,
						podcast_category:data?.podcast_category,
						description: data?.description,
						short_desc: data?.short_desc,
						url_key: data?.url_key,
						event_date: moment(data?.publication_date).format('YYYY-MM-DD'),
						video_url: data?.video_url,
					});
					let audioObj = {
						url: this.imagePath+"audio/"+this.audioData.link,
						title: this.audioData.title,
						cover: this.imagePath+"audio-image/"+this.audioData.image,
					}
					this.audioList.push(audioObj);
					if(data?.related_podcast){
            this.relatedPodcastData = data?.related_podcast;
          } else {
            this.relatedPodcastData = [];
          }
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addpodcastForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if (this.addpodcastForm.invalid) {
			return;
		}
		if (this.mediaData) {
			obj['image'] = this.mediaData._id;
		}
		obj['image_2'] = this.podcastImage2;
		if (this.audioData) {
			obj['audio'] = this.audioData._id;
		}
		obj['related_podcast'] = this.relatedPodcastData;
		if (!this.isEdit) {
			this.podcastService.addPodcast(obj).subscribe(
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
							this.router.navigate(['/podcast/view']);
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
			this.podcastService.editPodcastdata(obj, id).subscribe(
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
							this.router.navigate(['/podcast/view']);
						}, 2000);
					} else {
						this.CreateErrorResponse(response);
					}
				},
			);
		}
	}

	onCancel() {
		this.router.navigate(['/podcast/view']);
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
				url: environment.baseUrl + '/api/podcast/addimage',
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
							if (this.podcastData.media_data && this.podcastData.media_data.length > 0) {
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
			this.podcastService.deleteMediaData(mylist).subscribe(
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
			this.podcastService.deletefile(obj).subscribe(
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

	get_categorydata()
  {
    this.categorySerice.getallCategory({}).subscribe(
      (response)=> {
        if (response.code == 200)
        {
          if(response.result != null && response.result != '')
          {
            this.categoryData  = response.result;
          }

        }
      },
    );
  }


	//Uploading Audio Files

	openAudio(content: any) {
		this.addAudioForm = this.formBuilder.group({
			title: ['', Validators.required],
			status: [true, Validators.required],
			description: [''],
			link: ['', Validators.required],
			date: [''],
			artist: [''],
			duration: [''],
			audioType: [''],
			apple_podcast: [''],
			spotify_link: [''],
		});
		this.audioFile = '';
		this.isAudioEdit = false;
		this.audioID = '';
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	editAudio(content: any, audioData, type) {
		this.isAudioEdit = true;
		this.audioImageFile = audioData.image;
		this.audioFile = audioData.link
		this.audioID = audioData._id;
		this.addAudioForm.patchValue({
			title: audioData.title,
			status: audioData.status,
			description: audioData.description,
			link: audioData.link,
			date: moment(audioData.date).format('YYYY-MM-DD'),
			artist: audioData.artist,
			duration: audioData.duration,
			audioType: audioData.audioType,
			apple_podcast: audioData.apple_podcast,
			spotify_link: audioData.spotify_link,
		});
		let audioObj = {
			url: this.imagePath+"audio/"+audioData.link,
			title: this.audioData.title,
			cover: this.imagePath+"audio-image/"+audioData.image,
		}
		this.tempAudio.push(audioObj);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'lg', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	public hasAudioFormError = (controlName: string, errorName: string) => {
		return this.addAudioForm.controls[controlName].hasError(errorName);
	};

	onUploadAudioFile(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/audio/addAudioFile',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.isUploaded = true;
			if (this.audioFile) {
				this.deletedAudioFile.push(this.audioFile);
				this.isAudioFileDeleted = true;
			}
			this.audioFile = output.file.response.result;
			let audioObj = {
				url: this.imagePath+"audio/"+this.audioFile,
				title: this.addAudioForm.value.title,
				cover: this.imagePath+"audio-image/"+this.audioImageFile,
			}
			this.tempAudio.push(audioObj);
			this.submittedAudio = false;
			this.addAudioForm.patchValue({
				link: this.audioFile
			});
		}
	}

	onUploadImageFile(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/audio/addImageFile',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.isUploaded = true;
			if (this.audioImageFile) {
				this.deletedAudioFile.push(this.audioFile);
				this.isAudioFileDeleted = true;
			}
			this.audioImageFile = output.file.response.result;
			this.submittedAudio = false;
			this.addAudioForm.patchValue({
				image: this.audioImageFile
			});
		}
	}

	onSubmitAudio() {
		let obj = this.addAudioForm.value;
		let id = this.audioID;
		obj['token'] = this.token;
		obj['link'] = this.audioFile;
		obj['image'] = this.audioImageFile;
		this.submittedAudio = true;
		if (this.addAudioForm.invalid) {
			return;
		}
		if (!this.isAudioEdit) {
			this.audioService.addAudio(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.submittedAudio = false;
						if (this.deletedAudioFile.length > 0) {
							this.deleteAudioFile();
						}
						this.toastr.successToastr(response.message);
						if (this.addAudioForm.value.sequence_number) {
							this.temp_sequence_number = this.addAudioForm.value.sequence_number
						} else {
							this.temp_sequence_number = this.temp_sequence_number + 1;
						}
						this.audioData = response.result;
						let audioObj = {
							url: this.imagePath+"audio/"+this.audioData.link,
							title: this.audioData.title,
							cover: this.imagePath+"audio-image/"+this.audioData.image,
						}
						this.audioList.push(audioObj);
						this.audioFile = '';
						this.addAudioForm = this.formBuilder.group({
							title: ['', Validators.required],
							status: [true, Validators.required],
							description: [''],
							link: ['', Validators.required],
							date: [''],
							artist: [''],
							duration: [''],
							audioType: [''],
							apple_podcast: [''],
							spotify_link: [''],
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
				this.audioService.editAudiodata(obj, id).subscribe(
					(response) => {
						if (response.code == 200) {
							this.throw_msg = response.message
							this.msg_success = true;
							this.toastr.successToastr(response.message);
							if (this.audioData) {
								this.deletedAudioFile.push(this.audioData.src);
								this.deleteAudioFile();
							}
							setTimeout(() => {
								this.audioData.src = response.result.src;
								window.location.reload();
							}, 1000);
							this.audioData.src = response.result.src;
							if (this.podcastData.audio_data && this.podcastData.audio_data.length > 0) {
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

	onCancelAudio() {
		this.addAudioForm = this.formBuilder.group({
			title: ['', Validators.required],
			status: [true, Validators.required],
			description: [''],
			link: ['', Validators.required],
			date: [''],
			artist: [''],
			duration: [''],
			audioType: [''],
			apple_podcast: [''],
			spotify_link: [''],
		});
		this.modalService.dismissAll();
		this.deletedAudioFile.push(this.audioFile);
		this.deleteAudioFile();
	}

	deleteAudio(i, type) {
		this.images.splice(i, 1);
		this.isAudioFileDeleted = true;
		this.deletedAudioData = this.audioData;
		this.audioData = null;
		this.audioList = [];
	}

	deleteAudioData() {
		if (this.deletedAudioData) {
			var mylist = { id: this.deletedAudioData._id, file: this.deletedAudioData.src };
			this.audioService.deleteAudioData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
						this.deletedAudioFile = [];
						this.isAudioFileDeleted = false;
					}
				},
			);
		}
	}

	deleteAudioFile() {
		if (this.isUploaded && this.deletedAudioFile && this.deletedAudioFile.length > 0) {
			let obj = {};
			obj['files'] = this.deletedAudioFile;
			this.audioService.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.isUploaded = false;
						this.audioFile = '';
						this.deletedAudioFile = [];
					}
				},
			);
		}
	}



  play() {
    console.log("play");
  }

	open(content: any) {
    this.get_related_podcast();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass",size: 'lg', backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

	get_related_podcast()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      related_podcast: this.relatedPodcastData,
      existedpodcast: this.id
    };
    this.podcastService.getRelatedPodcast(obj).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(response.result != null && response.result != '')
            {
              this.podcasts = response.result;
              this.totalRecord = response?.count;
              window.scroll(0,0);
            }
            else
            {
              this.podcasts = [];
            }

          }
        },
      );
  }

	removePodast(id,index){
    this.relatedPodcastData.splice(index,1);
  }

	addRelatedPodcast(product,index){
    this.relatedPodcastData.push(product);
    this.get_related_podcast();
  }

	searchPodcast(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_related_podcast();
  }

	onListChangePage(event:any) {
    this.currentPage = event;
    this.get_related_podcast();
  }

	onUploadFileImage2(output: UploadOutput): void {
    this.selectedFile = output;
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/podcast/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.podcastImage2 = output.file.response.result;
      this.throw_msg = output.file.response.message;
      this.msg_success = true;
    }
  }

}
