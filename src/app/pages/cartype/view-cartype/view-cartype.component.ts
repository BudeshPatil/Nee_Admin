import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { CartypeService } from 'src/app/providers/cartype/cartype.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-cartype',
  templateUrl: './view-cartype.component.html',
  styleUrls: ['./view-cartype.component.scss']
})
export class ViewCartypeComponent {
  msg_danger: boolean = false;
	CartypeData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedCartype: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private loginService: LoginService,
		private cartypeService: CartypeService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private mediaService: MediaService,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_CartypeData();
		// this.get_VendorData();
	}

	get_CartypeData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.cartypeService.getCartypeDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CartypeData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deleteCartype()
  {
    if (this.selectedCartype) {
			var mylist = { id: this.selectedCartype._id };
			mylist['token'] = this.token;
      this.cartypeService.deletecartype(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						if(this.selectedCartype && this.selectedCartype.image){
							this.selectedCartype.image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						} 
						if(this.selectedCartype && this.selectedCartype.gallery_image){
							this.selectedCartype.gallery_image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
						this.deleteMediaData();
            this.get_CartypeData();
						this.modalService.dismissAll();
            this.router.navigate(['/cartype/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CartypeData();
	}

	open(content,data) {
    this.selectedCartype = data;
		if (this.selectedCartype) {
		var mylist = { id: this.selectedCartype._id };
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

	deleteMediaData() {
		if (this.deletMediaFilesData && this.deletMediaFilesData.length > 0) {
			let mediaIds = this.deletMediaFilesData.map(md => { return md._id });
			var mylist = { ids: mediaIds, files: this.deletedMediaFiles };
			this.cartypeService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}
}
