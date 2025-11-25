import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ReturnService } from 'src/app/providers/return/return.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-return',
  templateUrl: './view-return.component.html',
  styleUrls: ['./view-return.component.scss']
})
export class ViewReturnComponent {

  msg_danger: boolean = false;
	ReturnData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedReturn: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private loginService: LoginService,
		private returnService: ReturnService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_ReturnData();
		// this.get_VendorData();
	}

	get_ReturnData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.returnService.getReturnDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.ReturnData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deleteReturn()
  {
    if (this.selectedReturn) {
			var mylist = { id: this.selectedReturn._id };
      this.returnService.deletereturn(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_ReturnData();
            this.router.navigate(['/return/view']);
						this.modalService.dismissAll();
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_ReturnData();
	}

	open(content,data) {
    this.selectedReturn = data;
		if (this.selectedReturn) {
		var mylist = { id: this.selectedReturn._id };
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
