import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CareerService } from '../../../providers/career/career.service';

interface CareerRecord {
	_id?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	mobile?: string;
	type?: string;
	subject?: string;
	documents?: string;
	created_at?: string | Date;
}

@Component({
	selector: 'app-view-career',
	templateUrl: './view-career.component.html',
	styleUrls: ['./view-career.component.css']
})
export class ViewCareerComponent implements OnInit {
	careerData: CareerRecord[] = [];
	selectedCareer: CareerRecord | null = null;
	isApplicationOpen = false;

	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isLoading = false;
	loadError = false;
	actionError = '';
	imagePath = environment.baseUrl + '/public/';

	constructor(private careerService: CareerService) { }

	ngOnInit(): void {
		this.get_careerData();
	}

	get filteredCareers(): CareerRecord[] {
		const query = this.searchText.trim().toLowerCase();
		return this.careerData.filter(career => {
			const searchable = [
				career.firstname,
				career.lastname,
				career.email,
				career.mobile,
				career.type,
				career.subject
			].filter(Boolean).join(' ').replace(/<[^>]*>/g, ' ').toLowerCase();
			return !query || searchable.includes(query);
		});
	}

	get displayedCareers(): CareerRecord[] {
		const start = (this.currentPage - 1) * this.currentLimit;
		return this.filteredCareers.slice(start, start + this.currentLimit);
	}

	get_careerData(): void {
		this.isLoading = true;
		this.loadError = false;
		this.actionError = '';
		this.careerService.getCareerDetails({ limit: 1000, page: 1 }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (!response || response.code !== 200) {
					this.loadError = true;
					this.careerData = [];
					this.totalRecord = 0;
					return;
				}
				if (response.result == null || response.result === '') {
					this.careerData = [];
					this.totalRecord = 0;
					this.clampCurrentPage();
					return;
				}
				if (!Array.isArray(response.result)) {
					this.loadError = true;
					this.careerData = [];
					this.totalRecord = 0;
					return;
				}
				this.careerData = response.result;
				this.totalRecord = this.careerData.length;
				this.clampCurrentPage();
			},
			error: error => {
				console.error('Error loading career applications:', error);
				this.isLoading = false;
				this.loadError = true;
				this.careerData = [];
				this.totalRecord = 0;
			}
		});
	}

	onListChangePage(page: number): void {
		this.currentPage = page;
	}

	searchCareer(): void {
		this.currentPage = 1;
	}

	deleteCareer(id: string | undefined): void {
		if (!id || !confirm('Are you sure you want to delete this career application?')) {
			return;
		}
		this.actionError = '';
		this.careerService.deletecareer({ id }).subscribe({
			next: (response: any) => {
				if (response && response.code === 200) {
					this.get_careerData();
				} else {
					this.actionError = 'This application could not be deleted. Please try again.';
					console.error('Unable to delete career application:', response && response.message);
				}
			},
			error: error => {
				this.actionError = 'This application could not be deleted. Please try again.';
				console.error('Error deleting career application:', error);
			}
		});
	}

	openApplication(career: CareerRecord): void {
		this.selectedCareer = career;
		this.isApplicationOpen = true;
	}

	closeApplication(): void {
		this.isApplicationOpen = false;
		this.selectedCareer = null;
	}

	@HostListener('document:keydown.escape')
	onEscapeKey(): void {
		if (this.isApplicationOpen) {
			this.closeApplication();
		}
	}

	private clampCurrentPage(): void {
		const pageCount = Math.max(1, Math.ceil(this.filteredCareers.length / this.currentLimit));
		this.currentPage = Math.min(this.currentPage, pageCount);
	}
}
