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
	msg_danger: boolean = false;
	CategoryData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

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
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.categoryService.getCategoryDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CategoryData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deleteCategory()
  {
    if (this.selectedCategory) {
			var mylist = { id: this.selectedCategory._id };
			mylist['token'] = this.token;
      this.categoryService.deletecategory(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						this.modalService.dismissAll();
            this.get_CategoryData();
						this.deleteMediaData();
            this.router.navigate(['/category/view']);
          } else {
						this.modalService.dismissAll();
						this.toastr.errorToastr(response.message);
						this.CreateErrorResponse(response);
					}
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CategoryData();
	}

	open(content,data) {
    this.selectedCategory = data;
		if (this.selectedCategory) {
		var mylist = { id: this.selectedCategory._id };
		this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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
