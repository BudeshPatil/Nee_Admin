import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { CollectionService } from 'src/app/providers/collection/collection.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-collection',
  templateUrl: './view-collection.component.html',
  styleUrls: ['./view-collection.component.scss']
})
export class ViewCollectionComponent {
  msg_danger: boolean = false;
	CollectionData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedCollection: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private loginService: LoginService,
		private collectionService: CollectionService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private mediaService: MediaService,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_CollectionData();
		// this.get_VendorData();
	}

	get_CollectionData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.collectionService.getCollectionDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CollectionData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deleteCollection()
  {
    if (this.selectedCollection) {
			var mylist = { id: this.selectedCollection._id };
			mylist['token'] = this.token;
      this.collectionService.deletecollection(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						if(this.selectedCollection && this.selectedCollection.image){
							this.selectedCollection.image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						} 
						if(this.selectedCollection && this.selectedCollection.gallery_image){
							this.selectedCollection.gallery_image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
						this.deleteMediaData();
            this.get_CollectionData();
						this.modalService.dismissAll();
            this.router.navigate(['/collection/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CollectionData();
	}

	open(content,data) {
    this.selectedCollection = data;
		if (this.selectedCollection) {
		var mylist = { id: this.selectedCollection._id };
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
			this.collectionService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}
}
