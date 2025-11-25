import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import { CartService } from '../../../providers/cart/cart.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ProductService } from '../../../providers/product/product.service';
import { LoginService } from '../../../providers/auth/login.service';
import { CustomerService } from 'src/app/providers/customer/customer.service';
import { OrderService } from 'src/app/providers/order/order.service';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  addCartForm:FormGroup;
  throw_msg:any; 
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;

  applyAction: any;
  id:any;
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  // File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
  selectedFile:any;
	document:any;
  imagePath:any;
  allproducts:any = [];
  token:any;
  allcustomers:any = [];
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 1000;
  totalRecord: number  = 0;
  OrderData: any;
  // Order Totals

  subtotal:any = 0;
  shippingCharge:any;
  total:any;
  ShowOrderStatus: boolean = false;
  searchText = '';
  selectedCustomer:any;
  selectedProducts:any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cartservice:CartService,
    private toastr: ToastrManager,
    public productService: ProductService,
    public customerService : CustomerService,
    private orderService: OrderService
  )
  { 
    this.addCartForm = this.formBuilder.group({
      product_id: [''],
      customer: [''],
      qty: [''],
      price: [''],
      firstname : [''],
      lastname : [''],
      email : [''],
      mobile : [''],
      house_num : [''],
      town_name : [''],
      country : ['']
     });
     this.uploadInput = new EventEmitter<UploadInput>();
     this.token = localStorage.getItem('ghoastrental-token');
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addCartForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imagePath = environment.baseUrl + '/public/';
    this.getallProducts();
    this.getallUsers();
    if (this.isEdit) 
    {
      this.patchingdata(this.id);
      this.applyAction = 'Update';
    }
    else
    {
      this.applyAction = 'Add';
    }
  }

  patchingdata(id:any) { 
    let obj = {id:id};
    this.cartservice.getCartWithId(obj).subscribe(
      (response) => { 
        if (response.code == 200) {
          let data = response?.result;
           this.addCartForm.patchValue({
            product: data?.product,
            customer: data?.customer
          });
       }else{
          
        }
      },
    );
  
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addCartForm.value;
    if(!this.selectedCustomer){
      return;
    }
    if(this.selectedProducts && this.selectedProducts.length > 0){
      this.selectedProducts = this.selectedProducts.map((product)=> {
        let prodobj = {};
        if(product){
          prodobj['product_id'] = product._id;
          prodobj['qty'] = product.qty;
          prodobj['price'] = this.total;
          return prodobj;
        }
      })
    }
    // obj['firstname']  = this.selectedCustomer.firstname;
    // obj['lastname'] = this.selectedCustomer.lastname;
    // obj['email']  = this.selectedCustomer.email;
    // obj['mobile'] = this.selectedCustomer.mobile;
    // obj['house_num']  = this.selectedCustomer.address[0].address1;
    // obj['town_name'] = this.selectedCustomer.address[0].city;
    // obj['country'] = this.selectedCustomer.address[0].country;
    obj['customer'] = this.selectedCustomer._id;
    obj['order_quantity'] = 1;
    obj['product']  = this.selectedProducts;
    obj['token'] = this.token;
    obj['order_amount'] = this.total;
    obj['order_value'] = this.total;
    if (!this.isEdit)
    {
      this.orderService.addOrder(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/order/view']);
            },2000);
          }
          else if(response.code == 400)
          {   
            this.toastr.errorToastr(response.message);
          } 
        },
      );
    } else{
      this.orderService.editorderdata(obj,this.id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/order/view']);
            },2000);  
          } else {
            this.toastr.errorToastr(response.message);
          } 
        },
      );

    }
  }

  getallProducts() {
		this.productService.getallProducts({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.allproducts = response.result;
					}
					else {
					}
				}
			},
		);
	}

  getallUsers() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
		this.customerService.getAllCustomers(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.allcustomers = response.result;
					}
					else {
					}
				}
			},
		);
	}

  selectCustomer(id){
    if(this.allcustomers && this.allcustomers.length > 0){
      let tempcustomer = this.allcustomers.filter((cust)=>cust._id == id);
      if(tempcustomer && tempcustomer.length > 0){
        this.selectedCustomer = tempcustomer[0];
      }
    }    
  }

  selectProduct(id){
    if(this.allproducts && this.allproducts.length > 0){
      let final_total = 0;
      let temp_product = this.allproducts.filter((prod)=>prod._id == id);
      if(temp_product && temp_product.length > 0){
        if(this.selectedProducts && this.selectedProducts.length > 0){
          let existedProd = this.selectedProducts.filter((prod)=>prod._id == id);
          if(existedProd && existedProd.length > 0){
            this.selectedProducts = this.selectedProducts.map((prod)=>{
              if(prod._id == id){
                prod['qty'] = 1 + prod.qty;
                prod.sale_price = prod.sale_price + temp_product[0].sale_price;
                this.subtotal += 1 * parseInt(temp_product[0].sale_price);
                this.shippingCharge = 10;
                this.total = Number(parseInt(this.subtotal) + parseInt(this.shippingCharge));
              }
              return prod;
            });
          } else {
            this.subtotal += 1 * parseInt(temp_product[0].sale_price);
            this.shippingCharge = 10;
            this.total = Number(parseInt(this.subtotal) + parseInt(this.shippingCharge));
            temp_product[0]['qty'] = 1 ;
            this.selectedProducts.push(temp_product[0]);
          }
        } else {
          this.subtotal += 1 * parseInt(temp_product[0].sale_price);
          this.shippingCharge = 10;
          this.total = Number(parseInt(this.subtotal) + parseInt(this.shippingCharge));
          temp_product[0]['qty'] = 1 ;
          this.selectedProducts.push(temp_product[0]);
        }        
      }
    }    
  }

  onCancel(){
    this.router.navigate(['/order/view']);
  }

  removeProduct(index){
    this.selectedProducts.splice(index,1);
  }
}
