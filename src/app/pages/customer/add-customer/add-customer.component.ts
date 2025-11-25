import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';
// Services
import { CustomerService } from '../../../providers/customer/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	customerIcon: any;
	imagePath: any;
	imageArr: any = [];

	// Data Assign

	artData: any;
	countryData: any;
  addcustomerForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

	// Edit Action Here
	applyAction: any;
	id: any;
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
	customerGroups:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private customerService: CustomerService

	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addcustomerForm = this.formBuilder.group({
			username: ['',Validators.required],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [''],
			confirm_password: [''],
      mobile: ['',Validators.required],
      status: [true, Validators.required],
			role: ['',Validators.required],
			customer_group:['']
		});
		this.token = localStorage.getItem('token');
		this.imagePath = environment.baseUrl + '/public/';
	}

	public hasError = (controlName: string, errorName: string) => { 
    return this.addcustomerForm.controls[controlName].hasError(errorName);
  };

  public hasEmailError = (controlName: string, errorName: string) => {
    if (this.addcustomerForm.controls['email'].value == "") {
      return "Email is required";
    } else if (this.addcustomerForm.controls['email'].status == "INVALID") {
      return "Invalid Email";
    } else {
      return this.addcustomerForm.controls['email'].hasError(errorName);
    }

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
		this.getCustomerGroupsData();
	}

	patchingdata(id: any) {
		let obj = { id: id };
		this.customerService.getCustomerWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.customerIcon = data?.icon;
					this.addcustomerForm.patchValue({
						username: data?.username,
						firstname: data?.firstname,
						lastname: data?.lastname,
						email: data?.email,
						mobile: data?.mobile,
						role: data?.role,
						customer_group: data?.customer_group,
						status: data?.status,
					});
				} else {

				}
			},
		);
	}



	onSubmit() {
		this.submitted = true;
		let obj = this.addcustomerForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['icon'] = this.customerIcon;
		if (this.addcustomerForm.invalid) {
			this.msg_danger = true;
			this.throw_msg = "Please check the required Field";
			setTimeout(() => {
				this.msg_danger = false;
			}, 2000);
			return;
		}
		if (this.addcustomerForm.value.password != this.addcustomerForm.value.confirm_password) {
			this.msg_danger = true;
			this.throw_msg = "Passwords Miss matching";
			setTimeout(() => {
				this.msg_danger = false;
			}, 3000);
			return;
		}
		if (!this.isEdit) {
			this.customerService.addCustomer(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/customer/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message
						this.msg_danger = true;
					}
				},
			);
		}
		else {
			this.customerService.editCustomerdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/customer/view']);
						}, 2000);
					}
				},
			);
		}
	}

	onUploadOutput(output: UploadOutput, typeofImage): void {
		if (output.type === 'allAddedToQueue') {
			const event: UploadInput = {
				type: 'uploadAll',
				url: environment.baseUrl + '/api/customer/addimage',
				method: 'POST',
				data: {},
			};
			this.uploadInput.emit(event);
		}
		else if (output.type === 'done' && typeof output.file !== 'undefined') {

			if (typeofImage == 'icon') {
				this.customerIcon = output.file.response.result;
			} 
		}
	}

	getCustomerGroupsData(){
    let obj = {};
    this.customerService.getAllCustomer_Group(obj).subscribe(
      (response) => { 
        if (response.code == 200) {
          this.customerGroups = response?.result;
        } else{
					this.customerGroups = [];
          }
      });
  }
}
