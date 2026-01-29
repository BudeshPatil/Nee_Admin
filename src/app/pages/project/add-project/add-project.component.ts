import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';

// Services
import { AuthorService } from '../../../providers/author/author.service';
import { ProjectService } from '../../../providers/project/project.service';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	authorImage: any;
	projectImage: any;
	projectImageThumb: any;
	designImage1: any;
	designImage2: any;
	// designImage3: any;
	// designImage4: any;
	designImage5: any;
	imagePath: any;

	// Data Assign
	categoryData: any;
	addAuthorForm: FormGroup;
	addProjectForm: FormGroup;
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
	show3 = false; // for tooltip
	show4 = false; // for tooltip
	show5 = false; // for tooltip
	show6 = false; // for tooltip
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

	projectMultiImages: any = [];
	projectDesignImages: any = [];
	projectData: any = [];
	projectListData: any = [];
	config = {
		value: true,
		name: '',
		disabled: false,
		height: 25,
		width: 80,
		margin: 3,
		fontSize: 10,
		speed: 300,
		color: {
			checked: '#1976D2',     // Blue 700 (Material Design)
			unchecked: '#B0BEC5',   // Grey 400
		},
		switchColor: {
			checked: '#4CAF50',     // Green 500 (for active switch)
			unchecked: '#F44336',   // Red 500 (Material's 'crimson')
		},
		labels: {
			unchecked: 'Deactive',
			checked: 'Active',
		},
		yes_no_labels: {
			unchecked: 'No',
			checked: 'Yes',
		},
		checkedLabel: '',
		uncheckedLabel: '',
		fontColor: {
			checked: '#FFFFFF',     // White
			unchecked: '#212121',   // Dark gray for contrast
		},
	};

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private authorservice: AuthorService,
		private projectservice: ProjectService,
		private toastr: ToastrManager
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addProjectForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.maxLength(255)]],
			desc: ['', Validators.required],
			desc_1: [''],
			desc_2: [''],
			desc_3: [''],
			the_brief: [''],
			scope_of_work: [''],
			// key_features: [''],
			year: ['', Validators.required],
			category: ['', Validators.required],
			link: [''],
			featured: [false, Validators.required],
			display_on_home: [false, Validators.required],
			display_on_service: [false, Validators.required],
			scope: ['', Validators.required],
			location: ['', Validators.required],
			owner: ['', Validators.required],
			status: ['true', Validators.required],
			sequence_number: [''],
			url_key: ['', Validators.required],
			related_prjects: [],
		})
		this.imagePath = environment.baseUrl + '/public/';

	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addProjectForm.controls[controlName].hasError(errorName);
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.getAllProjects();
		this.get_categorydata();
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
		this.projectservice.getProjectById(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.projectData = data;
					this.getAllProjects();
					this.projectImage = data?.image;
					this.projectImageThumb = data?.image_thumnail;
					this.projectMultiImages = data?.project_images;
					this.projectDesignImages = data?.project_design_images;
					this.designImage1 = data?.design_image_1;
					this.designImage2 = data?.design_image_2;
					// this.designImage3 = data?.design_image_3;
					// this.designImage4 = data?.design_image_4;
					this.designImage5 = data?.design_image_5;
					this.addProjectForm.patchValue({
						name: data?.name,
						desc: data?.desc,
						desc_1: data?.desc_1,
						desc_2: data?.desc_2,
						desc_3: data?.desc_3,
						the_brief: data?.the_brief,
						scope_of_work: data?.scope_of_work,
						key_features: data?.key_features,
						year: data?.year,
						category: data?.category,
						link: data?.link,
						status: data?.status,
						featured: data?.featured,
						display_on_home: data?.display_on_home,
						display_on_service: data?.display_on_service,
						sequence_number: data?.sequence_number,
						scope: data?.scope,
						owner: data?.owner,
						location: data?.location,
						url_key: data?.url_key,
						related_prjects: data?.related_prjects
					})
				} else {

				}
			}
		)
	}


	onSubmit() {
		this.submitted = true;
		let obj = this.addProjectForm.value;
		let id = this.id;

		obj['design_image_1'] = this.designImage1;
		obj['design_image_2'] = this.designImage2;
		// obj['design_image_3'] = this.designImage3;
		// obj['design_image_4'] = this.designImage4;
		obj['design_image_5'] = this.designImage5;
		obj['image'] = this.projectImage;
		obj['image_thumnail'] = this.projectImageThumb;
		obj['project_images'] = this.projectMultiImages;
		obj['project_design_images'] = this.projectDesignImages;
		if (this.addProjectForm.invalid) {
			return;
		}

		if (!this.isEdit) {
			this.projectservice.addProject(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/project/view']);
						}, 2000);
					}
					else if (response.code == 400) {
						this.throw_msg = response.message;
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);

		}
		else {
			this.projectservice.editProjectdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/project/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message;
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
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.projectImage = output.file.response.result;

		}
	}

	onUploadOutputProjectThumb(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.projectImageThumb = output.file.response.result;

		}
	}

	onUploadOutputProjectImage(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.projectMultiImages.push(output.file.response.result);
		}
	}

	onUploadOutputProjectDesignImage(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.projectDesignImages.push(output.file.response.result);
		}
	}

	onUploadOutputD1(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.designImage1 = output.file.response.result;

		}
	}

	onUploadOutputD2(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.designImage2 = output.file.response.result;

		}
	}

	// onUploadOutputD3(output: UploadOutput): void {
	// 	if (output.type === 'allAddedToQueue') {
	// 		const event: UploadInput = {
	// 			type: 'uploadAll',
	// 			url: environment.baseUrl + '/api/project/addimage',
	// 			method: 'POST',
	// 			data: {},
	// 		};
	// 		this.uploadInput.emit(event);
	// 	}
	// 	else if (output.type === 'done' && typeof output.file !== 'undefined') {
	// 		this.designImage3 = output.file.response.result;

	// 	}
	// }
	// onUploadOutputD4(output: UploadOutput): void {
	// 	if (output.type === 'allAddedToQueue') {
	// 		const event: UploadInput = {
	// 			type: 'uploadAll',
	// 			url: environment.baseUrl + '/api/project/addimage',
	// 			method: 'POST',
	// 			data: {},
	// 		};
	// 		this.uploadInput.emit(event);
	// 	}
	// 	else if (output.type === 'done' && typeof output.file !== 'undefined') {
	// 		this.designImage4 = output.file.response.result;

	// 	}
	// }
	onUploadOutputD5(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.designImage5 = output.file.response.result;

		}
	}

	onCancel() {
		this.router.navigate(['/project/view']);
	}

	removeD1Image(index) {
		if (confirm("Are you sure to delete this image")) {
			this.designImage1 = "";
		}
	}
	removeD2Image(index) {
		if (confirm("Are you sure to delete this image")) {
			this.designImage2 = "";
		}
	}
	// removeD3Image(index) {
	// 	if (confirm("Are you sure to delete this image")) {
	// 		this.designImage3 = "";
	// 	}
	// }
	// removeD4Image(index) {
	// 	if (confirm("Are you sure to delete this image")) {
	// 		this.designImage4 = "";
	// 	}
	// }
	removeD5Image(index) {
		if (confirm("Are you sure to delete this image")) {
			this.designImage5 = "";
		}
	}
	removeImage(index) {
		if (confirm("Are you sure to delete this image")) {
			this.projectImage = "";
		}
	}
	removeImageThumb(index) {
		if (confirm("Are you sure to delete this image")) {
			this.projectImageThumb = "";
		}
	}

	removeImageHover(index) {
		if (confirm("Are you sure to delete this image")) {
			this.projectMultiImages.splice(index, 1)
		}
	}

	removeDesignImage(index) {
		if (confirm("Are you sure to delete this image")) {
			this.projectDesignImages.splice(index, 1)
		}
	}

	getAllProjects() {
		let obj = {};
		if (this.isEdit) {
			obj['existedproject'] = this.id;
			if (this.projectData) {
				obj['related_prjects'] = this.projectData.related_prjects;
			}
		}
		this.projectservice.getRecentProjects(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.projectListData = response.result;
					}
				}
			},
		);
	}

	get_categorydata() {
		this.projectservice.getCategoryData({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.categoryData = response.result;
					}

				}
			},
		);
	}

}
