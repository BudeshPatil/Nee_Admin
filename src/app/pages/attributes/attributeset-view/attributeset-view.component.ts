import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { AttributesService } from 'src/app/attributes/attributes.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attributeset-view',
  templateUrl: './attributeset-view.component.html',
  styleUrls: ['./attributeset-view.component.scss']
})
export class AttributesetViewComponent {

  msg_danger: boolean = false;
	AttributeData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedAttribute: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	searchText = '';
	constructor(
		private router: Router,
		private loginService: LoginService,
		private attributeService: AttributesService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_AttributeSetData();
		// this.get_VendorData();
	}

	get_AttributeSetData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.attributeService.getAttributeSetDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.AttributeData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deleteAttribute()
  {
    if (this.selectedAttribute) {
			var mylist = { id: this.selectedAttribute._id };
      this.attributeService.deleteattributeSet(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_AttributeSetData();
						this.modalService.dismissAll();
            this.router.navigate(['/attribute/view']);
						
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_AttributeSetData();
	}

	open(content,data) {
    this.selectedAttribute = data;
		if (this.selectedAttribute) {
		var mylist = { id: this.selectedAttribute._id };
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

	searchAttribute(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_AttributeSetData();
  }
}
