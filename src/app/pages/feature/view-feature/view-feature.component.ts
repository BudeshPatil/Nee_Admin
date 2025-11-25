import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { FeatureService } from 'src/app/providers/feature/feature.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-feature',
  templateUrl: './view-feature.component.html',
  styleUrls: ['./view-feature.component.scss']
})
export class ViewFeatureComponent {
  msg_danger: boolean = false;
  FeatureData: any = [];
  imagePath: any;
  token: any;
  VendorData: any;
  vendorid: any = '';
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  selectedFeature: any;
  closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
  deletedMediaFiles: any = [];
  deletMediaFilesData: any = [];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private featureService: FeatureService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private mediaService: MediaService,
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.get_FeatureData();
    // this.get_VendorData();
  }

  get_FeatureData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.featureService.getFeatureDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.FeatureData = response.result;
            this.totalRecord = response?.count;
          }
          else {
            this.msg_danger = true;
          }
        }
      },
    );
  }

  deleteFeature()
  {
    if (this.selectedFeature) {
      var mylist = { id: this.selectedFeature._id };
      mylist['token'] = this.token;
      this.featureService.deletefeature(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(this.selectedFeature && this.selectedFeature.image){
              this.selectedFeature.image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            } 
            if(this.selectedFeature && this.selectedFeature.gallery_image){
              this.selectedFeature.gallery_image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            this.deleteMediaData();
            this.get_FeatureData();
            this.modalService.dismissAll();
            this.router.navigate(['/feature/view']);
          }
        },
      );
    }
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_FeatureData();
  }

  open(content,data) {
    this.selectedFeature = data;
    if (this.selectedFeature) {
    var mylist = { id: this.selectedFeature._id };
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
      this.featureService.deleteMediaData(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            this.modalService.dismissAll();
          }
        },
      );
    }
  }
}
