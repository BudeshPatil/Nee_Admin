import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'src/app/providers/company/company.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-company-view',
	templateUrl: './company-view.component.html',
	styleUrls: ['./company-view.component.scss']
})
export class CompanyViewComponent implements OnInit {
	companyData: any[] = [];
	imagePath = `${environment.baseUrl}/public/company/`;
	msg_danger = false;
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isactive: any = 'none';
	config = {
		value: true,
		name: '',
		disabled: false,
		height: 25,
		width: 90,
		margin: 3,
		fontSize: 10,
		speed: 300,
		color: { checked: '#36aef5', unchecked: '#423f3f' },
		switchColor: { checked: '#3366FF', unchecked: 'crimson' },
		labels: { unchecked: 'Deactive', checked: 'Active' },
		fontColor: { checked: '#fafafa', unchecked: '#ffffff' }
	};
	modalReference: any;
	closeResult = '';
	selectedCompany: any;

	constructor(
		private companyService: CompanyService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private toastr: ToastrManager,
		private router: Router
	) { }

	ngOnInit(): void {
		this.getCompanyData();
	}

	getCompanyData(): void {
		const obj = { limit: this.currentLimit, page: this.currentPage };
		this.companyService.getAll().subscribe((response: any) => {
			if (response?.result?.length) {
				this.companyData = response.result;
				this.totalRecord = response.count;
				this.msg_danger = false;
			} else {
				this.companyData = []; // Ensure old data is cleared
				this.msg_danger = true;
			}
		});
	}

	searchCompany(): void {
		this.currentLimit = this.searchText ? 1000 : 10;
		this.currentPage = 1;
		this.getCompanyData();
	}

	onListChangePage(page: number): void {
		this.currentPage = page;
		this.getCompanyData();
	}

	open(content: any, data: any): void {
		this.selectedCompany = data;
		this.modalReference = this.modalService.open(content);
		this.modalReference.result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) return 'by pressing ESC';
		if (reason === ModalDismissReasons.BACKDROP_CLICK) return 'by clicking on a backdrop';
		return `with: ${reason}`;
	}

	deleteCompany(): void {
		if (this.selectedCompany?._id) {
			this.companyService.delete(this.selectedCompany._id).subscribe((res: any) => {
				if (res?.code === 200) {
					this.toastr.successToastr('Deleted Successfully', 'Success');
					this.modalService.dismissAll();
					setTimeout(() => this.getCompanyData(), 300); // Ensure refresh happens after modal closes
				} else {
					this.toastr.errorToastr(res?.message || 'Deletion failed', 'Error');
				}
			});
		}
	}

	resetFilter(): void {
		this.isactive = 'none';
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.config.switchColor.unchecked = '#dcdcdc';
		this.config.color.unchecked = '#dcdcdc';
		this.config.labels.unchecked = 'Change';
	}
}
