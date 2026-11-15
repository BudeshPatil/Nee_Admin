import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutService } from '../../../providers/about/about.service';

@Component({
	selector: 'app-view-about',
	templateUrl: './view-about.component.html',
	styleUrls: ['./view-about.component.scss']
})
export class ViewAboutComponent implements OnInit, OnDestroy {
	aboutData: any[] = [];
	imagePath = environment.baseUrl + '/public/about/';
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isactive: 'all' | boolean = 'all';
	isLoading = false;
	loadError = false;
	isDeleting = false;
	selectedAbout: any = null;
	private searchTimer: ReturnType<typeof setTimeout> | null = null;
	private loadRequestId = 0;

	constructor(
		private aboutService: AboutService,
		private modalService: NgbModal,
		private toastr: ToastrManager
	) { }

	ngOnInit(): void {
		this.get_AboutData();
	}

	ngOnDestroy(): void {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
		}
	}

	get filteredAbout(): any[] {
		const query = this.searchText.trim().toLowerCase();
		return this.aboutData.filter(item => {
			const searchable = `${item.title_sign || ''} ${item.title_name || ''} ${item.desc_short || ''} ${item.page_section || ''}`.toLowerCase();
			return (!query || searchable.includes(query)) &&
				(this.isactive === 'all' || this.isAboutActive(item) === this.isactive);
		});
	}

	get hasFilters(): boolean {
		return !!this.searchText.trim() || this.isactive !== 'all';
	}

	isAboutActive(item: any): boolean {
		return item.status === true || item.status === 1 || item.status === 'true' || item.status === '1' || item.status === 'active';
	}

	get_AboutData(): void {
		const requestId = ++this.loadRequestId;
		this.isLoading = true;
		this.loadError = false;
		this.aboutService.getaboutDetails({
			limit: this.currentLimit,
			page: this.currentPage
		}).subscribe({
			next: (response: any) => {
				if (requestId !== this.loadRequestId) {
					return;
				}
				this.isLoading = false;
				if (response.code !== 200 || (!Array.isArray(response.result) && response.result != null && response.result !== '')) {
					this.loadError = true;
					this.aboutData = [];
					this.totalRecord = 0;
					return;
				}
				this.aboutData = Array.isArray(response.result) ? response.result : [];
				this.totalRecord = Number(response.count) || this.aboutData.length;
			},
			error: error => {
				if (requestId !== this.loadRequestId) {
					return;
				}
				console.error('Error loading About sections:', error);
				this.isLoading = false;
				this.loadError = true;
				this.aboutData = [];
				this.totalRecord = 0;
			}
		});
	}

	onListChangePage(page: number): void {
		this.currentPage = page;
		this.get_AboutData();
	}

	searchAbout(): void {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
		}
		this.currentPage = 1;
		this.currentLimit = this.hasFilters ? 1000 : 10;
		this.searchTimer = setTimeout(() => this.get_AboutData(), 250);
	}

	clearFilters(): void {
		this.searchText = '';
		this.isactive = 'all';
		this.searchAbout();
	}

	openDeleteModal(content: any, item: any): void {
		this.selectedAbout = item;
		this.modalService.open(content, {
			ariaLabelledBy: 'about-delete-title',
			centered: true,
			size: 'sm'
		}).result.then(
			() => this.selectedAbout = null,
			() => this.selectedAbout = null
		);
	}

	deleteAbout(): void {
		if (!this.selectedAbout || this.isDeleting) {
			return;
		}

		this.isDeleting = true;
		this.aboutService.getAboutDelete({ id: this.selectedAbout._id }).subscribe({
			next: (response: any) => {
				this.isDeleting = false;
				if (response.code !== 200) {
					this.toastr.errorToastr(response.message || 'Unable to delete this section.');
					return;
				}
				this.modalService.dismissAll();
				this.toastr.successToastr(response.message || 'Section deleted successfully.');
				this.totalRecord = Math.max(0, this.totalRecord - 1);
				if (this.currentPage > 1 && (this.currentPage - 1) * this.currentLimit >= this.totalRecord) {
					this.currentPage--;
				}
				this.get_AboutData();
			},
			error: error => {
				this.isDeleting = false;
				console.error('Error deleting About section:', error);
				this.toastr.errorToastr(error?.error?.message || 'Unable to delete this section. Please try again.');
			}
		});
	}

	onImageError(event: Event): void {
		const image = event.target as HTMLImageElement;
		image.onerror = null;
		image.src = 'assets/img/placeholder.webp';
	}
}
