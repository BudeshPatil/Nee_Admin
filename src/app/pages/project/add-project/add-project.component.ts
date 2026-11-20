import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadOutput, UploadInput } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';

import { ProjectService } from '../../../providers/project/project.service';

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

	// File Upload
	uploadInput: EventEmitter<UploadInput>;
	projectImage: any;
	projectImageThumb: any;
	designImage1: any;
	designImage2: any;
	// designImage3: any;
	// designImage4: any;
	designImage5: any;
	imagePath: any;

	// Data Assign
	categoryData: any[] = [];
	addProjectForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	phaseExpanded: boolean[] = [];
	isLoadingData = false;
	loadError = false;
	isSaving = false;
	categoryLoadError = false;
	isLoadingCategories = false;
	relatedProjectsLoadError = false;
	isLoadingRelatedProjects = false;

	// Edit Action Here
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
			key_features: [''],
			year: ['', Validators.required],
			category: ['', Validators.required],
			link: [''],
			featured: [false],
			display_on_home: [false],
			display_on_service: [false],
			scope: [''],
			location: ['', Validators.required],
			map: ['', Validators.required],
			status: ['true', Validators.required],
			sequence_number: [''],
			url_key: ['', Validators.required],
			related_prjects: [[]],
			area: [''],
			noofplots: [''],
			amenties: [''],
			dimentions: [''],
			price: [''],
			phases: this.formBuilder.array([])
		})
		this.imagePath = environment.baseUrl + '/public/';

	}

	get phases(): FormArray {
		return this.addProjectForm.get('phases') as FormArray;
	}

	private createPhaseGroup(phase: any = {}): FormGroup {
		return this.formBuilder.group({
			name: [phase?.name || '', [Validators.required, Validators.maxLength(255)]],
			slug: [phase?.slug || ''],
			area: [phase?.area || ''],
			noofplots: [phase?.noofplots || ''],
			dimensions: [phase?.dimensions || ''],
			amenties: [phase?.amenties || ''],
			price: [phase?.price || ''],
			location: [phase?.location || ''],
			map: [phase?.map || ''],
			image: [phase?.image || ''],
			image_thumbnail: [phase?.image_thumbnail || ''],
			project_images: [Array.isArray(phase?.project_images) ? phase.project_images : []],
			featured: [this.isEnabled(phase?.featured)],
			status: [phase?.status == null ? true : this.isEnabled(phase.status)]
		});
	}

	addPhase(): void {
		this.phases.push(this.createPhaseGroup());
		this.phaseExpanded.push(true);
	}

	removePhase(index: number): void {
		if (confirm('Are you sure to remove this phase?')) {
			this.phases.removeAt(index);
			this.phaseExpanded.splice(index, 1);
		}
	}

	togglePhase(index: number): void {
		this.phaseExpanded[index] = !this.phaseExpanded[index];
	}

	phaseHasError(index: number, controlName: string, errorName: string): boolean {
		const control = this.phases.at(index)?.get(controlName);
		return !!(control && control.hasError(errorName));
	}

	private setProjectPhases(phases: any[]): void {
		this.phases.clear();
		this.phaseExpanded = [];
		if (!Array.isArray(phases)) {
			return;
		}

		phases.forEach(phase => {
			this.phases.push(this.createPhaseGroup(phase));
			this.phaseExpanded.push(true);
		});
	}

	private uploadPhaseImage(output: UploadOutput, index: number, field: string): void {
		if (output.type === 'allAddedToQueue') {
			this.uploadInput.emit({
				type: 'uploadAll',
				url: environment.baseUrl + '/api/project/addimage',
				method: 'POST',
				data: {}
			});
		} else if (output.type === 'done' && output.file) {
			const control = this.phases.at(index)?.get(field);
			if (field === 'project_images') {
				const images = Array.isArray(control?.value) ? control.value : [];
				control?.setValue([...images, output.file.response.result]);
			} else {
				control?.setValue(output.file.response.result);
			}
		}
	}

	onUploadOutputPhaseImage(output: UploadOutput, index: number): void {
		this.uploadPhaseImage(output, index, 'image');
	}

	onUploadOutputPhaseThumb(output: UploadOutput, index: number): void {
		this.uploadPhaseImage(output, index, 'image_thumbnail');
	}

	onUploadOutputPhaseGallery(output: UploadOutput, index: number): void {
		this.uploadPhaseImage(output, index, 'project_images');
	}

	removePhaseImage(index: number, field: string): void {
		if (confirm('Are you sure to delete this image')) {
			this.phases.at(index)?.get(field)?.setValue('');
		}
	}

	removePhaseGalleryImage(index: number, imageIndex: number): void {
		if (confirm('Are you sure to delete this image')) {
			const control = this.phases.at(index)?.get('project_images');
			const images = Array.isArray(control?.value) ? control.value : [];
			control?.setValue(images.filter((_: string, currentIndex: number) => currentIndex !== imageIndex));
		}
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addProjectForm.controls[controlName].hasError(errorName);
	}

	private isEnabled(value: any): boolean {
		return value === true || value === 1 || value === 'true' || value === '1';
	}

	compareRelatedProjects = (first: any, second: any): boolean => {
		const firstId = this.getRelatedProjectId(first);
		const secondId = this.getRelatedProjectId(second);
		return firstId !== null && secondId !== null
			? firstId === secondId
			: first === second;
	}

	private getRelatedProjectId(project: any): string | null {
		const id = project && typeof project === 'object' ? project._id : project;
		return id == null || id === '' ? null : String(id);
	}

	private mergeRelatedProjectOptions(availableProjects: any[]): any[] {
		const selectedValue = this.addProjectForm.get('related_prjects')?.value;
		const selectedProjects = Array.isArray(selectedValue)
			? selectedValue
			: selectedValue == null || selectedValue === '' ? [] : [selectedValue];
		const availableIds = new Set(
			availableProjects
				.map(project => this.getRelatedProjectId(project))
				.filter((id): id is string => id !== null)
		);
		const selectedNotInOptions = selectedProjects.filter(project => {
			const id = this.getRelatedProjectId(project);
			return id !== null && !availableIds.has(id) && typeof project === 'object';
		});
		return [...selectedNotInOptions, ...availableProjects];
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.get_categorydata();
		if (this.isEdit) {
			this.addData(this.id);
		}
		else {
			this.getAllProjects();
		}
	}

	addData(id: any) {
		this.isLoadingData = true;
		this.loadError = false;
		this.projectservice.getProjectById({ _id: id }).subscribe({
			next: (response) => {
				this.isLoadingData = false;
				if (response.code == 200) {
					let data = response?.result;
					if (!data) {
						this.loadError = true;
						return;
					}
					this.projectData = data;
					this.getAllProjects();
					this.projectImage = data?.image;
					this.projectImageThumb = data?.image_thumnail;
					this.projectMultiImages = Array.isArray(data?.project_images) ? data.project_images : [];
					this.projectDesignImages = Array.isArray(data?.project_design_images) ? data.project_design_images : [];
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
						scope: data?.scope,
						year: data?.year,
						category: data?.category,
						link: data?.link,
						status: this.isEnabled(data?.status) ? 'true' : 'false',
						featured: this.isEnabled(data?.featured),
						display_on_home: this.isEnabled(data?.display_on_home),
						display_on_service: this.isEnabled(data?.display_on_service),
						sequence_number: data?.sequence_number,
						amenties: data?.amenties,
						map: data?.map,
						location: data?.location,
						url_key: data?.url_key,
						related_prjects: data?.related_prjects,
						area: data?.area,
						noofplots: data?.noofplots,
						price: data?.price,
						dimentions: data?.dimentions
					})
					this.setProjectPhases(data?.phases);
				} else {
					this.loadError = true;
				}
			},
			error: (error) => {
				this.isLoadingData = false;
				this.loadError = true;
				console.error('Error loading project:', error);
			}
		});
	}


	onSubmit() {
		this.submitted = true;
		this.msg_success = false;
		this.msg_danger = false;

		if (this.addProjectForm.invalid || this.isSaving) {
			this.addProjectForm.markAllAsTouched();
			return;
		}

		const obj = { ...this.addProjectForm.value };
		const id = this.id;
		obj['design_image_1'] = this.designImage1;
		obj['design_image_2'] = this.designImage2;
		// obj['design_image_3'] = this.designImage3;
		// obj['design_image_4'] = this.designImage4;
		obj['design_image_5'] = this.designImage5;
		obj['image'] = this.projectImage;
		obj['image_thumnail'] = this.projectImageThumb;
		obj['project_images'] = this.projectMultiImages;
		obj['project_design_images'] = this.projectDesignImages;
		obj['phases'] = this.phases.getRawValue();
		this.isSaving = true;

		if (!this.isEdit) {
			this.projectservice.addProject(obj).subscribe({
				next: (response) => {
					this.isSaving = false;
					if (response.code == 200) {
						this.throw_msg = response.message || 'Project created successfully.';
						this.msg_success = true;
						this.toastr.successToastr(this.throw_msg);
						setTimeout(() => {
							this.router.navigate(['/project/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message || 'Unable to save the project.';
						this.msg_danger = true;
						this.toastr.errorToastr(this.throw_msg);
					}
				},
				error: (error) => {
					this.isSaving = false;
					this.msg_danger = true;
					this.throw_msg = 'Unable to save the project. Please try again.';
					console.error('Error creating project:', error);
					this.toastr.errorToastr(this.throw_msg);
				}
			});

		}
		else {
			this.projectservice.editProjectdata(obj, id).subscribe({
				next: (response) => {
					this.isSaving = false;
					if (response.code == 200) {
						this.throw_msg = response.message || 'Project updated successfully.';
						this.msg_success = true;
						this.toastr.successToastr(this.throw_msg);
						setTimeout(() => {
							this.router.navigate(['/project/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message || 'Unable to update the project.';
						this.msg_danger = true;
						this.toastr.errorToastr(this.throw_msg);
					}
				},
				error: (error) => {
					this.isSaving = false;
					this.msg_danger = true;
					this.throw_msg = 'Unable to update the project. Please try again.';
					console.error('Error updating project:', error);
					this.toastr.errorToastr(this.throw_msg);
				}
			});
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
		this.relatedProjectsLoadError = false;
		this.isLoadingRelatedProjects = true;
		this.projectservice.getRecentProjects(obj).subscribe({
			next: (response) => {
				this.isLoadingRelatedProjects = false;
				if (response.code == 200) {
					if (Array.isArray(response.result)) {
						this.projectListData = this.mergeRelatedProjectOptions(response.result);
					}
				} else {
					this.relatedProjectsLoadError = true;
				}
			},
			error: (error) => {
				this.isLoadingRelatedProjects = false;
				this.relatedProjectsLoadError = true;
				console.error('Error loading related projects:', error);
			}
		});
	}

	get_categorydata() {
		this.isLoadingCategories = true;
		this.categoryLoadError = false;
		this.projectservice.getCategoryData({}).subscribe({
			next: (response) => {
				this.isLoadingCategories = false;
				if (response.code == 200) {
					if (Array.isArray(response.result)) {
						this.categoryData = response.result;
					}
				} else {
					this.categoryLoadError = true;
				}
			},
			error: (error) => {
				this.isLoadingCategories = false;
				this.categoryLoadError = true;
				console.error('Error loading project statuses:', error);
			}
		});
	}

}
