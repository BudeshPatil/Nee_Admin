import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// Services
import { WishlistService } from '../../../providers/wishlist/wishlist.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-wishlist',
  templateUrl: './view-wishlist.component.html',
  styleUrls: ['./view-wishlist.component.scss']
})
export class ViewWishlistComponent {
  msg_danger: boolean = false;
  wishlistData: any;

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
    private wishlistService:WishlistService,
    private modalService: NgbModal,
		private activeModal: NgbActiveModal,
    public toast: ToastrManager
  ) {
    this.imagePath = environment.baseUrl + '/public/';
   }

  ngOnInit(): void {
    this.get_wishlistData();
  }

  get_wishlistData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.wishlistService.getWishlistDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.wishlistData = response.result; 
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
    this.get_wishlistData();
  }
  
  deleteWishlist()
  {
    if(this.selectedData)
    {
      var mylist = {id:this.selectedData._id};
      this.wishlistService.deletewishlist(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_wishlistData();
            this.router.navigate(['/wishlist/view']);
            this.modalService.dismissAll();
          } else {
            this.toast.errorToastr(response.message);
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

  searchWishlist(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_wishlistData();
  }
}
