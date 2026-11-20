import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ResponseService } from '../../../providers/response/response.service';

import { BlogcategoryService } from 'src/app/providers/blogcategory/blogcategory.service';

@Component({
	selector: 'app-view-blog-category',
	templateUrl: './view-blog-category.component.html',
	styleUrls: ['./view-blog-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
	CategoryData: any[] = [];
	imagePath: any;
	token: any;
	isLoading = true;
	loadError = false;
	searchText = '';
	isDeleting = false;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedCategory: any;
	closeResult = '';
	modalReference: Promise<any> | null = null;
	constructor(
		private router: Router,
		private categoryService: BlogcategoryService,
		private modalService: NgbModal,
		public toastr: ToastrManager,
		public responseService: ResponseService
	) {
		this.imagePath = environment.baseUrl + '/public/blog/';
		this.token = localStorage.getItem('neelgund-admin-token');
	}

	ngOnInit(): void {
		this.get_CategoryData();
	}

	get_CategoryData() {
		this.isLoading = true;
		this.loadError = false;
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.categoryService.getCategoryDetails(obj).subscribe({
			next: (response) => {
				this.isLoading = false;
				if (response.code === 200) {
					this.CategoryData = Array.isArray(response.result) ? response.result : [];
					this.totalRecord = Number(response.count) || 0;
					return;
				}

				this.CategoryData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr(response.message || 'Blog categories could not be loaded.');
			},
			error: () => {
				this.isLoading = false;
				this.CategoryData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr('Blog categories could not be loaded.');
			}
		});
	}

	get filteredCategories(): any[] {
		const query = this.searchText.trim().toLowerCase();
		if (!query) {
			return this.CategoryData;
		}

		return this.CategoryData.filter((category) =>
			String(category.name || '').toLowerCase().includes(query)
		);
	}

	deleteCategory() {
		if (this.selectedCategory && !this.isDeleting) {
			this.isDeleting = true;
			const mylist: any = { id: this.selectedCategory._id };
			mylist['token'] = this.token;
			this.categoryService.deletecategory(mylist).subscribe({
				next: (response) => {
					this.isDeleting = false;
					if (response.code === 200) {
						this.modalService.dismissAll();
						this.toastr.successToastr(response.message || 'Blog category deleted.');
						this.deleteMediaData();
						if (this.CategoryData.length === 1 && this.currentPage > 1) {
							this.currentPage--;
						}
						this.get_CategoryData();
						this.router.navigate(['/blog-category/view']);
					} else {
						this.modalService.dismissAll();
						this.toastr.errorToastr(response.message || 'Blog category could not be deleted.');
						this.CreateErrorResponse(response);
					}
				},
				error: (error) => {
					this.isDeleting = false;
					this.toastr.errorToastr(error?.error?.message || 'Blog category could not be deleted.');
				}
			});
		}
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CategoryData();
	}

	open(content: any, data: any) {
		this.selectedCategory = data;
		if (this.selectedCategory) {
			this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
			);
		}
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

	deleteMediaFile(){
    let obj = {	};
		let imageFiles = [];
		if(this.selectedCategory.media_data && this.selectedCategory.media_data.length > 0){
			imageFiles.push(this.selectedCategory.media_data[0].src)
			obj['files'] =  imageFiles;
			this.categoryService.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
					}
					else {
						// this.bannerVideo = this.bannerVideo;
					}
				},
			);
		}
	}

	deleteMediaData() {
		if (this.selectedCategory.media_data && this.selectedCategory.media_data.length > 0) {
			var mylist = { id: this.selectedCategory.media_data[0]._id, file: this.selectedCategory.media_data[0].src };
			this.categoryService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}


	CreateErrorResponse(responseData){
		if(responseData){
			let obj = {
				model:'Blog-Category',
				request:responseData,
				errorCode:400,
				error:responseData.error,
				status:responseData.status,
				log_type:'Delete',
				message:responseData.message,
				token: this.token
			};
			this.responseService.addErrorResponse(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						console.log('logs updated');
					}
					else {
					}
				},
			);
			}
	}

}
