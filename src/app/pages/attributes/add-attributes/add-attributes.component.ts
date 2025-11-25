import { Component,ChangeDetectorRef, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from 'src/environments/environment';
import { AttributesService } from 'src/app/providers/attributes/attributes.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDrag,
  CdkDrop,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-attributes',
  templateUrl: './add-attributes.component.html',
  styleUrls: ['./add-attributes.component.scss']
})
export class AddAttributesComponent {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

	// File Upload
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
	attributeImage: any;
	imagePath: any;
	imageArr: any = [];
	// Data Assign

	artData: any;
	countryData: any;
	addattributeForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	token: any;

	// Edit Action Here
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
	manageOptionForm: FormGroup;
	public form: FormGroup;
  public optionList: FormArray;

  // returns all form groups under options
  get optionFormGroup() {
    return this.manageOptionForm.get('options') as FormArray;
  }
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private attributeService: AttributesService,
		private toastr: ToastrManager,
		private cdr: ChangeDetectorRef
	) {
		this.uploadInput = new EventEmitter<UploadInput>();
		this.addattributeForm = this.formBuilder.group({
			label: ['', Validators.required],
			name: ['', Validators.required],
			status: [true, Validators.required],
			input_type: ['text', Validators.required],
			isRequired: [false, Validators.required],
			isfilteroption: [false, Validators.required],
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
	
		this.manageOptionForm = this.formBuilder.group({
			options: this.formBuilder.array([this.createoption()])
		});
		// set optionlist to this field
		this.optionList = this.manageOptionForm.get('options') as FormArray;
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addattributeForm.controls[controlName].hasError(errorName);
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
		this.attributeService.getAttributeWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.addattributeForm.patchValue({
						name: data?.name,
						status: data?.status,
						input_type: data?.input_type,
						isRequired: data?.isRequired,
						isfilteroption: data?.isfilteroption,
						label:data?.label,
					});
					this.removeoption(0);
					if(data?.manager_option && data?.manager_option.length > 0){
						data?.manager_option.forEach((op)=> {
							this.addmanageoption(op);
						});
					}
				} else {

				}
			},
		);
	}
	// add a option form group
  addmanageoption(opdata) {
    this.optionList.push(this.createmanageoption(opdata));
  }

	// option formgroup
  createmanageoption(opdata): FormGroup {
    return this.formBuilder.group({
      name: [opdata.name, Validators.compose([Validators.required])], // i.e Name,
			code: [opdata.code, Validators.compose([Validators.required])], // i.e Code,
      isDefault: [opdata.isDefault, Validators.compose([Validators.required])], // i.e. isDefault
    });
  }

  

	onSubmit() {
		this.submitted = true;
		let obj = this.addattributeForm.value;
		let id = this.id;
		obj['token'] = this.token;
		obj['manager_option'] = this.manageOptionForm.value.options;
		if (this.addattributeForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.attributeService.addAttribute(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/attribute/view-attribute']);
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
			this.attributeService.editAttributedata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/attribute/view-attribute']);
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

	onCancel(){
		this.router.navigate(['/attribute/view-attribute'])
	}


	// option formgroup
  createoption(): FormGroup {
    return this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])], // i.e Name,
			code: [null, Validators.compose([Validators.required])], // i.e Code,
      isDefault: [false, Validators.compose([Validators.required])], // i.e. isDefault
    });
  }

  // add a option form group
  addoption() {
    this.optionList.push(this.createoption());
  }

  // remove option from group
  removeoption(index) {
    // this.optionList = this.form.get('options') as FormArray;
    this.optionList.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index) {
    let validators = null;

    if (this.getoptionsFormGroup(index).controls['name'].value === 'email') {
      validators = Validators.compose([Validators.required, Validators.email]);
    } else {
      validators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
      ]);
    }

    this.getoptionsFormGroup(index).controls['value'].setValidators(
      validators
    );

    this.getoptionsFormGroup(index).controls['value'].updateValueAndValidity();
  }

  // get the formgroup under options form array
  getoptionsFormGroup(index): FormGroup {
    // this.optionList = this.form.get('options') as FormArray;
    const formGroup = this.optionList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.manageOptionForm.value);
  }
}
