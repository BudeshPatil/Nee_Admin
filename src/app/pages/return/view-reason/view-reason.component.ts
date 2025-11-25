import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ReturnService } from '../../../providers/return/return.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-reason',
  templateUrl: './view-reason.component.html',
  styleUrls: ['./view-reason.component.scss']
})
export class ViewReasonComponent {
  msg_danger: boolean = false;
	ReasonData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedReason: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private loginService: LoginService,
		private reasonService: ReturnService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		public toastr: ToastrManager
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_ReasonData();
		// this.get_VendorData();
	}

	get_ReasonData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.reasonService.getReasonDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.ReasonData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deleteReason()
  {
    if (this.selectedReason) {
			var mylist = { id: this.selectedReason._id };
      this.reasonService.deletereason(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_ReasonData();
						this.modalService.dismissAll();
            this.router.navigate(['/return/view-reason']);
          } else {
						this.toastr.errorToastr(response.message);
					}
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_ReasonData();
	}

	open(content,data) {
    this.selectedReason = data;
		if (this.selectedReason) {
		var mylist = { id: this.selectedReason._id };
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
