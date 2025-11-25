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

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent {
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
  allusers:any = [];
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 1000;
  totalRecord: number  = 0;
  products:any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private cartservice:CartService,
    private toastr: ToastrManager,
    public productService: ProductService,
    public loginService : LoginService,
    public customerService: CustomerService
  )
  { 
    this.addCartForm = this.formBuilder.group({
      product_id: ['',Validators.required],
      customer: ['',Validators.required],
      qty: ['',Validators.required],
      price: ['',Validators.required],
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
    this.getallcustomers();
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
            product_id: data?.product,
            customer: data?.customer,
            qty: data?.qty,
            price: data?.price,
          });
       }else{
          
        }
      },
    );
  
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addCartForm.value;
    let id  = this.id;
    if (this.addCartForm.invalid){
      return;
    }
    obj['token'] = this.token;
    obj['productid'] = this.products;
    if (!this.isEdit)
    {
      this.cartservice.addCart(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/cart/view']);
            },2000);
          }
          else if(response.code == 400)
          {   
            this.toastr.errorToastr(response.message);
          } 
        },
      );
    }else{

      this.cartservice.editcartdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/cart/view']);
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

  getallcustomers() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
		this.customerService.getAllCustomers(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.allusers = response.result;
					}
					else {
					}
				}
			},
		);
	}

  selectProduct(productId){
    this.products.push(productId)
  }

  onCancel(){
    this.router.navigate(['/cart/view']);
  }
}
