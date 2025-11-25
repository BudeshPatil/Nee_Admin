import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ModelService } from 'src/app/providers/model/model.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';

@Component({
  selector: 'app-view-model',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.scss']
})
export class ViewModelComponent {
  msg_danger: boolean = false;
  ModelData: any = [];
  imagePath: any;
  token: any;
  VendorData: any;
  vendorid: any = '';
  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  selectedModel: any;
  closeResult = '';
  modalReference = null;
  selectedCustomergroup: any;
  deletedMediaFiles: any = [];
  deletMediaFilesData: any = [];
  constructor(
    private router: Router,
    private loginService: LoginService,
    private modelService: ModelService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private mediaService: MediaService,
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.get_ModelData();
    // this.get_VendorData();
  }

  get_ModelData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.modelService.getModelDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.ModelData = response.result;
            this.totalRecord = response?.count;
          }
          else {
            this.msg_danger = true;
          }
        }
      },
    );
  }

  deleteModel() {
    if (this.selectedModel) {
      var mylist = { id: this.selectedModel._id };
      mylist['token'] = this.token;
      this.modelService.deletemodel(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            if (this.selectedModel && this.selectedModel.image) {
              this.selectedModel.image.forEach(image => {
                if (image && image.src) {
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            if (this.selectedModel && this.selectedModel.gallery_image) {
              this.selectedModel.gallery_image.forEach(image => {
                if (image && image.src) {
                  this.deletedMediaFiles.push(image.src);
                  this.deletMediaFilesData.push(image);
                }
              });
            }
            this.deleteMediaData();
            this.get_ModelData();
            this.modalService.dismissAll();
            this.router.navigate(['/model/view']);
          }
        },
      );
    }
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_ModelData();
  }

  open(content, data) {
    this.selectedModel = data;
    if (this.selectedModel) {
      var mylist = { id: this.selectedModel._id };
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

  closeModal() {
    this.activeModal.close();
  }

  deleteMediaData() {
    if (this.deletMediaFilesData && this.deletMediaFilesData.length > 0) {
      let mediaIds = this.deletMediaFilesData.map(md => { return md._id });
      var mylist = { ids: mediaIds, files: this.deletedMediaFiles };
      this.modelService.deleteMediaData(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            this.modalService.dismissAll();
          }
        },
      );
    }
  }
}
