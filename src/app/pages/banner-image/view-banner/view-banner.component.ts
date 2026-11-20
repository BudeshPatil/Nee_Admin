import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BannerService } from '../../../providers/banner/banner.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ModalDismissReasons, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-view-banner',
	templateUrl: './view-banner.component.html',
	styleUrls: ['./view-banner.component.scss']
})
export class ViewBannerComponent implements OnInit {


	BannerData: any[] = [];
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
	isLoading = true;
	loadError = false;
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
	selectedBanner: any;

	constructor(
		private toastr: ToastrManager,
		private bannerservice: BannerService,
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
	) {
		this.imagePath = environment.baseUrl + '/public/banner/';
		this.token = localStorage.getItem('token');
	}

	ngOnInit(): void {
		this.get_BannerData();
	}

	get_BannerData() {
		this.isLoading = true;
		this.loadError = false;
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			vendor_id: this.vendorid,
			token: this.token,
		};
		this.bannerservice.getBannerDetails(obj).subscribe({
			next: (response) => {
				this.isLoading = false;

				if (response.code === 200) {
					this.BannerData = Array.isArray(response.result) ? response.result : [];
					this.totalRecord = Number(response.count) || 0;
					return;
				}

				this.BannerData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr(response.message || 'Banner list could not be loaded.');
			},
			error: () => {
				this.isLoading = false;
				this.BannerData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr('Banner list could not be loaded.');
			}
		});
	}

	get filteredBannerData(): any[] {
		if (this.isLoading || this.loadError) {
			return [];
		}

		const banners = Array.isArray(this.BannerData) ? this.BannerData : [];
		const query = this.searchText.trim().toLowerCase();

		if (!query) {
			return banners;
		}

		return banners.filter((banner) =>
			String(banner.name || '').toLowerCase().includes(query)
		);
	}

	changeVendorList(event: any) {
		this.vendorid = event.currentTarget.value;
		this.get_BannerData();
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_BannerData();
	}

	selectFile(event: any): void {
		this.selectedFiles = event.target.files;
	}

	importBanner() {
		this.progress = 0;

		if (this.selectedFiles) {
			const file: File | null = this.selectedFiles.item(0);

			if (file) {
				this.currentFile = file;
				this.bannerservice.importallBanner(this.currentFile).subscribe(
					(response) => {
						if (response.code == 200) {
							console.log('file uploaded sucessfully');
							this.toastr.successToastr("banner Image Imported sucessfully");
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

	exportBanner() {
		if (confirm("Are you sure to Export this Banner")) {
			var obj = {};
			this.bannerservice.exportBanner(obj).subscribe(
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

	deleteAllBanners() {
		if (confirm("Are you sure to delete All Banners")) {
			var mylist = {};
			this.bannerservice.deleteallbanners(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_BannerData();
						this.toastr.successToastr(response.message);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}


	searchBanner() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_BannerData();
	}

	open(content, data) {
		this.selectedBanner = data;
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


	deleteBanner(): void {
		if (!this.selectedBanner || !this.selectedBanner._id) return;

		const payload = { id: this.selectedBanner._id };

		this.bannerservice.deletebanner(payload).subscribe({
			next: (response) => {
				if (response?.code === 200) {
					this.BannerData = this.BannerData.filter(
						banner => banner._id !== this.selectedBanner._id
					);
					this.totalRecord = Math.max(0, this.totalRecord - 1);
					if (this.BannerData.length === 0 && this.currentPage > 1) {
						this.currentPage -= 1;
					}

					this.get_BannerData();
					this.deleteMediaData();
					this.modalService.dismissAll();

					this.toastr.successToastr('Banner deleted successfully!', 'Success');

				}
			},
			error: (error) => {
				console.error('Delete banner error:', error);
				this.toastr.errorToastr('Banner deletion failed.', 'Error');
			}
		});
	}



	deleteMediaFile() {
		let obj = {};
		if (this.selectedBanner.media_data && this.selectedBanner.media_data.length > 0) {
			obj['file'] = this.selectedBanner.media_data[0].src;
			this.bannerservice.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
					}
					else {
						// this.bannerVideo = this.bannerVideo;
					}
				},
			);
		}
	}

	deleteMediaData() {
		if (this.selectedBanner.media_data && this.selectedBanner.media_data.length > 0) {
			var mylist = { id: this.selectedBanner.media_data[0]._id, file: this.selectedBanner.media_data[0].src };
			this.bannerservice.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

}
