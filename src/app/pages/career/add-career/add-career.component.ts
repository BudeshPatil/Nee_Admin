import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';
import { CareerService } from '../../../providers/career/career.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadInput, UploadOutput } from 'ngx-uploader';

@Component({
	selector: 'app-add-career',
	templateUrl: './add-career.component.html',
	styleUrls: ['./add-career.component.css']
})
export class AddCareerComponent implements OnInit {
	addCareerForm: FormGroup;
	submitted = false;
	isEdit: boolean;
	isLoading = false;
	isSaving = false;
	isUploading = false;
	loadError = false;
	uploadError = '';
	id: string | null = null;
	document: string | null = null;
	imagePath = environment.baseUrl + '/public/';
	uploadInput = new EventEmitter<UploadInput>();

	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '220px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Enter the applicant’s message or application details…',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [
			{ class: 'career_box', name: 'Rajdhani sans-serif' },
		],
	};

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private careerservice: CareerService,
		private toastr: ToastrManager
	) {
		this.isEdit = this.route.snapshot.data.title === 'edit';
		this.addCareerForm = this.formBuilder.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			mobile: ['', Validators.required],
			subject: ['', Validators.required]
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			if (this.id) {
				this.patchingdata(this.id);
			} else {
				this.loadError = true;
			}
		}
	}

	hasError(controlName: string, errorName: string): boolean {
		return this.addCareerForm.controls[controlName].hasError(errorName);
	}

	patchingdata(id: string | null): void {
		if (!id) {
			this.loadError = true;
			return;
		}
		this.isLoading = true;
		this.loadError = false;
		this.careerservice.getCareerWithId({ id }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (!response || response.code !== 200 || !response.result) {
					this.loadError = true;
					console.error('Unable to load career application:', response && response.message);
					return;
				}
				const data = response.result;
				this.document = data.documents || null;
				this.addCareerForm.patchValue({
					firstname: data.firstname,
					lastname: data.lastname,
					email: data.email,
					mobile: data.mobile,
					subject: data.subject
				});
			},
			error: error => {
				console.error('Error loading career application:', error);
				this.isLoading = false;
				this.loadError = true;
			}
		});
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.addCareerForm.invalid || this.isSaving || this.isUploading) {
			this.addCareerForm.markAllAsTouched();
			return;
		}

		const payload = {
			...this.addCareerForm.value,
			documents: this.document
		};
		this.isSaving = true;
		const saveRequest = this.isEdit
			? this.careerservice.editcareerdata(payload, this.id)
			: this.careerservice.addCareer(payload);

		saveRequest.subscribe({
			next: (response: any) => {
				if (response && response.code === 200) {
					this.toastr.successToastr(response.message || 'Career application saved successfully.');
					setTimeout(() => this.router.navigate(['/career/view']), 1200);
					return;
				}
				this.isSaving = false;
				const message = response && response.message ? response.message : 'Unable to save this career application.';
				this.toastr.errorToastr(message);
			},
			error: error => {
				console.error('Error saving career application:', error);
				this.isSaving = false;
				this.toastr.errorToastr('Unable to save this career application. Please try again.');
			}
		});
	}

	onCancel(): void {
		this.router.navigate(['/career/view']);
	}

	onUploadFile(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			this.isUploading = true;
			this.uploadError = '';
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/career/addNewDocument',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
			return;
		}

		if (output.type === 'done' && output.file) {
			this.isUploading = false;
			const response = output.file.response;
			if (output.file.responseStatus && output.file.responseStatus >= 400) {
				this.uploadError = 'The document could not be uploaded. Please try again.';
				console.error('Career document upload failed:', response);
				return;
			}
			if (!response || !response.result) {
				this.uploadError = 'The upload did not return a document. Please try again.';
				console.error('Career document upload returned an invalid response:', response);
				return;
			}
			this.document = response.result;
			this.uploadError = '';
			return;
		}

		if (output.type === 'rejected') {
			this.isUploading = false;
			this.uploadError = 'This file could not be selected. Choose another document and try again.';
		}
	}
}
