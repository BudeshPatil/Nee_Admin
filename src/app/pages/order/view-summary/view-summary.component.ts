import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// Services
import { OrderService } from '../../../providers/order/order.service';
import { from } from 'rxjs';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-summary',
  templateUrl: './view-summary.component.html',
  styleUrls: ['./view-summary.component.scss']
})
export class ViewSummaryComponent {

  msg_danger: boolean = false;
  OrderData: any;
  imagePath : any;
  id:any;
  subtotal:any;
  shippingCharge:any;
  total:any;
  ShowOrderStatus: boolean = false;
  token: any;
  selectedStatus:any;
  closeResult : any;
  modalReference:any;
  apmData: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalService: NgbModal,
  )
  { 
    this.imagePath = environment.baseUrl+'/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
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
      token: this.token
    };
    this.orderService.UpdateAdminOrderStatus(obj).subscribe(
      (response)=> {
        if(response.code == 200) 
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

  UpdateOrderPaymentStatus(event:any,order_id:any) {
    const obj = {
      payment_status: event.currentTarget.value,
      order_id: order_id,
      token: this.token
    };
    this.orderService.UpdateOrderPaymentStatus(obj).subscribe(
      (response)=> {
        if(response.code == 200) 
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

  get_orderData()
  { 
    let obj = {id:this.id};
    this.orderService.getAdminOrderSummaryData(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            let final_total = 0;
            if(response.result != null && response.result != '')
            {
              this.OrderData = response.result;
              for(let r = 0; r < response.result?.product.length; r++)
              {
                final_total += Number(parseInt(response.result.product[r].qty) * parseInt(response.result.product[r].price));
                this.subtotal = final_total;
                this.total = Number(parseInt(this.subtotal) + parseInt(this.OrderData.shipping_charges));
              } 
              if(this.OrderData && this.OrderData.apm_data && this.OrderData.apm_data.length > 0){
                this.apmData = this.OrderData.apm_data[0];
              }
            }
            else
            {
              this.msg_danger   = true;
            }
           
          }
        },
      );
  }

  ChangeOrderStatus(content) {
    if (this.OrderData && this.OrderData.payment_type == 'N-Genious' && (this.OrderData.payment_status == 'Pending' || this.OrderData.payment_status == 'Payment Review')) {
      this.modalService.dismissAll();
      this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      );
    } else {
      const obj = {
        order_status: this.selectedStatus,
        order_id: this.OrderData._id,
        token: this.token
      };
      this.orderService.UpdateAdminOrderStatus(obj).subscribe(
        (response)=> {
          if(response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.modalService.dismissAll();
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
  }

  open(content,data) {
    this.selectedStatus = data;
		if (this.selectedStatus) {
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

  generateInvoice(orderID){
    const obj = {
      order_id: orderID,
      token:this.token
    };
    this.orderService.generateInvoice(obj).subscribe(
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

  onclickAPM(content){
		this.modalService.open(content,
			{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
				 this.closeResult = `Closed with: ${result}`;
			 }, (reason) => {
				 this.closeResult = 
						`Dismissed ${this.getDismissReason(reason)}`;
			 });
		 }
}
