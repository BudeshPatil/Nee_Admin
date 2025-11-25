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
  selector: 'app-attributeset-add',
  templateUrl: './attributeset-add.component.html',
  styleUrls: ['./attributeset-add.component.scss']
})
export class AttributesetAddComponent {
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

	items = ['Zero', 'One', 'Two', 'Three'];

  items2 = ['Zero', 'One', 'Two', 'Three'];
  items3 = [];
	attribute: any = [];
	attributeData:any = [];
	selectedAttribute:any = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private attributeService: AttributesService,
		private toastr: ToastrManager,
		private cdr: ChangeDetectorRef
	) {
		this.addattributeForm = this.formBuilder.group({
			name: ['', Validators.required],
			status: [true, Validators.required]
		});
		this.token = localStorage.getItem('ghoastrental-token');
		this.imagePath = environment.baseUrl + '/public/';
		this.getAllAttributesData();
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
		this.attributeService.getAttributeSetWithId(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					if(data.attribute && data.attribute.length > 0){
						data.attribute.forEach((item,index)=>{
							this.selectedAttribute.push({ _id: item.attribute_id, name: item.attribute_name });
						});
					}
					if(this.selectedAttribute && this.selectedAttribute.length > 0){
						if(this.attribute && this.attribute.length > 0){
							let tempAttribute = [];
							this.attribute.forEach((attr,index)=> {
								let tempdata =	this.selectedAttribute.filter((item)=>item._id == attr._id);
								if(tempdata && tempdata.length == 0){
									tempAttribute.push(attr);
								}
							});
							this.attribute = tempAttribute;
						}
					}
					this.addattributeForm.patchValue({
						name: data?.name,
						status: data?.status
					});
				} else {

				}
			},
		);
	}

	
	getAllAttributesData() {
		const obj = {
			token: this.token,
		};
		this.attributeService.getallAttributeDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.attribute = response.result;
						if(this.attribute && this.attribute.length > 0){
							let tempData = [];
							this.attribute.forEach((item,index)=>{
								tempData.push({ _id: item._id, name: item.name });
							});
							this.attributeData = tempData;
						}
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addattributeForm.value;
		let id = this.id;
		obj['token'] = this.token;
		if(this.selectedAttribute && this.selectedAttribute.length > 0){
			let tempData = [];
			this.selectedAttribute.forEach((item,index)=>{
				tempData.push({ attribute_id: item._id, attribute_name: item.name });
			});
			obj['attribute'] = tempData;
		}
		if (this.addattributeForm.invalid) {
			return;
		}
		if (!this.isEdit) {
			this.attributeService.addAttributeSet(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.toastr.successToastr(response.message);
						this.throw_msg = response.message
						this.msg_success = true;
						setTimeout(() => {
							this.router.navigate(['/attribute/view']);
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
			this.attributeService.editAttributeSetdata(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/attribute/view']);
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
    this.router.navigate(['/attribute/view']);
  }

	onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }

  isAllowed = (drag?: CdkDrag, drop?: CdkDrop) => {
    return false;
  };

  addToList(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
