import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { PaymentsService } from '../../../providers/payments/payments.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CollectionService } from 'src/app/providers/collection/collection.service';
import { CustomerService } from 'src/app/providers/customer/customer.service';
import { MediaService } from '../../../providers/media/media.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss']
})
export class AddPaymentComponent {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	paymentImage: any;
	imagePath: any;
	imageArr: any = [];

	// Data Assign
	costomerGroupData:any = [];
	dropdownSettings = {};
	artData: any;
	countryData: any;
	addpaymentForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

	// Edit Action Here
	applyAction: any;
	id: any;
	addmediaForm: FormGroup;
	mediaFile:any;
	fileFormat:any;
	imageData:any;
	submittedMedia: boolean =  false;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '200px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Enter text here...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [
			{ class: 'blog-descriptiondetail', name: 'Rajdhani sans-serif' },
		],
	}
	closeResult = '';
	url:any;
	countriesData:any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private paymentService: PaymentsService,
		private toastr: ToastrManager,
		public collectionService: CollectionService,
		public customerGroupService: CustomerService,
		private modalService: NgbModal,
		private mediaService: MediaService
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addpaymentForm = this.formBuilder.group({
			title: ['', Validators.required],
			order_status: ['', Validators.required],
			minimum_order_total: [''],
			maximum_order_total: [''],
			public_key: [''],
			secret_key: [''],
			applicable_countries: [''],
			customer_group: ['', Validators.required],
			image: [''],
			status: [true, Validators.required],
			url_key: ['', Validators.required],
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.url = environment.Url+'/assets';
		this.imagePath = environment.baseUrl + '/public/';
		this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
		this.addmediaForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required],
			sequence_number: [''],
			src: ['', Validators.required],
			format:[''],
			file_type:['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
			width: [''],
      mute:['muted'],
      autoplay:[true],
      loop:[true],
      full_screen: [''],
		});
		this.get_customerGroupData();
		// this.get_CountryData();
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addpaymentForm.controls[controlName].hasError(errorName);
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
		this.paymentService.getPaymentWithId(obj).subscribe(
			(response) => {
				if (response.code == 200 && response?.result.length > 0) {
					let data = response?.result[0];
					this.imageData = data?.media_data[0];
					if(data.country_data && data.country_data.length > 0){
						let tempData = [];
						this.costomerGroupData.forEach((item,index)=>{
							tempData.push({ _id: item._id, name: item.name });
						});
						this.costomerGroupData = tempData;
					}
					this.addpaymentForm.patchValue({
						title: data?.title,
						minimum_order_total: data?.minimum_order_total,
						maximum_order_total: data?.maximum_order_total,
						public_key: data?.public_key,
						secret_key: data?.secret_key,
						order_status: data?.order_status,
						status: data?.status,
						applicable_countries: data?.country_data,
						customer_group: data?.customer_groups_data,
						url_key:data?.url_key
					});
				} else {

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addpaymentForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['image'] = this.imageData;
		let customergroup_Data:any = [];
    if(this.addpaymentForm.value.customer_group && this.addpaymentForm.value.customer_group.length > 0){
      this.addpaymentForm.value.customer_group.forEach((group) => {
        customergroup_Data.push(group._id);
      });
    }
		let countries_Data:any = [];
		if(this.addpaymentForm.value.applicable_countries && this.addpaymentForm.value.applicable_countries.length > 0){
      this.addpaymentForm.value.applicable_countries.forEach((country) => {
        countries_Data.push(country._id);
      });
    }
		if (this.addpaymentForm.invalid) {
			return;
		}
		obj['customer_group'] = customergroup_Data;
		obj['applicable_countries'] = countries_Data;
		if (!this.isEdit) {
			this.paymentService.addPayment(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/payments/view']);
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
			this.paymentService.editPaymentdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/payments/view']);
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

	get f() {
    return this.addpaymentForm.controls;
  }

	get_customerGroupData() {
		const obj = {
			token: this.token,
		};
		this.customerGroupService.getAllCustomer_Group(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.costomerGroupData = response.result;
						if(this.costomerGroupData && this.costomerGroupData.length > 0){
							let tempData = [];
							this.costomerGroupData.forEach((item,index)=>{
								tempData.push({ _id: item._id, name: item.name });
							});
							this.costomerGroupData = tempData;
						}
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	// get_CountryData() {
	// 	const obj = {
	// 		token: this.token,
	// 	};
	// 	this.countryService.getallCountry(obj).subscribe(
	// 		(response) => {
	// 			if (response.code == 200) {
	// 				if (response.result != null && response.result != '') {
	// 					this.countriesData = response.result;
	// 					if(this.countriesData && this.countriesData.length > 0){
	// 						let tempData = [];
	// 						this.countriesData.forEach((item,index)=>{
	// 							tempData.push({ _id: item._id, name: item.name });
	// 						});
	// 						this.countriesData = tempData;
	// 					}
	// 				}
	// 				else {
	// 					this.msg_danger = true;
	// 				}

	// 			}
	// 		},
	// 	);
	// }

	onUploadOutputMedia(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/media/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.fileFormat = output.file.type
			this.mediaFile = output.file.response.result;
      this.addmediaForm.value.resolution = output.file.size;
      this.submittedMedia = false;
      this.addmediaForm.patchValue({
        src: this.mediaFile
      });
		}
	}

  onUploadVideo(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/media/addVideo',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {
			this.fileFormat = output.file.type
			this.mediaFile = output.file.response.result;
      this.submittedMedia = false;
      this.addmediaForm.patchValue({
        src: this.mediaFile
      });
		}
	}

	public hasMediaFormError = (controlName: string, errorName: string) => {
		return this.addmediaForm.controls[controlName].hasError(errorName);
	};

	selectImageRole(event,role){
    if(role == 'base'){
      this.addmediaForm.patchValue({
        height: 1100,
        width: 1100,
      });
    } else if(role == 'small'){
      this.addmediaForm.patchValue({
        height: 309,
        width: 309,
      });
    } else if(role == 'thumbnail'){
      this.addmediaForm.patchValue({
        height: 150,
        width: 150,
      });
    }
  }

  openMedia(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass",size: 'xl',  backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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


	onSubmitMedia(type) {
		let obj = this.addmediaForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['src'] = this.mediaFile;
		obj['format'] = this.fileFormat;
    this.submittedMedia = true;
		if (this.addmediaForm.invalid) {
			return;
		}
		this.mediaService.addMedia(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.submittedMedia = false;
          this.toastr.successToastr(response.message);
          this.imageData = response.result;
          this.mediaFile = '';
          this.addmediaForm = this.formBuilder.group({
            name: ['', Validators.required],
            status: [true, Validators.required],
            sequence_number: [''],
            src: ['', Validators.required],
            format:[''],
            file_type:['image'],
            alt: [''],
            role: [''],
            resolution: [''],
            size: [''],
            height: [''],
            width: [''],
            mute:['muted'],
            autoplay:[true],
            loop:[true],
            full_screen: [''],
          });
          this.modalService.dismissAll();
          
        }
        else {
          this.toastr.errorToastr(response.message);
        }
      },
    );
	}

  deleteMedia(){
    this.imageData = null;
  }
  
  onItemSelect(item: any) {
		console.log(item);
	}
	onSelectAll(items: any) {
		console.log(items);
	}

	selectCollection(data) {
		console.log(data);
	}
}
