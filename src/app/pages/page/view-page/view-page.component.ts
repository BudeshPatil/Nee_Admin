import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import { PageService } from '../../../providers/page/page.service';
import { from } from 'rxjs';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';
import { BannerService } from 'src/app/providers/banner/banner.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  
  msg_danger: boolean = false;
  pageData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  selectedPage:any;
  modalReference = null;
  closeResult = '';
  constructor(
    private router: Router,
    private pageService:PageService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private mediaService: MediaService,
    public bannerservice: BannerService,
    ) 
  { 

  }

  ngOnInit(): void {
    this.get_pageData();
  }

  get_pageData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.pageService.getPageDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.pageData    = response.result;
              this.totalRecord = response?.count;
            }
            else
            {
              this.msg_danger   = true;
            }
           
          }
        },
      );
  }

  
  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_pageData();
  } 

  searchPage(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_pageData();
  }

  open(content,data) {
      this.selectedPage = data;
      this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
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

    deletePage() {
      if (this.selectedPage) {
        var mylist = { id: this.selectedPage._id };
        this.pageService.deletePage(mylist).subscribe(
          (response) => {
            this.get_pageData();
            if (response.code == 200) {
              this.modalService.dismissAll();
            }
          },
        );
      }
    }
}
