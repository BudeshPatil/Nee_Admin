import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UploadInput } from 'ngx-uploader';
import { CompanyService } from 'src/app/providers/company/company.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-company-add',
	templateUrl: './company-add.component.html',
	styleUrls: ['./company-add.component.scss']
})
export class CompanyAddComponent implements OnInit {
	addForm: FormGroup;
	submitted = false;
	msg_success = false;
	msg_danger = false;
	throw_msg: string = '';
	logoImage: any;
	companyImage: any;
	previewLogo: any;
	previewImage: any;

	uploadInput: EventEmitter<UploadInput> = new EventEmitter();
	isEdit = false;
	id: string | null = null;
	imagePath = `${environment.baseUrl}/public/company/`;

	// Track if images were removed
	logoRemoved = false;
	imageRemoved = false;

	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		minHeight: '200px',
		placeholder: 'Enter long description...',
		translate: 'yes'
	};

	fileNames = {
		logo: '',
		image: ''
	};

	constructor(
		private fb: FormBuilder,
		private companyService: CompanyService,
		private toastr: ToastrManager,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.addForm = this.fb.group({
			title: ['', Validators.required],
			sub_title: ['', Validators.required],
			desc_long: ['', Validators.required],
			// desc_short: ['', Validators.required],
			// email: ['', [Validators.required, Validators.email]],
			// phone: ['', Validators.required],
			// address: ['', Validators.required],
			// meta_title: [''],
			// meta_keyword: [''],
			// meta_description: [''],
			url_key: ['', [Validators.required, Validators.pattern(/^[a-z0-9\-]+$/)]],
			page_section: ['', Validators.required],
			status: [true, Validators.required]
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id) {
			this.isEdit = true;
			this.companyService.getAll().subscribe(res => {
				const data = res.result.find((r: any) => r._id === this.id);
				if (data) {
					this.logoImage = data.logo;
					this.companyImage = data.image;
					this.previewLogo = typeof data.logo === 'string' ? this.imagePath + data.logo : null;
					this.previewImage = typeof data.image === 'string' ? this.imagePath + data.image : null;
					this.addForm.patchValue(data);
				}
			});
		}
	}

	onSubmit() {
		this.submitted = true;
		if (this.addForm.invalid) {
			this.toastr.errorToastr('Please fill all required fields.', 'Validation Error');
			return;
		}

		const formData = new FormData();
		for (const key in this.addForm.value) {
			formData.append(key, this.addForm.value[key]);
		}

		// Add new files if selected
		if (this.logoImage instanceof File) {
			formData.append('logo', this.logoImage);
		}
		if (this.companyImage instanceof File) {
			formData.append('image', this.companyImage);
		}

		// Add flags to indicate if images should be removed
		if (this.isEdit) {
			if (this.logoRemoved) {
				formData.append('removeLogo', 'true');
			}
			if (this.imageRemoved) {
				formData.append('removeImage', 'true');
			}
		}

		const request = this.isEdit
			? this.companyService.update(this.id!, formData)
			: this.companyService.create(formData);

		request.subscribe({
			next: (res: any) => {
				this.toastr.successToastr(res.message, 'Success');
				setTimeout(() => this.router.navigate(['/company/view']), 1000);
			},
			error: (err) => {
				this.toastr.errorToastr(err?.error?.message || 'Server Error', 'Error');
			}
		});
	}

	isString(val: any): boolean {
		return typeof val === 'string';
	}


	getPreview(file: File, callback: (url: string) => void): void {
		const reader = new FileReader();
		reader.onload = () => callback(reader.result as string);
		reader.readAsDataURL(file);
	}

	onFileChange(event: any, type: 'logo' | 'image'): void {
		const file = event.target.files[0];
		if (!file) return;

		if (type === 'logo') {
			this.getPreview(file, (url) => this.previewLogo = url);
			this.logoImage = file;
			this.fileNames.logo = file.name;
			this.logoRemoved = false; // Reset removal flag when new file is selected
		} else {
			this.getPreview(file, (url) => this.previewImage = url);
			this.companyImage = file;
			this.fileNames.image = file.name;
			this.imageRemoved = false; // Reset removal flag when new file is selected
		}
	}

	removeImage(type: 'logo' | 'image'): void {
		if (type === 'logo') {
			this.logoImage = '';
			this.fileNames.logo = '';
			this.previewLogo = null;
			if (this.isEdit) {
				this.logoRemoved = true; // Mark as removed for edit mode
			}
		} else {
			this.companyImage = '';
			this.fileNames.image = '';
			this.previewImage = null;
			if (this.isEdit) {
				this.imageRemoved = true; // Mark as removed for edit mode
			}
		}
	}

	hasError = (control: string, error: string) => this.addForm.controls[control].hasError(error);
}
