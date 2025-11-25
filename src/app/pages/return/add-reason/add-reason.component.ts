import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { ReturnService } from '../../../providers/return/return.service';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-add-reason',
  templateUrl: './add-reason.component.html',
  styleUrls: ['./add-reason.component.scss']
})
export class AddReasonComponent {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	reasonImage: any;
	imagePath: any;
	imageArr: any = [];

	// Data Assign

	artData: any;
	countryData: any;
	addreasonForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

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
		private reasonService: ReturnService,
		private toastr: ToastrManager
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addreasonForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: ['', Validators.required]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addreasonForm.controls[controlName].hasError(errorName);
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
		this.reasonService.getReasonWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.reasonImage = data?.image;
					this.addreasonForm.patchValue({
						name: data?.name,
						status: data?.status
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addreasonForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['image'] = this.reasonImage;
		if (this.addreasonForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.reasonService.addReason(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/return/view-reason']);
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
			this.reasonService.editReasondata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/return/view-reason']);
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
}
