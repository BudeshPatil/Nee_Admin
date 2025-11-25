import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ResponseService } from 'src/app/providers/response/response.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-response',
  templateUrl: './view-response.component.html',
  styleUrls: ['./view-response.component.scss']
})
export class ViewResponseComponent {
  msg_danger: boolean = false;
	ResponseData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedResponse: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private loginService: LoginService,
		private responseService: ResponseService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_ResponseData();
		// this.get_VendorData();
	}

	get_ResponseData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.responseService.getResponseDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.ResponseData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deleteResponse()
  {
    if (this.selectedResponse) {
			var mylist = { id: this.selectedResponse._id };
      this.responseService.deleteresponse(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_ResponseData();
						this.modalService.dismissAll();
            this.router.navigate(['/response/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_ResponseData();
	}

	open(content,data) {
    this.selectedResponse = data;
		if (this.selectedResponse) {
		var mylist = { id: this.selectedResponse._id };
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
    obj['file'] =  this.selectedResponse.media_data[0].src;
		this.responseService.deletefile(obj).subscribe(
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
