import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ServiceService } from '../../../providers/service/service.service';

@Component({
	selector: 'app-view-service',
	templateUrl: './view-service.component.html',
	styleUrls: ['./view-service.component.scss']
})
export class ViewServiceComponent implements OnInit {
	imagePath = environment.baseUrl + '/public/service/';
	serviceData: any[] = [];
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isactive: 'all' | boolean = 'all';
	isLoading = false;
	loadError = false;
	private searchTimer: ReturnType<typeof setTimeout> | null = null;
	private loadRequestId = 0;

	constructor(private serviceservice: ServiceService) { }

	ngOnInit(): void {
		this.get_serviceData();
	}

	get filteredServices(): any[] {
		const query = this.searchText.trim().toLowerCase();
		return this.serviceData.filter(service => {
			const searchable = `${service.name || ''} ${service.short_desc || ''}`.toLowerCase();
			return (!query || searchable.includes(query)) &&
				(this.isactive === 'all' || this.isServiceActive(service) === this.isactive);
		});
	}

	get hasFilters(): boolean {
		return !!this.searchText.trim() || this.isactive !== 'all';
	}

	isServiceActive(service: any): boolean {
		return service.status === true || service.status === 1 || service.status === 'true' || service.status === '1';
	}

	get_serviceData(): void {
		const requestId = ++this.loadRequestId;
		this.isLoading = true;
		this.loadError = false;
		this.serviceservice.getAllServices({
			limit: this.currentLimit,
			page: this.currentPage
		}).subscribe({
			next: response => {
				if (requestId !== this.loadRequestId) {
					return;
				}
				this.isLoading = false;
				if (response.code !== 200 || (!Array.isArray(response.result) && response.result != null && response.result !== '')) {
					this.serviceData = [];
					this.totalRecord = 0;
					this.loadError = true;
					return;
				}
				this.serviceData = Array.isArray(response.result) ? response.result : [];
				this.totalRecord = Number(response.count) || this.serviceData.length;
			},
			error: error => {
				if (requestId !== this.loadRequestId) {
					return;
				}
				this.isLoading = false;
				console.error('Error loading services:', error);
				this.serviceData = [];
				this.totalRecord = 0;
				this.loadError = true;
			}
		});
	}

	onListChangePage(event: number): void {
		this.currentPage = event;
		this.get_serviceData();
	}

	searchService(): void {
		this.currentPage = 1;
		this.currentLimit = this.hasFilters ? 1000 : 10;
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
		}
		this.searchTimer = setTimeout(() => this.get_serviceData(), 250);
	}

	applyStatusFilter(): void {
		this.searchService();
	}

	clearFilters(): void {
		this.searchText = '';
		this.isactive = 'all';
		this.searchService();
	}

	onImageError(event: Event): void {
		const image = event.target as HTMLImageElement;
		image.onerror = null;
		image.src = 'assets/img/placeholder.webp';
	}
}
