import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CollectioncategoryService } from 'src/app/providers/collectioncategory/collectioncategory.service';

@Component({
  selector: 'app-view-collectioncat',
  templateUrl: './view-collectioncat.component.html',
  styleUrls: ['./view-collectioncat.component.scss']
})
export class ViewCollectioncatComponent {
  msg_danger: boolean = false;
	CollectionData: any = [];
	token: any;
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedCollection: any;
	closeResult = '';
  selectedCustomergroup : any;
  modalReference:any;
	constructor(
		private router: Router,
		private collectionService: CollectioncategoryService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_CollectionData();
	}

	get_CollectionData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.collectionService.getCollectionCategoryDetails(obj).subscribe(
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
      this.collectionService.deletecollectionCategory(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_CollectionData();
						this.modalService.dismissAll();
            this.router.navigate(['/collection-category/view']);
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
}
