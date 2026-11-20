import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
import { ServiceService } from '../../../providers/service/service.service';

@Component({
	selector: 'app-add-service',
	templateUrl: './add-service.component.html',
	styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
	readonly serviceUploadInput = new EventEmitter<UploadInput>();
	readonly homeUploadInput = new EventEmitter<UploadInput>();
	addServiceForm: FormGroup;
	serviceImage = '';
	homeserviceImage = '';
	imagePath = environment.baseUrl + '/public/service/';
	serviceImageUrl = '';
	homeImageUrl = '';
	id: string | null = null;
	isEdit = false;
	isSaving = false;
	isLoadingData = false;
	loadError = '';
	user: { _id?: string } | null = null;

	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '180px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Describe what this service includes...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [{ class: 'career_box', name: 'Rajdhani sans-serif' }]
	};

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private serviceService: ServiceService,
		private toastr: ToastrManager
	) {
		this.isEdit = this.route.snapshot.data.title === 'edit';
		this.addServiceForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(255)]],
			desc: ['', Validators.required],
			price: [''],
			link: [''],
			short_desc: ['', Validators.required],
			status: ['true', Validators.required],
			sequence_number: ['']
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				this.user = JSON.parse(storedUser);
			} catch (error) {
				console.error('Unable to read the current admin user.', error);
			}
		}

		if (this.isEdit && this.id) {
			this.loadService(this.id);
		}
	}

	loadService(id: string): void {
		this.isLoadingData = true;
		this.serviceService.getServiceById({ _id: id }).subscribe({
			next: (response: any) => {
				if (response.code !== 200 || !response.result) {
					this.loadError = response.message || 'Unable to load this service.';
					this.isLoadingData = false;
					return;
				}

				const data = response.result;
				this.serviceImage = data.image || '';
				this.homeserviceImage = data.home_image || '';
				this.serviceImageUrl = this.serviceImage ? this.imagePath + this.serviceImage : '';
				this.homeImageUrl = this.homeserviceImage ? this.imagePath + this.homeserviceImage : '';
				this.addServiceForm.patchValue({
					name: data.name,
					desc: data.desc,
					price: data.price,
					link: data.link,
					status: data.status === true || data.status === 'true' ? 'true' : 'false',
					sequence_number: data.sequence_number,
					short_desc: data.short_desc
				});
				this.isLoadingData = false;
			},
			error: (error: any) => {
				this.loadError = error?.error?.message || 'Unable to load this service. Please try again.';
				this.isLoadingData = false;
			}
		});
	}

	onSubmit(): void {
		if (this.isSaving) {
			return;
		}
		if (this.addServiceForm.invalid) {
			this.addServiceForm.markAllAsTouched();
			return;
		}

		const payload = {
			...this.addServiceForm.value,
			image: this.serviceImage,
			home_image: this.homeserviceImage,
			user: this.user?._id || ''
		};
		this.isSaving = true;
		const saveRequest = this.isEdit && this.id
			? this.serviceService.editServicedata(payload, this.id)
			: this.serviceService.addService(payload);

		saveRequest.subscribe({
			next: (response: any) => {
				this.isSaving = false;
				if (response.code === 200) {
					this.toastr.successToastr(response.message);
					this.router.navigate(['/service/view']);
				} else {
					this.toastr.errorToastr(response.message || 'Unable to save this service.');
				}
			},
			error: (error: any) => {
				this.isSaving = false;
				this.toastr.errorToastr(error?.error?.message || 'Unable to save this service. Please try again.');
			}
		});
	}

	onUploadOutput(output: UploadOutput, type: 'service' | 'home'): void {
		if (output.type === 'allAddedToQueue') {
			const uploadInput = type === 'service' ? this.serviceUploadInput : this.homeUploadInput;
			uploadInput.emit({
				type: 'uploadAll',
				url: environment.baseUrl + '/api/service/addimage',
				method: 'POST',
				data: {}
			});
		} else if (output.type === 'done' && output.file) {
			const imageName = output.file.response?.result;
			if (!imageName) {
				this.toastr.errorToastr('The image upload did not return a file name.');
				return;
			}
			if (type === 'home') {
				this.homeserviceImage = imageName;
				this.homeImageUrl = this.imagePath + imageName;
			} else {
				this.serviceImage = imageName;
				this.serviceImageUrl = this.imagePath + imageName;
			}
		} else if (output.type === 'rejected') {
			this.toastr.errorToastr('Unable to upload the image. Please try again.');
		}
	}

	removeImage(type: 'service' | 'home'): void {
		if (type === 'home') {
			this.homeserviceImage = '';
			this.homeImageUrl = '';
		} else {
			this.serviceImage = '';
			this.serviceImageUrl = '';
		}
	}
}
