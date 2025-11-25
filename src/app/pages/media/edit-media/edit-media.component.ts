import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';
import { MediaService } from '../../../providers/media/media.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['./edit-media.component.scss']
})
export class EditMediaComponent {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	mediaFile: any;
	imagePath: any;
	imageArr: any = [];

	// Data Assign

	artData: any;
	countryData: any;
	addmediaForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
	fileFormat: any;
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
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private mediaService: MediaService,
		private toastr: ToastrManager,
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			description: [''],
			short_desc: [''],
			src: [''],
			height: [''],
			width: [''],
			alt: [''],
			style: [''],
			landing: [''],
			type:[''],
			format:[''],
			file_type:['image'],
			mute:['muted'],
			autoplay:[true],
			loop:[true],
			full_screen: [''],
			additional_params:['']
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addmediaForm.controls[controlName].hasError(errorName);
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
		this.mediaService.getMediaWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.mediaFile = data?.src;
					this.addmediaForm.patchValue({
						name: data?.name,
						status: data?.status,
						description: data?.description,
						short_desc: data?.short_desc,
						height: data?.height,
						width: data?.width,
						alt: data?.alt,
						style: data?.style,
						landing: data?.landing,
						type: data?.type,
						format: data?.format,
						file_type: data?.file_type,
						mute: data?.mute,
						autoplay: data?.autoplay,
						loop: data?.loop,
						full_screen: data?.full_screen,
						additional_params: data?.additional_params,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addmediaForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['src'] = this.mediaFile;
		obj['format'] = this.fileFormat;
		if (this.addmediaForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.mediaService.addMedia(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/media/view']);
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
			this.mediaService.editMediadata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/media/view']);
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

	onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/media/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.fileFormat = output.file.type
			this.mediaFile = output.file.response.result;
		}
	}

	onUploadVideo(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/media/addVideo',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.fileFormat = output.file.type
			this.mediaFile = output.file.response.result;
		}
	}
}
