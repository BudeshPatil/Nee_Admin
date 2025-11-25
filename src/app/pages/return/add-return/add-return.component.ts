import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { ReturnService } from '../../../providers/return/return.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { OrderService } from 'src/app/providers/order/order.service';

@Component({
  selector: 'app-add-return',
  templateUrl: './add-return.component.html',
  styleUrls: ['./add-return.component.scss']
})
export class AddReturnComponent {
  returnImage: any;
	imagePath: any;
	imageArr: any = [];

	// Data Assign

	artData: any;
	countryData: any;
	addreturnForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	reasonData: any = [];
	orderData : any = [];
	seletedOrder :any = [];
	returnData: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private returnService: ReturnService,
		private toastr: ToastrManager,
		private orderService : OrderService
	) {
		this.addreturnForm = this.formBuilder.group({
			order_id: ['', Validators.required],
			customer: [''],
			product: ['',Validators.required],
			return_status: ['', Validators.required],
			return_reason: ['', Validators.required],
			return_quantity: ['', Validators.required],
			return_comments: ['', Validators.required],
			resolution: ['', Validators.required],
			status: [true,Validators.required]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.get_ReasonData();
		this.get_orderData();
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addreturnForm.controls[controlName].hasError(errorName);
	};

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			this.patchingdata(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
	}
	patchingdata(id: any) {
		let obj = { id: id };
		this.returnService.getReturnWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.returnImage = data?.image;
					this.returnData = response?.result;
					// this.get_orderData();
					this.addreturnForm.patchValue({
						order_id: data?.order_id,
						customer: data?.customer,
						product: data?.product,
						return_status: data?.return_status,
						return_reason: data?.return_reason,
						return_quantity: data?.return_quantity,
						return_comments: data?.return_comments,
						resolution: data?.resolution,
						status:data?.status
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addreturnForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['customer'] = this.seletedOrder.customer;
		if (this.addreturnForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.returnService.addReturn(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/return/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
		else {
			this.returnService.editReturndata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/return/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}
	}

	get_ReasonData() {
		const obj = {	};
		this.returnService.getallReasonDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.reasonData = response.result;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	get_orderData()
  {
    const obj = {   };
    this.orderService.getallOrders(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.orderData = response.result; 
							if(this.returnData && this.returnData.order_id){
								let tempdate = this.orderData.filter((item)=> item._id == this.returnData.order_id);
								if(tempdate){
									this.seletedOrder = tempdate[0];
								}
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

	selectOrder(event,seletedOrder){
		if(seletedOrder){
			let tempdate = this.orderData.filter((item)=> item._id == seletedOrder);
			if(tempdate){
				this.seletedOrder = tempdate[0];
			}
		}
    
  }
}
