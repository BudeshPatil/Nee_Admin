import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { AboutService } from '../../../providers/about/about.service';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-edit-about',
	templateUrl: './edit-about.component.html',
	styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {
	readonly uploadInput = new EventEmitter<UploadInput>();
	addForm: FormGroup;
	id: string | null = null;
	isEdit = false;
	isLoading = false;
	isSaving = false;
	loadingError = '';
	saveError = '';
	imageDataBanner = '';
	imageDataDesc = '';
	imagePath = environment.baseUrl + '/public/';
	token = localStorage.getItem('neelgund-admin-token') || '';

	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '240px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Tell visitors about this section...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [{ class: 'career_box', name: 'Rajdhani sans-serif' }]
	};

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private aboutService: AboutService,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager
	) {
		this.isEdit = this.route.snapshot.data.title === 'edit';
		this.addForm = this.formBuilder.group({
			title_sign: ['', Validators.required],
			title_name: ['', Validators.required],
			desc_short: ['', Validators.required],
			desc_long: ['', Validators.required],
			video_url: [''],
			page_section: ['', Validators.required],
			video_desc: [''],
			image_banner: [''],
			image_desc: [''],
			status: [true, Validators.required]
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit && this.id) {
			this.loadAbout(this.id);
		}
	}

	loadAbout(id: string): void {
		this.isLoading = true;
		this.aboutService.getAboutWithId({ id }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (response.code !== 200 || !response.result) {
					this.loadingError = response.message || 'Unable to load this About section.';
					return;
				}
				const data = response.result;
				this.imageDataBanner = data.image_banner || '';
				this.imageDataDesc = data.image_desc || '';
				this.addForm.patchValue({
					title_sign: data.title_sign,
					title_name: data.title_name,
					desc_short: data.desc_short,
					desc_long: data.desc_long,
					video_url: data.video_url,
					video_desc: data.video_desc,
					page_section: data.page_section,
					status: data.status === true || data.status === 'true' || data.status === 'active',
					image_banner: this.imageDataBanner,
					image_desc: this.imageDataDesc
				});
			},
			error: (error: any) => {
				this.isLoading = false;
				this.loadingError = error?.error?.message || 'Unable to load this About section. Please try again.';
			}
		});
	}

	retryLoad(): void {
		if (this.id) {
			this.loadAbout(this.id);
		}
	}

	onSubmit(): void {
		this.saveError = '';
		if (this.isSaving) {
			return;
		}
		if (this.addForm.invalid) {
			this.addForm.markAllAsTouched();
			return;
		}

		const payload = {
			...this.addForm.value,
			token: this.token,
			image_banner: this.imageDataBanner,
			image_desc: this.imageDataDesc
		};
		this.isSaving = true;
		const request = this.isEdit && this.id
			? this.aboutService.editaboutdata(payload, this.id)
			: this.aboutService.addAboutData(payload);

		request.subscribe({
			next: (response: any) => {
				this.isSaving = false;
				if (response.code === 200) {
					this.toastr.successToastr(response.message || (this.isEdit ? 'Section updated successfully.' : 'Section created successfully.'));
					this.router.navigate(['/about/view']);
				} else {
					this.handleSaveError(response.message || 'Unable to save this section.', response.error || '');
				}
			},
			error: (error: any) => {
				this.isSaving = false;
				const serverError = error?.error?.error || '';
				const message = error?.error?.message || 'Unable to save this section. Please try again.';
				this.handleSaveError(message, serverError);
				console.error('Saving About section failed:', error);
			}
		});
	}

	private handleSaveError(message: string, detail: string): void {
		this.saveError = message;
		if (detail.toLowerCase().includes('duplicate key')) {
			this.toastr.warningToastr('A section with that key already exists. Choose a different page section.', 'Duplicate section');
		} else {
			this.toastr.errorToastr(detail ? `${message} ${detail}` : message, 'Unable to save');
		}
	}

	onUploadOutput(output: UploadOutput, type: 'banner' | 'description'): void {
		if (output.type === 'allAddedToQueue') {
			this.uploadInput.emit({
				type: 'uploadAll',
				url: environment.baseUrl + '/api/about/addimage',
				method: 'POST',
				data: {}
			});
			return;
		}

		if (output.type === 'done' && output.file) {
			const imageName = output.file.response?.result;
			if (!imageName) {
				this.toastr.errorToastr('The image upload did not return a file name.');
				return;
			}
			if (type === 'banner') {
				this.imageDataBanner = imageName;
				this.addForm.patchValue({ image_banner: imageName });
			} else {
				this.imageDataDesc = imageName;
				this.addForm.patchValue({ image_desc: imageName });
			}
			this.toastr.successToastr('Image uploaded successfully.');
		} else if (output.type === 'rejected') {
			this.toastr.errorToastr('The selected image could not be uploaded.');
		}
	}

	removeImage(type: 'banner' | 'description'): void {
		if (type === 'banner') {
			this.imageDataBanner = '';
			this.addForm.patchValue({ image_banner: '' });
		} else {
			this.imageDataDesc = '';
			this.addForm.patchValue({ image_desc: '' });
		}
	}

	imageUrl(fileName: string): string {
		return fileName ? `${this.imagePath}about/${fileName}` : '';
	}

	onImageError(event: Event): void {
		const image = event.target as HTMLImageElement;
		image.onerror = null;
		image.src = 'assets/img/placeholder.webp';
	}

	onCancel(): void {
		this.router.navigate(['/about/view']);
	}
}
