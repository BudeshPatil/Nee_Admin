import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { LocationService } from 'src/app/providers/location/location.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-location',
  templateUrl: './view-location.component.html',
  styleUrls: ['./view-location.component.scss']
})
export class ViewLocationComponent {
  msg_danger: boolean = false;
	LocationData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedLocation: any;
	closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	deletedMediaFiles: any = [];
	deletMediaFilesData: any = [];
	constructor(
		private router: Router,
		private loginService: LoginService,
		private locationService: LocationService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private mediaService: MediaService,
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_LocationData();
		// this.get_VendorData();
	}

	get_LocationData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token,
		};
		this.locationService.getLocationDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.LocationData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	deleteLocation()
  {
    if (this.selectedLocation) {
			var mylist = { id: this.selectedLocation._id };
			mylist['token'] = this.token;
      this.locationService.deletelocation(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
						if(this.selectedLocation && this.selectedLocation.image){
							this.selectedLocation.image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						} 
						if(this.selectedLocation && this.selectedLocation.gallery_image){
							this.selectedLocation.gallery_image.forEach(image => {
								if(image && image.src){
									this.deletedMediaFiles.push(image.src);
									this.deletMediaFilesData.push(image);
								}
							});
						}
						this.deleteMediaData();
            this.get_LocationData();
						this.modalService.dismissAll();
            this.router.navigate(['/location/view']);
          }
        },
      );
    }
  }

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_LocationData();
	}

	open(content,data) {
    this.selectedLocation = data;
		if (this.selectedLocation) {
		var mylist = { id: this.selectedLocation._id };
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
			this.locationService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}
}
