import { Component, HostListener, OnInit } from '@angular/core';
import { PageService } from '../../../providers/page/page.service';

interface SeoPageRecord {
	_id?: string;
	page_name?: string;
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string;
}

@Component({
	selector: 'app-view-page',
	templateUrl: './view-page.component.html',
	styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
	pageData: SeoPageRecord[] = [];
	selectedPage: SeoPageRecord | null = null;
	isDeleteOpen = false;
	isLoading = false;
	isDeleting = false;
	loadError = false;
	actionError = '';

	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';

	constructor(private pageService: PageService) { }

	ngOnInit(): void {
		this.get_pageData();
	}

	get filteredPages(): SeoPageRecord[] {
		const query = this.searchText.trim().toLowerCase();
		return this.pageData.filter(page => {
			const searchable = [
				page.page_name,
				page.meta_title,
				page.meta_description,
				page.meta_keywords
			].filter(Boolean).join(' ').toLowerCase();
			return !query || searchable.includes(query);
		});
	}

	get displayedPages(): SeoPageRecord[] {
		const start = (this.currentPage - 1) * this.currentLimit;
		return this.filteredPages.slice(start, start + this.currentLimit);
	}

	get_pageData(): void {
		this.isLoading = true;
		this.loadError = false;
		this.actionError = '';
		this.pageData = [];
		this.pageService.getPageDetails({ limit: 1000, page: 1 }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (!response || response.code !== 200) {
					this.loadError = true;
					this.pageData = [];
					this.totalRecord = 0;
					return;
				}
				if (response.result == null || response.result === '') {
					this.pageData = [];
					this.totalRecord = 0;
					this.clampCurrentPage();
					return;
				}
				if (!Array.isArray(response.result)) {
					this.loadError = true;
					this.pageData = [];
					this.totalRecord = 0;
					return;
				}
				this.pageData = response.result;
				this.totalRecord = this.pageData.length;
				this.clampCurrentPage();
			},
			error: error => {
				console.error('Error loading SEO pages:', error);
				this.isLoading = false;
				this.loadError = true;
				this.pageData = [];
				this.totalRecord = 0;
			}
		});
	}

	onListChangePage(page: number): void {
		this.currentPage = page;
	}

	searchPage(): void {
		this.currentPage = 1;
	}

	openDeleteDialog(page: SeoPageRecord): void {
		this.selectedPage = page;
		this.actionError = '';
		this.isDeleteOpen = true;
	}

	closeDeleteDialog(): void {
		if (this.isDeleting) {
			return;
		}
		this.isDeleteOpen = false;
		this.selectedPage = null;
		this.actionError = '';
	}

	deletePage(): void {
		const id = this.selectedPage && this.selectedPage._id;
		if (!id || this.isDeleting) {
			return;
		}
		this.isDeleting = true;
		this.actionError = '';
		this.pageService.deletePage({ id }).subscribe({
			next: (response: any) => {
				this.isDeleting = false;
				if (response && response.code === 200) {
					this.isDeleteOpen = false;
					this.selectedPage = null;
					this.get_pageData();
				} else {
					this.actionError = 'This page could not be deleted. Please try again.';
					console.error('Unable to delete SEO page:', response && response.message);
				}
			},
			error: error => {
				console.error('Error deleting SEO page:', error);
				this.isDeleting = false;
				this.actionError = 'This page could not be deleted. Please try again.';
			}
		});
	}

	@HostListener('document:keydown.escape')
	onEscapeKey(): void {
		if (this.isDeleteOpen) {
			this.closeDeleteDialog();
		}
	}

	private clampCurrentPage(): void {
		const pageCount = Math.max(1, Math.ceil(this.filteredPages.length / this.currentLimit));
		this.currentPage = Math.min(this.currentPage, pageCount);
	}
}
