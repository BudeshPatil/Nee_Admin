import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
import { WalletService } from 'src/app/providers/wallet/wallet.service';
import * as moment from 'moment';
import { CustomerService } from '../../../providers/customer/customer.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss']
})
export class AddWalletComponent {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;
	// Data Assign
	addPromoForm: FormGroup;
	throw_msg: any;
	submitted: boolean = false;
	msg_success: boolean = false;
	msg_danger: boolean = false;
	applyAction: any;
	id: any;
	isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  modalReference = null;
  closeResult = '';
	walletData:any;
	walletTransactions = [];
	currentPage: number = 1;
	currentLimit: number = 10;
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private walletservice: WalletService,
		private toastr: ToastrManager,
		private customerService: CustomerService,
    private modalService: NgbModal,
	) {

		this.addPromoForm = this.formBuilder.group({
			balance: ['', Validators.required]
		})
	}

	public hasError = (controlName: string, errorName: string) => {
		return this.addPromoForm.controls[controlName].hasError(errorName);
	}

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.isEdit) {
			// this.patchingdata(this.id);
			this.addData(this.id);
			this.applyAction = 'Update';
		}
		else {
			this.applyAction = 'Add';
		}
	}

	addData(id: any) {
		let obj = { _id: id };
		this.walletservice.getWalletById(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					let data = response?.result;
					this.walletData = data;
					if(this.walletData && this.walletData.transaction_Data){
						this.walletTransactions = this.walletData.transaction_Data;
					}
					this.addPromoForm.patchValue({
						balance: data?.balance
					})
				} else {

				}
			}
		)
	}

	onSubmit() {
		this.submitted = true;
		let obj = this.addPromoForm.value;
		let id = this.id;


		if (this.addPromoForm.invalid) {
			return;
		}

		if (!this.isEdit) {
			this.walletservice.addWallet(obj).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/wallet/view']);
						}, 2000);
					}
					else {
						this.throw_msg = response.message;
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);

		}
		else {
			this.walletservice.editWalletData(obj, id).subscribe(
				(response) => {
					if (response.code == 200) {
						this.throw_msg = response.message
						this.msg_success = true;
						this.toastr.successToastr(response.message);
						setTimeout(() => {
							this.router.navigate(['/wallet/view']);
						}, 2000);
					} else {
						this.throw_msg = response.message;
						this.msg_danger = true;
						this.toastr.errorToastr(response.message);
					}
				},
			);
		}

	}

  open(content) {
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

	onCancel() {
		this.router.navigate(['/wallet/view']);
	}
}
