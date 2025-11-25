import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// Services
import { SizeService } from '../../../providers/size/size.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-size',
  templateUrl: './view-size.component.html',
  styleUrls: ['./view-size.component.scss']
})
export class ViewSizeComponent {

  msg_danger: boolean = false;
  sizeData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath :any;
  selectedData:any;
	modalReference = null;
  closeResult = '';
  constructor(
    private router: Router,
    private sizeService:SizeService,
    private modalService: NgbModal,
		private activeModal: NgbActiveModal,
    public toastr : ToastrManager
  ) {
    this.imagePath = environment.baseUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_sizeData();
  }

  get_sizeData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.sizeService.getSizeDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.sizeData = response.result; 
              this.totalRecord = response?.count;
              window.scroll(0,0); 
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
    this.get_sizeData();
  }
  
  deleteSize()
  {
    if(this.selectedData)
    {
      var mylist = {id:this.selectedData._id};
      this.sizeService.deletesize(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_sizeData();
            this.router.navigate(['/size/view']);
            this.modalService.dismissAll();
          } else {
            this.toastr.errorToastr(response.message);
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  open(content,data) {
    this.selectedData = data;
		if (this.selectedData) {
		var mylist = { id: this.selectedData._id };
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

  searchSize(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_sizeData();
  }
}
