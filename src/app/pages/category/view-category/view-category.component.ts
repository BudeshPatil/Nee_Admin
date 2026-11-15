import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { CategoryService } from 'src/app/providers/category/category.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ResponseService } from '../../../providers/response/response.service';

@Component({
	selector: 'app-view-category',
	templateUrl: './view-category.component.html',
	styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
	CategoryData: any[] = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	searchText = '';
	isLoading = true;
	loadError = false;
	isDeleting = false;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedCategory: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private loginService: LoginService,
		private categoryService: CategoryService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		public toastr: ToastrManager,
		public responseService: ResponseService
	) {
		this.imagePath = environment.baseUrl + '/public/category/';
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
				if (response.code == 200) {
					this.CategoryData = Array.isArray(response.result) ? response.result : [];
					this.totalRecord = Number(response.count) || this.CategoryData.length;
					return;
				}

				this.CategoryData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr(response.message || 'Project statuses could not be loaded.');
			},
			error: () => {
				this.isLoading = false;
				this.CategoryData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr('Project statuses could not be loaded. Check your connection and try again.');
			}
		});
	}

	deleteCategory()
  {
    if (this.selectedCategory) {
			const mylist = { id: this.selectedCategory._id, token: this.token };
			this.isDeleting = true;
      this.categoryService.deletecategory(mylist).subscribe({
        next: (response)=> {
					this.isDeleting = false;
          if (response.code == 200) {
						this.modalService.dismissAll();
            this.get_CategoryData();
						this.deleteMediaData();
          } else {
						this.modalService.dismissAll();
						this.toastr.errorToastr(response.message);
						this.CreateErrorResponse(response);
					}
        },
				error: () => {
					this.isDeleting = false;
					this.toastr.errorToastr('The project status could not be deleted. Check your connection and try again.');
				}
      });
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CategoryData();
	}

	get filteredCategoryData(): any[] {
		const query = this.searchText.trim().toLowerCase();
		if (!query) {
			return this.CategoryData;
		}

		return this.CategoryData.filter((category) => {
			const searchableText = [category.name, category.sequence_number, category.status]
				.filter((value) => value !== null && value !== undefined)
				.join(' ')
				.toLowerCase();
			return searchableText.includes(query);
		});
	}

	clearSearch(): void {
		this.searchText = '';
	}

	open(content,data) {
    this.selectedCategory = data;
		if (this.selectedCategory) {
		this.modalReference = this.modalService.open(content, {
			ariaLabelledBy: 'category-delete-title',
			centered: true
		}).result.then(
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

  closeModal(){
    this.activeModal.close();
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
				model:'Category',
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
