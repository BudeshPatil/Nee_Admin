import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { CategoryService } from 'src/app/providers/category/category.service';
import { SubcategoryService } from 'src/app/providers/subcategory/subcategory.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-view-subcategory',
	templateUrl: './view-subcategory.component.html',
	styleUrls: ['./view-subcategory.component.scss']
})
export class ViewSubcategoryComponent {

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
	selectedSubcategory :any;
	modalReference = null;
	closeResult = '';
	constructor(
		private router: Router,
		private loginService: LoginService,
		private categoryService: CategoryService,
		private subcategoryService: SubcategoryService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_CategoryData();
		// this.get_VendorData();
	}

	get_CategoryData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.subcategoryService.getSubCategoryDetails(obj).subscribe(
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

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CategoryData();
	}

	deletesubCategory() {
		if (this.selectedSubcategory) {
			var mylist = { id: this.selectedSubcategory._id };
			this.subcategoryService.deletesubcategory(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_CategoryData();
						this.deleteMediaData();
						this.modalService.dismissAll();
						this.router.navigate(['/subcategory/view']);
					}
				},
			);
		}
	}
	
	open(content,data) {
    this.selectedSubcategory = data;
		if (this.selectedSubcategory) {
		var mylist = { id: this.selectedSubcategory._id };
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
		if(this.selectedSubcategory.media_data && this.selectedSubcategory.media_data.length > 0){
			imageFiles.push(this.selectedSubcategory.media_data[0].src)
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
		if (this.selectedSubcategory.media_data && this.selectedSubcategory.media_data.length > 0) {
			var mylist = { id: this.selectedSubcategory.media_data[0]._id, file: this.selectedSubcategory.media_data[0].src };
			this.subcategoryService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

}
