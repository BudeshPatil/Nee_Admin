import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';

// Services
import { AuthorService } from '../../../providers/author/author.service';
import { ServiceService } from '../../../providers/service/service.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	authorImage: any;
	serviceImage: any;
	imagePath: any;
	homeserviceImage: any;

	// Data Assign

	addAuthorForm: FormGroup;
	addServiceForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;

	// Edit Action Here
	applyAction: any;
	id: any;
	show = false; // for tooltip
	show1 = false; // for tooltip
	show2 = false; // for tooltip
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

	categories = [
		{ id: 1, name: "Branding" },
		{ id: 2, name: "UX/UI" },
		{ id: 3, name: "eCommerce" },
		{ id: 4, name: "SEO" },
		{ id: 5, name: "Others" },
	];

	selected = [{ id: 1, name: "Branding" }];
	user:any ;
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private authorservice: AuthorService,
		private serviceservice: ServiceService,
		private toastr: ToastrManager
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addServiceForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(255)]],
			desc: ['', Validators.required],
			price: [''],
			link: [''],
			short_desc: ['', Validators.required],
			status: ['true', Validators.required],
			sequence_number:['']
		})
		this.imagePath = environment.baseUrl + '/public/service/';

	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addServiceForm.controls[controlName].hasError(errorName);
	}

	ngOnInit(): void {
		this.user = localStorage.getItem('user');
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
		this.serviceservice.getServiceById(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.serviceImage = data?.image;
					this.homeserviceImage = data?.home_image;
					this.addServiceForm.patchValue({
						name: data?.name,
						desc: data?.desc,
						price: data?.price,
						link: data?.link,
						status: data?.status,
						sequence_number:data?.sequence_number,
						short_desc:data?.short_desc
					})
				} else {

				}
			}
		)
	}


	onSubmit() {
		this.submitted = true;
		let obj = this.addServiceForm.value;
		let id = this.id;

		obj['image'] = this.serviceImage;
		obj['user'] = this.user._id;
		obj['home_image'] = this.homeserviceImage;
		if (this.addServiceForm.invalid) {
			return;
		}

		if (!this.isEdit) {
			this.serviceservice.addService(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						 this.throw_msg   = response.message
						 this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/service/view']);
						}, 2000);
					}
					else if (response.code == 400) {
						 this.throw_msg    = response.message
						 this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);

		}
		else {
			this.serviceservice.editServicedata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/service/view']);
						}, 2000);
					} else {
						this.throw_msg    = response.message
						 this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}

	}


	onUploadOutput(output: UploadOutput,type:any): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/service/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined' && type == 'home') {
			this.homeserviceImage = output.file.response.result;
		} else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.serviceImage = output.file.response.result;
		}
	}

	onCancel() {
		this.router.navigate(['/service/view']);
	}
}
