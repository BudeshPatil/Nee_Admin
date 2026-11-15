import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { AboutService } from 'src/app/providers/about/about.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-home-about-edit',
	templateUrl: './home-about-edit.component.html',
	styleUrls: ['./home-about-edit.component.scss']
})
export class HomeAboutEditComponent implements OnInit {

	// form variables
	addForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;
	isLoading = false;
	loadError = false;
	isSaving = false;
	uploadingBanner = false;
	uploadingDesc = false;

	// Image Variables
	uploadInput: EventEmitter<UploadInput>;
	selectedFile: any;
	imageDataBanner: any;
	imageDataDesc: any;
	imagePath: any;

	// Edit Action Here
	applyAction: any;
	id: any;
	show = false; // for tooltip
	show1 = false; // for tooltip
	show2 = false; // for tooltip
	show3 = false; // for tooltip
	AboutData: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;

	//Angular Editor Config
	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '280px',
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
	//
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private aboutService: AboutService,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager
	) {
		this.addForm = this.formBuilder.group({
			title_sign: ['', Validators.required],
			title_name: ['', Validators.required],
			desc_short: ['', Validators.required],
			desc_long: ['', Validators.required],
			video_url: [''],
			page_section: ['home', Validators.required],
			video_desc: [''],
			image_banner: [''],
			image_desc: [''],
			status: ['true', Validators.required],
		});
		this.uploadInput = new EventEmitter<UploadInput>();
		this.token = localStorage.getItem('neelgund-admin-token');
		this.imagePath = environment.baseUrl + '/public/';
	}

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
		this.isLoading = true;
		this.loadError = false;
		this.msg_danger = false;
		let obj = { id: id };
		this.aboutService.getAboutWithId(obj).subscribe(
			(response) => {
				this.isLoading = false;
				if (response.code == 200) {
					let data = response?.result;
					if (!data) {
						this.loadError = true;
						this.throw_msg = 'The requested About section could not be found.';
						return;
					}
					// this.addForm = response.result;
					this.imageDataBanner = data?.image_banner;
					this.imageDataDesc = data?.image_desc;
					this.addForm.patchValue({
						title_sign: data?.title_sign,
						title_name: data?.title_name,
						desc_short: data?.desc_short,
						desc_long: data?.desc_long,
						video_url: data?.video_url,
						video_desc: data?.video_desc,
						page_section: data?.page_section,
						status: String(data?.status),
					});
					window.scroll(0, 0);
				} else {
					this.loadError = true;
					this.throw_msg = response.message || 'The About section could not be loaded.';
					this.msg_danger = true;
					this.toastr.errorToastr(this.throw_msg, 'Unable to load');
				}
			},
			() => {
				this.isLoading = false;
				this.loadError = true;
				this.msg_danger = true;
				this.throw_msg = 'The About section could not be loaded. Check your connection and try again.';
				this.toastr.errorToastr(this.throw_msg, 'Unable to load');
			}
		);
	}


	onSubmit(): void {
		this.submitted = true;

		if (this.addForm.invalid) return;

		this.isSaving = true;
		this.msg_success = false;
		this.msg_danger = false;
		const obj = {
			...this.addForm.value,
			token: this.token,
			image_banner: this.imageDataBanner,
			image_desc: this.imageDataDesc,
		};

		if (!this.isEdit) {
			this.aboutService.addAboutData(obj).subscribe({
				next: (response) => {
					if (response.code === 200) {
						this.throw_msg = response.message;
						this.msg_success = true;
						this.msg_danger = false;
						this.toastr.successToastr('Created Successfully', 'Success');
						setTimeout(() => this.router.navigate(['/homepage/about-view']), 2000);
					} else {
						this.handleError(response);
					}
				},
				error: (err) => {
					this.isSaving = false;
					const serverError = err?.error?.error || '';
					const message = err?.error?.message || 'Server error occurred.';

					if (serverError.includes('duplicate key')) {
						this.toastr.warningToastr('Duplicate section exists. Try a different one.', 'Duplicate Entry');
					} else {
						this.toastr.errorToastr(`${message}: ${serverError}`, 'Error');
					}

					this.throw_msg = message;
					this.msg_danger = true;

					console.error('Add about failed:', err);
				}

			});
		} else {
			const id = this.id;
			this.aboutService.editaboutdata(obj, id).subscribe({
				next: (response) => {
					if (response.code === 200) {
						this.throw_msg = response.message || 'About content updated successfully.';
						this.msg_success = true;
						this.msg_danger = false;
						this.toastr.successToastr('Updated Successfully', 'Success');
						setTimeout(() => this.router.navigate(['/homepage/about-view']), 2000);
					} else {
						this.handleError(response);
					}
				},
				error: (err) => {
					this.isSaving = false;
					const serverError = err?.error?.error || '';
					const message = err?.error?.message || 'Server error occurred.';

					if (serverError.includes('duplicate key')) {
						this.toastr.warningToastr('Duplicate section exists. Try a different one.', 'Duplicate Entry');
					} else {
						this.toastr.errorToastr(`${message}: ${serverError}`, 'Error');
					}

					this.throw_msg = message;
					this.msg_danger = true;

					console.error('Add about failed:', err);
				}

			});
		}
	}

	private handleError(response: any): void {
		this.isSaving = false;
		const errorMessage = response.message || 'Request failed';
		const serverError = response.error || '';
		this.throw_msg = errorMessage;
		this.msg_danger = true;

		if (serverError.includes('duplicate key')) {
			this.toastr.warningToastr('Duplicate section exists (e.g. "home"). Try a different one.', 'Duplicate Entry');
		} else {
			this.toastr.errorToastr(`${errorMessage}: ${serverError}`, 'Error');
		}
	}

	onUploadFile(output: UploadOutput): void {
		this.selectedFile = output;
		if (output.type === 'allAddedToQueue') {
			this.uploadingBanner = true;
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/about/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.uploadingBanner = false;
			if (output.file.response?.result) {
				this.imageDataBanner = output.file.response.result;
				this.throw_msg = output.file.response.message || 'Primary image uploaded successfully.';
				this.msg_success = true;
				this.msg_danger = false;
			} else {
				this.handleUploadError(output.file.response?.message);
			}
		} else if (output.type === 'rejected') {
			this.uploadingBanner = false;
			this.handleUploadError();
		}
	}

	onUploadFile2(output: UploadOutput): void {
		this.selectedFile = output;

		if (output.type === 'allAddedToQueue') {
			this.uploadingDesc = true;
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/about/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.uploadingDesc = false;
			if (output.file.response?.result) {
				this.imageDataDesc = output.file.response.result;
				this.throw_msg = output.file.response.message || 'Supporting image uploaded successfully.';
				this.msg_success = true;
				this.msg_danger = false;
			} else {
				this.handleUploadError(output.file.response?.message);
			}
		} else if (output.type === 'rejected') {
			this.uploadingDesc = false;
			this.handleUploadError();
		}
	}

	private handleUploadError(message?: string): void {
		this.throw_msg = message || 'Image upload failed. Please try again.';
		this.msg_success = false;
		this.msg_danger = true;
		this.toastr.errorToastr(this.throw_msg, 'Upload failed');
	}


	public hasError = (controlName: string, errorName: string) => {
		return this.addForm.controls[controlName].hasError(errorName);
	};

	onCancel() {
		this.router.navigate(['/about']);
	}
}
