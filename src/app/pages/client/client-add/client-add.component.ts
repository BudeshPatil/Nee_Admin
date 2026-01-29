import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadInput, UploadOutput, UploaderOptions } from 'ngx-uploader';
import { ClientService } from 'src/app/providers/client/client.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-client-add',
	templateUrl: './client-add.component.html',
	styleUrls: ['./client-add.component.scss']
})
export class ClientAddComponent implements OnInit {

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	clientImage: any;
	imagePath: any;
	clientMultiImages: any = [];
	// Data Assign
	clientForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;

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
			{ class: 'career_box', name: 'Rajdhani sans-serif' },
		],
	}

	constructor(
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private router: Router,
		private toast: ToastrManager,
		private dataService: ClientService
	) {
		// this.imagePath = this.route.snapshot.data.image;
		this.imagePath = environment.baseUrl + '/public/';
		this.uploadInput = new EventEmitter<UploadInput>();
		this.clientForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(255)]],
			desc_short: ['', Validators.required],
			desc_long: ['', Validators.required],
			link: ['', Validators.required],
			status: ['true', Validators.required]

		});
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.clientForm.controls[controlName].hasError(errorName);
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			// this.patchingdata(this.id);
			this.addData(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
	}

	addData(id: any) {
		let obj = { _id: id };
		this.dataService.getClientById(obj).subscribe(
			(response) => {
				if (response.status === 200) {
					let data = response?.data;
					this.clientImage = data?.image;
					this.clientMultiImages = data?.client_images;
					this.clientForm.patchValue({
						name: data?.name,
						desc_short: data?.desc_short,
						desc_long: data?.desc_long,
						link: data?.link,
						status: data?.status,
					})
					this.submitted = true;
					// this.msg_success = true;

				} else {
					this.submitted = false;
					this.msg_success = false;
					this.msg_danger = true;
				}
			}
		)
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.clientForm.value;
		let id = this.id;

		obj['image'] = this.clientImage;
		obj['client_images'] = this.clientMultiImages;

		if (this.clientForm.invalid) {
			return;
		}

		if (!this.isEdit) {
			this.dataService.clientadd(obj).subscribe(
				(response) => {
					if (response.status == 200) {
						// this.throw_msg   = response.message 
						// this.msg_success = true;
						this.toast.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/client/view']);
						}, 2000);
					}
					else if (response.code == 400) {
						// this.throw_msg    = response.message
						// this.msg_danger = true;
						this.toast.errorToastr(response.message);
					}
				},
			);

		} else {
			this.dataService.clientupdate(obj, id).subscribe(
				(response) => {
					if (response.status == 200) {
						// this.throw_msg = response.message 
						this.msg_success = true;
						this.toast.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/client/view']);
						}, 2000);
					} else {
						this.toast.errorToastr(response.message);
					}
				},
			);
		}
	}

	onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/home/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.clientImage = output.file.response.result;
			this.clientMultiImages.push(output.file.response.result);
		}
	}

	onCancel() {
		this.router.navigate(['/client/view']);
	}

	removeImage(index) {
		if (confirm("Are you sure to delete this image")) {
			this.clientMultiImages.splice(index, 1);
		}
	}



}
