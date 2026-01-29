import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
// Services
import { BlogService } from '../../../providers/blog/blog.service';
import * as moment from 'moment';

@Component({
	selector: 'app-add-blog',
	templateUrl: './add-blog.component.html',
	styleUrls: ['./add-blog.component.css']
})


export class AddBlogComponent implements OnInit {

	@ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	blogImage: any;
	imagePath: any;
	videomsg: boolean = false;

	// Data Assign
	tagData: any;
	authorData: any;
	addBlogForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;

	// Edit Action Here
	id: any;
	categoryData: any;
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

	currentDate: string;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private blogService: BlogService,
		private toastr: ToastrManager
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addBlogForm = this.formBuilder.group({
			name: ['', Validators.required],
			tag: [''],
			blog_category: [''],
			author: [''],
			video_link: [''],
			source_link: [''],
			featured: [false, ''],
			date: ['', Validators.required],
			status: [true, Validators.required],
			content_html: ['', Validators.required],
			meta_description: ['', Validators.required],
			meta_title: ['', Validators.required],
			meta_keywords: ['', Validators.required],
		});
		this.imagePath = environment.baseUrl + '/public/blog/';
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addBlogForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {

		this.id = this.route.snapshot.paramMap.get('id');
		this.get_tagdata();
		this.get_categorydata();
		this.get_authordata()
		if (this.isEdit) {
			this.patchingdata(this.id);
		}
		const today = new Date();
		this.currentDate = today.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD to match the input type 'date'
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.blogService.getblogWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.blogImage = data?.image;
					this.addBlogForm.patchValue({
						name: data?.name,
						tag: data?.tag_list,
						blog_category: data?.category,
						author: data?.author,
						video_link: data?.video_link,
						source_link: data?.source_link,
						featured: data?.featured,
						date: moment(data?.date).format('YYYY-MM-DD'),
						status: data?.status,
						content_html: data?.content,
						meta_description: data?.meta_description,
						meta_title: data?.meta_title,
						meta_keywords: data?.meta_keywords,
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addBlogForm.value;
		let id = this.id;
		obj['image'] = this.blogImage;

		// custom values send for tags and author
		obj['tag'] = this.tagData[0]._id;
		obj['author'] = this.authorData[0]._id;

		if (this.addBlogForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.blogService.addBlog(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						// this.throw_msg   = response.message
						// this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/blog/view']);
						}, 2000);
					}
					else if (response.code == 400) {
						// this.throw_msg    = response.message
						// this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);

		}
		else {
			this.blogService.editBlogdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						// this.throw_msg = response.message
						// this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/blog/view']);
						}, 2000);
					} else {
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
				url: environment.baseUrl + '/api/blog/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.blogImage = output.file.response.result;
		}
	}

	get_tagdata() {
		this.blogService.getTagData({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.tagData = response.result;
					}

				}
			},
		);
	}

	get_authordata() {
		this.blogService.getAuthorData({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.authorData = response.result;
					}

				}
			},
		);
	}

	get_categorydata() {
		this.blogService.getCategoryData({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.categoryData = response.result;
					}

				}
			},
		);
	}

	onChangeCategory(catvalue: any) {
		if (catvalue.target.value == 2) {
			this.videomsg = true;
		}
		else {
			this.videomsg = false;
		}
	}

	onCancel() {
		this.router.navigate(['/blog/view']);
	}

}
