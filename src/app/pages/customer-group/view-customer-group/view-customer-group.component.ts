import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/providers/customer/customer.service';
import { environment } from 'src/environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-customer-group',
  templateUrl: './view-customer-group.component.html',
  styleUrls: ['./view-customer-group.component.scss']
})
export class ViewCustomerGroupComponent {
  msg_danger: boolean = false;
	authorData: any;
	imagePath: any;
	customer_groupData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';
	config = {
    value: true,
    name: '',
    disabled: false,
    height: 25,
    width: 90,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: '#36aef5',
      unchecked: '#423f3f',
    },
    switchColor: {
      checked: '#3366FF',
      unchecked: 'crimson',
    },
    labels: {
      unchecked: 'Deactive',
      checked: 'Active',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
  };
  isactive :any ;
  closeResult = '';
  modalReference = null;
  selectedCustomergroup : any;
	constructor(
		private router: Router,
		private customerService: CustomerService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.isactive = 'none';
	}

	ngOnInit(): void {
		this.getCustomer_Group();
	}

	getCustomer_Group() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.customerService.viewCustomer_Group(obj).subscribe(
			(response) => {
				if (response.code === 200) {
					if (response.result) {
						this.customer_groupData = response.result;
						this.initialized = true;
						this.totalRecord = response.totalRecord;
					}
				} else {
					this.msg_danger = true;
				}
			}
		)
	}
	onListChangePage(event: any) {
		this.currentPage = event;
		this.getCustomer_Group();
	}

	

	customer_groupDelete() {
		if (this.selectedCustomergroup) {
			var mylist = { id: this.selectedCustomergroup._id };
			this.customerService.customer_groupdelete(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.getCustomer_Group();
						this.router.navigate(['/customer-groups/view']);
						window.location.reload();
					}
				}
			)

		}
	}

	searchCustomer_Group(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.getCustomer_Group();
  }
	changeStatus(){
    if(this.isactive != 'none'){
      this.config.switchColor.checked = '#ffffff';
      this.config.color.checked = 'green';
      this.config.labels.checked = 'Active';
    } else {
      if(this.isactive){
        this.isactive = false;
        this.config.switchColor.unchecked = 'crimson';
        this.config.color.unchecked = '#423f3f';
        this.config.labels.unchecked = 'Deactive';
      } else {
        this.isactive = true
      }
    }
	}

  resetFilter(){
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.config.switchColor.unchecked = '#dcdcdc';
    this.config.color.unchecked = '#dcdcdc';
    this.config.labels.unchecked = 'Change';
    this.isactive = 'none';
	}

  open(content,data) {
    this.selectedCustomergroup = data;
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
}
