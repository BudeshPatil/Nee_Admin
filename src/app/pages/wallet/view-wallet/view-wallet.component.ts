import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { from } from 'rxjs';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { WalletService } from 'src/app/providers/wallet/wallet.service';

@Component({
  selector: 'app-view-wallet',
  templateUrl: './view-wallet.component.html',
  styleUrls: ['./view-wallet.component.scss']
})
export class ViewWalletComponent {
  msg_danger: boolean = false;
	authorData: any;

	promoData: any;

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
	isactive: any;
	selectedPromo:any;
	modalReference = null;
  closeResult = '';
	constructor(
		private router: Router,
		private walletservice: WalletService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {

		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.isactive = 'none';
	}

	ngOnInit(): void {
		// this.get_authorData();
		this.get_walletData();
	}
	get_walletData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.walletservice.getAllWallet(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.promoData = response.result;
						this.totalRecord = response?.count;
					} else {
						this.msg_danger = true;
					}
				}
			}
		)
	}

	deleteWallet() {
		if (this.selectedPromo) {
			var mylist = { _id: this.selectedPromo._id };
			this.walletservice.deleteWallet(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_walletData();
						this.router.navigate(['/wallet/view']);
						this.modalService.dismissAll();
					}
				}
			)

		}
	}

	open(content,data) {
    this.selectedPromo = data;
		if (this.selectedPromo) {
		var mylist = { id: this.selectedPromo._id };
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

	searchWallet() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_walletData();
	}

	changeStatus() {
		if (this.isactive != 'none') {
			this.config.switchColor.checked = '#ffffff';
			this.config.color.checked = 'green';
			this.config.labels.checked = 'Active';
		} else {
			if (this.isactive) {
				this.isactive = false;
				this.config.switchColor.unchecked = 'crimson';
				this.config.color.unchecked = '#423f3f';
				this.config.labels.unchecked = 'Deactive';
			} else {
				this.isactive = true
			}
		}
	}

	resetFilter() {
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.config.switchColor.unchecked = '#dcdcdc';
		this.config.color.unchecked = '#dcdcdc';
		this.config.labels.unchecked = 'Change';
		this.isactive = 'none';
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_walletData();
	}
}
