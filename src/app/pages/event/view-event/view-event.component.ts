import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { from } from 'rxjs';

import { ToastrManager } from 'ng6-toastr-notifications';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaService } from '../../../providers/media/media.service';
import { EventService } from 'src/app/providers/event/event.service';

@Component({
	selector: 'app-view-event',
	templateUrl: './view-event.component.html',
	styleUrls: ['./view-event.component.scss']
})
export class ViewEventComponent {

	msg_danger: boolean = false;
	EventData: any = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
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
	modalReference: any;
	selectedEvent: any;
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

		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private mediaService: MediaService,
		private eventservice: EventService
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('ghoastrental-token');
	}

	ngOnInit(): void {
		this.get_EventData();
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.isactive = 'none';
	}

	get_EventData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			vendor_id: this.vendorid,
			token: this.token,
		};
		this.eventservice.getEventDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.EventData = response.result;
						this.totalRecord = response?.count;
						console.log('get done');

					}
					else {
						this.msg_danger = true;
						this.EventData = [];
						console.log('get failed');
					}

				}
			},
		);
	}

	changeVendorList(event: any) {
		this.vendorid = event.currentTarget.value;
		this.get_EventData();
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_EventData();
	}

	selectFile(event: any): void {
		this.selectedFiles = event.target.files;
	}

	importEvent() {
		this.progress = 0;

		if (this.selectedFiles) {
			const file: File | null = this.selectedFiles.item(0);

			if (file) {
				this.currentFile = file;
				this.eventservice.importallEvent(this.currentFile).subscribe(
					(response) => {
						if (response.code == 200) {
							console.log('file uploaded sucessfully');
							this.toastr.successToastr("event Image Imported sucessfully");
							setTimeout(() => {
								window.location.reload();
							}, 2000);
							this.selectedFiles;

						} else {
							this.toastr.errorToastr(response.message);
						}
					},
				);
			}
		}
	}

	exportEvent() {
		if (confirm("Are you sure to Export this event")) {
			var obj = {};
			this.eventservice.exportEvent(obj).subscribe(
				(response) => {
					if (response) {
						if (response.filepath) {
							window.location.href = response.filepath;
						}
					}
				},
			);
		}
	}

	deleteAllEvents() {
		if (confirm("Are you sure to delete All Events")) {
			var mylist = {};
			this.eventservice.deleteallevents(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_EventData();
						this.toastr.successToastr(response.message);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}


	searchEvent() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_EventData();
	}

	open(content: any, data: any) {
		this.selectedEvent = data;
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


	deleteEvent() {
		if (this.selectedEvent) {
			var mylist =
			{
				id: this.selectedEvent._id,
				token: this.token
			};
			this.eventservice.deleteevent(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_EventData();
						this.deleteMediaData();
						this.modalService.dismissAll();
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

	deleteMediaFile() {
		let obj: any = {};
		if (this.selectedEvent.media_data && this.selectedEvent.media_data.length > 0) {
			obj['file'] = this.selectedEvent.media_data[0].src;
			this.eventservice.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
					}
					else {
						// this.eventVideo = this.eventVideo;
					}
				},
			);
		}
	}

	deleteMediaData() {
		if (this.selectedEvent.media_data && this.selectedEvent.media_data.length > 0) {
			var mylist = { id: this.selectedEvent.media_data[0]._id, file: this.selectedEvent.media_data[0].src };
			this.eventservice.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

}
