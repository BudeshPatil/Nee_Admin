import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { ProductService } from '../../../providers/product/product.service';
import { from } from 'rxjs';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
	selector: 'app-view-productd',
	templateUrl: './view-productd.component.html',
	styleUrls: ['./view-productd.component.scss']
})
export class ViewProductdComponent {

	msg_danger: boolean = false;
	productData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';
	searchTextdisplay = '';
	imagePath: any;
	isFilterActive: boolean = false;
	filterArray: any = [];
	_id: any;
	filter_price_from: number = 0;
	filter_price_to: number = 0;
	filter_quantity_from: number = 0;
	filter_quantity_to: number = 0;
	name: any;
	product_type: any;
	sku: any;
	visibility: any;
	status: any = 'true';
	user: any;
	config = {
		value: true,
		name: '',
		disabled: false,
		height: 25,
		width: 80,
		margin: 3,
		fontSize: 10,
		speed: 300,
		color: {
			checked: 'green',
			unchecked: '#423f3f',
		},
		switchColor: {
			checked: 'crimson',
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
	selectedProduct: any;
	modalReference = null;
	closeResult = '';
	disbaledproductData: any = [];
	totaldisbaledRecord: any;

	availableColorData: any = [];
  available_colors: any = [];
  availableProductsList: any = [];
  id: any;

	constructor(
		private router: Router,
		private productService: ProductService,
		public loginService: LoginService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		let tempuser = localStorage.getItem('user');
		this.user = JSON.parse(tempuser);
	}

	ngOnInit(): void {
		this.get_productData();
		this.get_Disabled_Products();
	}

	get_productData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.filterArray = [];
		this.filterArray.push({
			home_product: true
		});
		if (this.filterArray && this.filterArray.length > 0) {
			obj['filterArray'] = this.filterArray
		}
		obj['isdisplayonhome'] = true;
		this.productService.getDisplayonHomeProductDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.productData = response.result;
						this.totalRecord = response?.count;
						if (this.filterArray && this.filterArray.length > 0) {
							this.updateFilterInUsers();
						}
						window.scroll(0, 0);
					}
					else {
						this.msg_danger = true;
						this.productData = [];
					}

				}
			},
		);
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_productData();
	}

	deleteProduct() {
		if (this.selectedProduct) {
			var mylist = { id: this.selectedProduct._id, isdisplayonhome: true };
			this.productService.deletedisplayonehomeproduct(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_productData();
						this.router.navigate(['/displayonhome/view']);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

	open(content, data) {
		this.selectedProduct = data;
		if (this.selectedProduct) {
			var mylist = { id: this.selectedProduct._id };
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

	searchProduct() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_productData();
	}

	onListChangeLimit(event: any) {
		this.currentLimit = parseInt(event.target.value);
		this.get_productData();
		// this.getAllProducts();
	}

	toggelFilter() {
		if (this.isFilterActive) {
			this.isFilterActive = false;
		} else {
			this.isFilterActive = true;
		}
	}
	// changeStatus(){
	//   if(this.isactive != 'none'){
	//     this.config.switchColor.checked = '#ffffff';
	//     this.config.color.checked = 'green';
	//     this.config.labels.checked = 'Active';
	//   } else {
	//     if(this.isactive){
	//       this.isactive = false;
	//       this.config.switchColor.unchecked = 'crimson';
	//       this.config.color.unchecked = '#423f3f';
	//       this.config.labels.unchecked = 'Deactive';
	//     } else {
	//       this.isactive = true
	//     }
	//   }
	// }

	applyFilter() {
		this.filterArray = [];
		if (this._id) {
			this.filterArray.push({
				_id: this._id.trim()
			});
		}
		if (this.name) {
			this.filterArray.push({
				name: this.name.trim()
			});
		}
		if (this.product_type) {
			this.filterArray.push({
				product_type: this.product_type
			});
		}
		if (this.sku) {
			this.filterArray.push({
				sku: this.sku.trim()
			});
		}
		if (this.visibility) {
			this.filterArray.push({
				visibility: this.visibility
			});
		}
		if (this.status) {
			this.filterArray.push({
				status: this.status == 'true' ? true : false
			});
		}
		if (this.filter_price_to) {
			this.filterArray.push({
				sale_price: { $gte: this.filter_price_from, $lt: this.filter_price_to }
			});
		}
		if (this.filter_quantity_to) {
			this.filterArray.push({
				product_count: { $gte: this.filter_quantity_from, $lt: this.filter_quantity_to }
			});
		}
		this.get_productData();
	}

	clearFilter() {
		this._id = '';
		this.name = '';
		this.sku = '';
		this.product_type = '';
		this.status = '';
		this.visibility = '';
		this.filterArray = [];
		this.filter_price_to = 0;
		this.filter_price_from = 0;
		this.filter_quantity_to = 0;
		this.filter_quantity_from = 0;
		this.get_productData();
	}

	updateFilterInUsers() {
		if (this.user) {
			let obj = this.user;
			obj['filter'] = this.filterArray;
			obj['id'] = this.user._id;
			this.loginService.updateProfile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						console.log('Filter Updated to User');
					} else {
						console.log('Failed to Updated filters')
					}
				},
			);
		}
	}

	get_Disabled_Products() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.filterArray.push({
			home_product: false
		});
		if (this.filterArray && this.filterArray.length > 0) {
			obj['filterArray'] = this.filterArray
		}
		obj['isdisplayonhome'] = true;
		this.productService.getDisplayonHomeDisabledProducts(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.disbaledproductData = response.result;
						this.totaldisbaledRecord = response?.count;
						window.scroll(0, 0);
					}
					else {
						this.msg_danger = true;
						this.disbaledproductData = [];
					}

				}
			},
		);
	}

	onDisplayonHomeListChangePage() {

	}

	searchDisplayProduct() {
		if (this.searchText) {
			this.currentLimit = 100;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_Disabled_Products();
	}

	openDisplayonHome(displayonhome: any) {
		this.get_Disabled_Products();
		this.modalService.open(displayonhome, { ariaLabelledBy: 'modal-basic-title', windowClass: "displayonHomepopup", size: 'lg', backdrop: 'static' })
			.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
	}

	addDisplayonHomeProduct(prod, i) {
		if (prod) {
			var mylist = { id: prod._id, isdisplayonhome: true };
			this.productService.adddisplayonehomeproduct(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_Disabled_Products();
						this.get_productData();
						this.router.navigate(['/displayonhome/view']);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

	onAvailListChangePage(event: any) {
    this.currentPage = event;
    this.get_available_color_productData();
  }

  // Availabel Color Product Methods
  get_available_color_productData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      related_product: this.availableColorData,
      existedproduct: this.id
    };
    this.productService.getAvailableColorProductDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.availableProductsList = response.result;
            this.totalRecord = response?.count;
            window.scroll(0, 0);
          }
          else {
            this.msg_danger = true;
            this.availableProductsList = [];
          }
        }
      },
    );
  }

}
