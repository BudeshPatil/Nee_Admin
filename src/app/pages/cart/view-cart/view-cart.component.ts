import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { CartService } from '../../../providers/cart/cart.service';
import { from } from 'rxjs';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent {
  msg_danger: boolean = false;
  cartData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath: any;
  token: any;
  isactive :any ;
  selectedCart:any;
  closeResult = '';
  modalReference = null;
  constructor(
    private router: Router,
    private cartService:CartService,
    private modalService: NgbModal    
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
   }

  ngOnInit(): void {
    this.get_cartData();
  }

  get_cartData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.cartService.getCartDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.cartData = response.result; 
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
    this.get_cartData();
  }
  
  deleteCart()
  {
    if (this.selectedCart) {
			var mylist = { id: this.selectedCart._id };
      mylist['token'] = this.token;
      this.cartService.deletecart(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_cartData();
            this.router.navigate(['/cart/view']);
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  searchCart(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_cartData();
  }

  open(content,data) {
    this.selectedCart = data;
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
}
