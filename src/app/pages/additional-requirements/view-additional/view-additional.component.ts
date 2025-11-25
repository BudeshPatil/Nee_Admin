import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { AdditionalService } from 'src/app/providers/additional/additional.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-additional',
  templateUrl: './view-additional.component.html',
  styleUrls: ['./view-additional.component.scss']
})
export class ViewAdditionalComponent {
  msg_danger: boolean = false;
  AdditionalData: any = [];
  imagePath: any;
  token: any;
  VendorData: any;
  vendorid: any = '';
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  selectedAdditional: any;
  closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
  deletedMediaFiles: any = [];
  deletMediaFilesData: any = [];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private additionalService: AdditionalService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private mediaService: MediaService,
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.get_AdditionalData();
    // this.get_VendorData();
  }

  get_AdditionalData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.additionalService.getAdditionalDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.AdditionalData = response.result;
            this.totalRecord = response?.count;
          }
          else {
            this.msg_danger = true;
          }
        }
      },
    );
  }

  deleteAdditional()
  {
    if (this.selectedAdditional) {
      var mylist = { id: this.selectedAdditional._id };
      mylist['token'] = this.token;
      this.additionalService.deleteadditional(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(this.selectedAdditional && this.selectedAdditional.image){
              this.selectedAdditional.image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            } 
            if(this.selectedAdditional && this.selectedAdditional.gallery_image){
              this.selectedAdditional.gallery_image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            this.deleteMediaData();
            this.get_AdditionalData();
            this.modalService.dismissAll();
            this.router.navigate(['/additional/view']);
          }
        },
      );
    }
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_AdditionalData();
  }

  open(content,data) {
    this.selectedAdditional = data;
    if (this.selectedAdditional) {
    var mylist = { id: this.selectedAdditional._id };
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
      this.additionalService.deleteMediaData(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            this.modalService.dismissAll();
          }
        },
      );
    }
  }
}
