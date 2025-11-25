import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { OrderService } from '../../../providers/order/order.service';
import { from } from 'rxjs';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {
  msg_danger: boolean = false;
  orderData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath :any;
  ShowOrderStatus: boolean = false;
  token: any;
  selectedOrder:any;
  closeResult : any;
  modalReference:any;
  constructor(
    private router: Router,
    private orderService:OrderService,
    private modalService: NgbModal,
		private activeModal: NgbActiveModal
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token'); 
   }

  ngOnInit(): void {
    this.get_orderData();
  }

  get_orderData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.orderService.getOrderDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.orderData = response.result; 
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
    this.get_orderData();
  }
  
  deleteOrder()
  {
    if(this.selectedOrder)
    {
      var mylist = { id: this.selectedOrder._id };
      this.orderService.deleteorder(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_orderData();
            this.router.navigate(['/order/view']);
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  open(content,data) {
    this.selectedOrder = data;
		if (this.selectedOrder) {
		var mylist = { id: this.selectedOrder._id };
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

  searchOrder(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_orderData();
  }

  ShowStatusBox()
  {
    this.ShowOrderStatus = true;
  }

  UpdateOrderStatus(event:any,order_id:any) {
    const obj = {
      order_status: event.currentTarget.value,
      order_id: order_id,
      token:this.token
    };
    this.orderService.UpdateAdminOrderStatus(obj).subscribe(
      (response)=> {
        if (response.code == 200) 
        {
          if(response.result != null && response.result != '')
          {
            this.get_orderData();
            this.ShowOrderStatus = false;
          }
          else
          {
            this.msg_danger   = true;
          }
        }
      },
    );
  }
  
  downloadInvoice(orderID){
    const obj = {
      order_id: orderID,
      token:this.token
    };
    this.orderService.downloadInvoice(obj).subscribe(
      (response)=> {
        if (response.code == 200) 
        {
          if(response.invoicelink != null && response.invoicelink != '')
          {
            window.open(response.invoicelink, "_blank");
          }
          else
          {
            this.msg_danger   = true;
          }
        }
      },
    );
  }
}
