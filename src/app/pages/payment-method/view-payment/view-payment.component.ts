import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { PaymentsService } from 'src/app/providers/payments/payments.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent {
  msg_danger: boolean = false;
	PaymentsData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedPayments: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private loginService: LoginService,
		private paymentsService: PaymentsService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		public toastr:ToastrManager
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_PaymentsData();
		// this.get_VendorData();
	}

	get_PaymentsData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.paymentsService.getPaymentDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.PaymentsData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deletePayments()
  {
    if (this.selectedPayments) {
			var mylist = { id: this.selectedPayments._id };
      this.paymentsService.deletepayments(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						this.modalService.dismissAll();
            this.get_PaymentsData();						
            this.router.navigate(['/payments/view']);
          } else {
						this.modalService.dismissAll();
						this.toastr.errorToastr(response.message);
					}
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_PaymentsData();
	}

	open(content,data) {
    this.selectedPayments = data;
		if (this.selectedPayments) {
		var mylist = { id: this.selectedPayments._id };
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
