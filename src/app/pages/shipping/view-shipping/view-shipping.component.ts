import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// Services
import { ShippingService } from '../../../providers/shipping/shipping.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-view-shipping',
  templateUrl: './view-shipping.component.html',
  styleUrls: ['./view-shipping.component.scss']
})
export class ViewShippingComponent {
  msg_danger: boolean = false;
  shippingData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath :any;
  selectedMethod:any;
  modalReference = null;
  closeResult = '';
  constructor(
    private router: Router,
    private shippingService:ShippingService,
    private modalService: NgbModal,
		private activeModal: NgbActiveModal
  ) {
    this.imagePath = environment.baseUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_shippingData();
  }

  get_shippingData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.shippingService.getShippingDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.shippingData = response.result; 
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
    this.get_shippingData();
  }
  
  deleteShipping()
  {
    if(this.selectedMethod)
    {
      var mylist = {id:this.selectedMethod._id};
      this.shippingService.deleteshipping(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_shippingData();
            this.router.navigate(['/shipping/view']);
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  searchShipping(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_shippingData();
  }

  open(content,data) {
    this.selectedMethod = data;
		if (this.selectedMethod) {
		var mylist = { id: this.selectedMethod._id };
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
}
