import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { MediaService } from 'src/app/providers/media/media.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss']
})
export class ViewMediaComponent {
  msg_danger: boolean = false;
	MediaData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedMedia: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private loginService: LoginService,
		private mediaService: MediaService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_MediaData();
		// this.get_VendorData();
	}

	get_MediaData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.mediaService.getMediaDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.MediaData = response.result;
						this.totalRecord = response?.count;
						this.MediaData.forEach(med => {
							if(med && med.src && med.src.includes('media')){
								med.src = this.imagePath+'media/'+med.src;
							} else {
								med.src = this.imagePath + med.src;
							}
						});
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deleteMedia()
  {
    if (this.selectedMedia) {
			var mylist = { id: this.selectedMedia._id, file:this.selectedMedia.src };
      this.mediaService.deletemedia(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.get_MediaData();
            this.router.navigate(['/media/view']);
						this.modalService.dismissAll();
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_MediaData();
	}

	open(content,data) {
    this.selectedMedia = data;
		if (this.selectedMedia) {
		var mylist = { id: this.selectedMedia._id };
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
