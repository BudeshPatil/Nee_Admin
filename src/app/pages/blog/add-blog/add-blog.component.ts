import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadInput, UploadOutput } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
import { BlogService } from '../../../providers/blog/blog.service';
import * as moment from 'moment';

@Component({
	selector: 'app-add-blog',
	templateUrl: './add-blog.component.html',
	styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
	readonly uploadInput = new EventEmitter<UploadInput>();
	blogImage = '';
	imagePath = environment.baseUrl + '/public/blog/';
	imageUrl = '';
	tagData: any[] = [];
	authorData: any[] = [];
	categoryData: any[] = [];
	addBlogForm: FormGroup;
	id: string | null = null;
	isEdit = false;
	isSaving = false;
	isLoading = false;
	loadError = '';
	lookupError = '';
	currentDate = new Date().toISOString().split('T')[0];

	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '260px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Write the article content here...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [{ class: 'blog-descriptiondetail', name: 'Rajdhani sans-serif' }]
	};

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private blogService: BlogService,
		private toastr: ToastrManager
	) {
		this.isEdit = this.route.snapshot.data.title === 'edit';
		this.addBlogForm = this.formBuilder.group({
			name: ['', Validators.required],
			tag: [''],
			blog_category: [''],
			author: [''],
			video_link: [''],
			source_link: [''],
			featured: [false],
			date: ['', Validators.required],
			status: [true, Validators.required],
			content_html: ['', Validators.required],
			meta_description: ['', Validators.required],
			meta_title: ['', Validators.required],
			meta_keywords: ['', Validators.required]
		});
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		this.get_tagdata();
		this.get_categorydata();
		this.get_authordata();
		if (this.isEdit && this.id) {
			this.loadBlog(this.id);
		}
	}

	loadBlog(id: string): void {
		this.isLoading = true;
		this.blogService.getblogWithId({ id }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (response.code !== 200 || !response.result) {
					this.loadError = response.message || 'Unable to load this blog post.';
					return;
				}
				const data = response.result;
				this.blogImage = data.image || '';
				this.imageUrl = this.blogImage ? this.imagePath + this.blogImage : '';
				this.addBlogForm.patchValue({
					name: data.name,
					tag: this.getOptionId(data.tag || data.tag_list),
					blog_category: this.getOptionId(data.category),
					author: this.getOptionId(data.author),
					video_link: data.video_link,
					source_link: data.source_link,
					featured: data.featured,
					date: data.date ? moment(data.date).format('YYYY-MM-DD') : '',
					status: data.status === true || data.status === 'true',
					content_html: data.content || data.content_html,
					meta_description: data.meta_description,
					meta_title: data.meta_title,
					meta_keywords: data.meta_keywords
				});
			},
			error: (error: any) => {
				this.isLoading = false;
				this.loadError = error?.error?.message || 'Unable to load this blog post. Please try again.';
			}
		});
	}

	private getOptionId(value: any): string {
		const option = Array.isArray(value) ? value[0] : value;
		if (option && typeof option === 'object') {
			return option._id || '';
		}
		return option || '';
	}

	onSubmit(): void {
		if (this.isSaving) {
			return;
		}
		if (this.addBlogForm.invalid) {
			this.addBlogForm.markAllAsTouched();
			return;
		}
		const payload = {
			...this.addBlogForm.value,
			image: this.blogImage
		};
		this.isSaving = true;
		const request = this.isEdit && this.id
			? this.blogService.editBlogdata(payload, this.id)
			: this.blogService.addBlog(payload);

		request.subscribe({
			next: (response: any) => {
				this.isSaving = false;
				if (response.code === 200) {
					this.toastr.successToastr(response.message);
					this.router.navigate(['/blog/view']);
				} else {
					this.toastr.errorToastr(response.message || 'Unable to save this blog post.');
				}
			},
			error: (error: any) => {
				this.isSaving = false;
				this.toastr.errorToastr(error?.error?.message || 'Unable to save this blog post. Please try again.');
			}
		});
	}

	onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			this.uploadInput.emit({
				type: 'uploadAll',
				url: environment.baseUrl + '/api/blog/addimage',
				method: 'POST',
				data: {}
			});
		} else if (output.type === 'done' && output.file) {
			const imageName = output.file.response?.result;
			if (!imageName) {
				this.toastr.errorToastr('The image upload did not return a file name.');
				return;
			}
			this.blogImage = imageName;
			this.imageUrl = this.imagePath + imageName;
		} else if (output.type === 'rejected') {
			this.toastr.errorToastr('Unable to upload the image. Please try again.');
		}
	}

	removeImage(): void {
		this.blogImage = '';
		this.imageUrl = '';
	}

	onImageError(): void {
		this.imageUrl = '';
	}

	get_tagdata(): void {
		this.blogService.getTagData({}).subscribe({
			next: (response: any) => {
				if (response.code === 200) {
					this.tagData = Array.isArray(response.result) ? response.result : [];
				} else {
					this.lookupError = response.message || 'Some blog options could not be loaded.';
				}
			},
			error: error => {
				console.error('Error loading blog tags:', error);
				this.lookupError = 'Some blog options could not be loaded.';
			}
		});
	}

	get_authordata(): void {
		this.blogService.getAuthorData({}).subscribe({
			next: (response: any) => {
				if (response.code === 200) {
					this.authorData = Array.isArray(response.result) ? response.result : [];
				} else {
					this.lookupError = response.message || 'Some blog options could not be loaded.';
				}
			},
			error: error => {
				console.error('Error loading blog authors:', error);
				this.lookupError = 'Some blog options could not be loaded.';
			}
		});
	}

	get_categorydata(): void {
		this.blogService.getCategoryData({}).subscribe({
			next: (response: any) => {
				if (response.code === 200) {
					this.categoryData = Array.isArray(response.result) ? response.result : [];
				} else {
					this.lookupError = response.message || 'Some blog options could not be loaded.';
				}
			},
			error: error => {
				console.error('Error loading blog categories:', error);
				this.lookupError = 'Some blog options could not be loaded.';
			}
		});
	}

	onCancel(): void {
		this.router.navigate(['/blog/view']);
	}
}
