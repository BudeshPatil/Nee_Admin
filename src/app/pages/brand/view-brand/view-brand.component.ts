import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { BrandService } from 'src/app/providers/brand/brand.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrls: ['./view-brand.component.scss']
})
export class ViewBrandComponent {
msg_danger: boolean = false;
  BrandData: any = [];
  imagePath: any;
  token: any;
  VendorData: any;
  vendorid: any = '';
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  selectedBrand: any;
  closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
  deletedMediaFiles: any = [];
  deletMediaFilesData: any = [];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private brandService: BrandService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private mediaService: MediaService,
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.get_BrandData();
    // this.get_VendorData();
  }

  get_BrandData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.brandService.getBrandDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.BrandData = response.result;
            this.totalRecord = response?.count;
          }
          else {
            this.msg_danger = true;
          }
        }
      },
    );
  }

  deleteBrand()
  {
    if (this.selectedBrand) {
      var mylist = { id: this.selectedBrand._id };
      mylist['token'] = this.token;
      this.brandService.deletebrand(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(this.selectedBrand && this.selectedBrand.image){
              this.selectedBrand.image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            } 
            if(this.selectedBrand && this.selectedBrand.gallery_image){
              this.selectedBrand.gallery_image.forEach(image => {
                if(image && image.src){
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            this.deleteMediaData();
            this.get_BrandData();
            this.modalService.dismissAll();
            this.router.navigate(['/brand/view']);
          }
        },
      );
    }
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_BrandData();
  }

  open(content,data) {
    this.selectedBrand = data;
    if (this.selectedBrand) {
    var mylist = { id: this.selectedBrand._id };
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
      this.brandService.deleteMediaData(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            this.modalService.dismissAll();
          }
        },
      );
    }
  }
}
