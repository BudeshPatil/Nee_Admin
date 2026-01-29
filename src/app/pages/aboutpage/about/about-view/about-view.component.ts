import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { from } from 'rxjs';

import { ToastrManager } from 'ng6-toastr-notifications';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutService } from 'src/app/providers/about/about.service';

@Component({
	selector: 'app-about-view',
	templateUrl: './about-view.component.html',
	styleUrls: ['./about-view.component.scss']
})
export class AboutViewComponent implements OnInit {

	msg_danger: boolean = false;
	AboutData: any;
	imagePath: any;
	token: any;


	isactive: any;
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedFiles?: FileList;
	currentFile?: File;
	progress = 0;
	message = '';
	searchText = '';
	closeResult = '';
	modalReference = null;
	selectedAbout: any;
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

	constructor(
		private router: Router,
		// private loginService: LoginService,
		private toastr: ToastrManager,
		private aboutservice: AboutService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/about/';
		this.token = localStorage.getItem('token');
	}

	ngOnInit(): void {
		this.get_AboutData();
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.isactive = 'none';
	}

	get_AboutData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,

			token: this.token,
		};
		this.aboutservice.getaboutDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.AboutData = response.result.filter(data => data.page_section === 'about');
						this.totalRecord = response?.count;
						// console.log(this.AboutData); page_section
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_AboutData();
	}

	selectFile(event: any): void {
		this.selectedFiles = event.target.files;
	}



	searchAbout() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_AboutData();
	}

	open(content, data) {
		this.selectedAbout = data;
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

	closeModal() {
		this.activeModal.close();
	}


	deleteAbout() {
		if (this.selectedAbout) {
			var mylist = { id: this.selectedAbout._id };
			this.aboutservice.getAboutDelete(mylist).subscribe(
				(response) => {
					if (response.code == 200) {

						this.get_AboutData();
						this.router.navigate(['/About/view']);
						window.location.reload();
						this.toastr.successToastr("About Deleted")
					}
				},
			);
		}
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
				this.isactive = true;

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

	// 	deleteMediaData() {
	// 	if (this.selectedAbout.media_data && this.selectedAbout.media_data.length > 0) {
	// 		var mylist = { id: this.selectedAbout.media_data[0]._id, file: this.selectedAbout.media_data[0].src };
	// 		this.bannerservice.deleteMediaData(mylist).subscribe(
	// 			(response) => {
	// 				if (response.code == 200) {
	// 					this.modalService.dismissAll();
	// 				}
	// 			},
	// 		);
	// 	}
	// }

}
