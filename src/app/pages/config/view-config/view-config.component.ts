import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConfigService } from '../../../providers/config/config.service';

@Component({
	selector: 'app-view-config',
	templateUrl: './view-config.component.html',
	styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent implements OnInit {
	addconfigForm: FormGroup;
	testEmailControl = new FormControl('', [Validators.required, Validators.email]);
	ConfigData: any[] = [];
	configImage: any[] = [];
	QRcodeImage = '';
	document: string | null = null;
	token: string | null = null;
	submitted = false;
	isLoading = false;
	isSaving = false;
	isTestingEmail = false;
	loadError = false;
	saveError = '';
	testEmailMessage = '';
	testEmailError = false;
	showSmtpPassword = false;

	constructor(
		private configService: ConfigService,
		private formBuilder: FormBuilder,
		private toastr: ToastrManager
	) {
		this.token = localStorage.getItem('neelgund-admin-token');
		this.addconfigForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [''],
			gmail_user: [''],
			gmail_password: [''],
			qrcode_image: [''],
			qrcode_url: [''],
			calendly_link: [''],
			contactEmail: ['', [Validators.required, Validators.email]],
			contactEmailPassword: [''],
			contactEmailSubject: [''],
			careerEmail: [''],
			careerEmailPassword: [''],
			careerEmailSubject: [''],
			smtp_status: [''],
			smtp_host: [''],
			smtp_port: [''],
			smtp_secure: [''],
			smtp_user: [''],
			smtp_password: ['']
		});
	}

	ngOnInit(): void {
		this.get_ConfigData();
	}

	get isSmtpEnabled(): boolean {
		return String(this.addconfigForm.get('smtp_status')?.value || '').toLowerCase() === 'active';
	}

	get_ConfigData(): void {
		this.isLoading = true;
		this.loadError = false;
		this.configService.getConfigDetails({ limit: 10, page: 1, token: this.token }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (!response || response.code !== 200) {
					this.loadError = true;
					this.ConfigData = [];
					return;
				}
				if (response.result == null || response.result === '') {
					this.ConfigData = [];
					return;
				}
				if (!Array.isArray(response.result)) {
					this.loadError = true;
					this.ConfigData = [];
					return;
				}

				this.ConfigData = response.result;
				const data = this.ConfigData[0];
				if (!data) {
					return;
				}
				this.configImage = data.image || [];
				this.QRcodeImage = data.qrcode_image || '';
				this.document = data.documents || null;
				this.addconfigForm.patchValue({
					name: data.name,
					status: data.status,
					gmail_user: data.gmail_user,
					gmail_password: data.gmail_password,
					qrcode_url: data.qrcode_url,
					calendly_link: data.calendly_link,
					contactEmail: data.contactEmail,
					contactEmailPassword: data.contactEmailPassword,
					contactEmailSubject: data.contactEmailSubject,
					careerEmail: data.careerEmail,
					careerEmailPassword: data.careerEmailPassword,
					careerEmailSubject: data.careerEmailSubject,
					smtp_status: data.smtp_status,
					smtp_host: data.smtp_host,
					smtp_port: data.smtp_port,
					smtp_secure: data.smtp_secure,
					smtp_user: data.smtp_user,
					smtp_password: data.smtp_password
				});
			},
			error: error => {
				console.error('Error loading configuration:', error);
				this.isLoading = false;
				this.loadError = true;
				this.ConfigData = [];
			}
		});
	}

	hasError(controlName: string, errorName: string): boolean {
		return this.addconfigForm.controls[controlName].hasError(errorName);
	}

	onSubmit(): void {
		this.submitted = true;
		this.saveError = '';
		if (this.addconfigForm.invalid || this.isSaving) {
			this.addconfigForm.markAllAsTouched();
			return;
		}

		const payload: any = {
			...this.addconfigForm.getRawValue(),
			'neelgund-admin-token': this.token,
			image: this.configImage,
			qrcode_image: this.QRcodeImage,
			documents: this.document
		};
		payload.name = payload.name.trim() || 'Admin';
		payload.status = payload.status?.trim() || 'Active';

		this.isSaving = true;
		const request = this.ConfigData.length === 0
			? this.configService.addConfig(payload)
			: this.configService.editConfigdata(payload, this.ConfigData[0]._id);
		request.subscribe({
			next: (response: any) => {
				this.isSaving = false;
				if (!response || response.code !== 200) {
					this.saveError = response && response.message
						? response.message
						: 'Configuration could not be saved. Please try again.';
					this.toastr.errorToastr(this.saveError);
					return;
				}
				this.toastr.successToastr(response.message || 'Configuration saved successfully.');
				this.get_ConfigData();
			},
			error: error => {
				console.error('Error saving configuration:', error);
				this.isSaving = false;
				this.saveError = 'Configuration could not be saved. Please try again.';
				this.toastr.errorToastr(this.saveError);
			}
		});
	}

	onTestEmail(): void {
		this.testEmailControl.markAsTouched();
		this.testEmailMessage = '';
		if (this.testEmailControl.invalid || this.isTestingEmail) {
			return;
		}

		this.isTestingEmail = true;
		this.testEmailError = false;
		this.configService.testEmail({ email: this.testEmailControl.value }).subscribe({
			next: (response: any) => {
				this.isTestingEmail = false;
				if (!response || response.code !== 200) {
					this.testEmailError = true;
					this.testEmailMessage = response && response.message
						? response.message
						: 'Test email could not be sent. Please check your settings.';
					this.toastr.errorToastr(this.testEmailMessage);
					return;
				}
				this.testEmailMessage = response.message || 'Test email sent successfully.';
				this.toastr.successToastr(this.testEmailMessage);
			},
			error: error => {
				console.error('Error sending test email:', error);
				this.isTestingEmail = false;
				this.testEmailError = true;
				this.testEmailMessage = 'Test email could not be sent. Please try again.';
				this.toastr.errorToastr(this.testEmailMessage);
			}
		});
	}
}
