import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment'

// Services
import { ProjectService } from '../../../providers/project/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-view-project',
	templateUrl: './view-project.component.html',
	styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit, OnDestroy {

	imagePath: any;
	projectData: any[] = [];
	originalProjectData: any[] = [];
	allProjectData: any[] = [];
	isLoading: boolean = false;
	loadError = false;
	isDeleting = false;
	selectedProject: any;
	toastMessage = '';
	toastType: 'success' | 'error' | 'info' = 'info';
	private toastTimer: ReturnType<typeof setTimeout> | null = null;
	isSortingMode: boolean = false; // Track if we're in sorting mode

	currentPage: number = 1;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';

	// Sorting
	sortConfig: {
		column: string;
		order: 'asc' | 'desc' | 'none';
	} = {
			column: '',
			order: 'none'
		};

	isactive: 'none' | boolean = 'none';

	constructor(
		private projectservice: ProjectService,
		private modalService: NgbModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
	}

	ngOnInit(): void {
		this.get_projectData();
	}

	ngOnDestroy(): void {
		if (this.toastTimer) {
			clearTimeout(this.toastTimer);
		}
	}

	get_projectData(fetchAll: boolean = false, skipLoading: boolean = false) {
		if (!skipLoading) {
			this.isLoading = true;
		}
		this.loadError = false;
		const obj = {
			limit: fetchAll ? this.totalRecord || 10000 : this.currentLimit,
			page: fetchAll ? 1 : this.currentPage,
		};
		this.projectservice.getAllProjects(obj).subscribe({
			next: (response) => {
				if (!skipLoading) {
					this.isLoading = false;
				}
				if (response.code == 200) {
					const isEmptyResult = response.result == null || response.result === '';
					if (!Array.isArray(response.result) && !isEmptyResult) {
						this.projectData = [];
						this.allProjectData = [];
						this.originalProjectData = [];
						this.totalRecord = 0;
						this.loadError = true;
						this.showToast('Error loading projects. Please try again.', 'error');
						return;
					}
					const results = Array.isArray(response.result) ? response.result : [];
					this.totalRecord = Number(response.count) || results.length;
					if (results.length > 0) {
						if (fetchAll) {
							this.allProjectData = results;
							this.originalProjectData = [...results];
							this.applySorting();
							this.paginateData();
						} else {
							this.projectData = results;
							this.originalProjectData = [...results];
						}
						return;
					} else {
						this.projectData = [];
						this.allProjectData = [];
						this.originalProjectData = [];
					}
				} else {
					this.projectData = [];
					this.allProjectData = [];
					this.originalProjectData = [];
					this.totalRecord = 0;
					this.loadError = true;
					this.showToast('Error loading projects. Please try again.', 'error');
				}
			},
			error: (error) => {
				if (!skipLoading) {
					this.isLoading = false;
				}
				console.error('Error fetching projects:', error);
				this.projectData = [];
				this.allProjectData = [];
				this.originalProjectData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.showToast('Error loading projects. Please try again.', 'error');
			}
		});
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		if (this.isSortingMode) {
			// If in sorting mode, just paginate the sorted data
			this.paginateData();
		} else {
			// Otherwise fetch new page data
			this.get_projectData();
		}
	}

	get filteredProjects(): any[] {
		const query = this.searchText.trim().toLowerCase();
		return this.projectData.filter(project => {
			const matchesSearch = !query || Object.keys(project).some(key => {
				const value = project[key];
				return value != null && String(value).toLowerCase().includes(query);
			});
			const matchesStatus = this.isactive === 'none' || this.isProjectActive(project) === this.isactive;
			return matchesSearch && matchesStatus;
		});
	}

	isProjectActive(project: any): boolean {
		return project.status === true || project.status === 1 || project.status === 'true' || project.status === '1';
	}

	get hasActiveFilters(): boolean {
		return !!this.searchText.trim() || this.isactive !== 'none';
	}

	openDeleteModal(content: any, project: any) {
		this.selectedProject = project;
		this.modalService.open(content, {
			ariaLabelledBy: 'project-delete-title',
			centered: true,
			size: 'sm'
		}).result.then(
			() => this.selectedProject = null,
			() => this.selectedProject = null
		);
	}

	deleteProject() {
		if (!this.selectedProject || this.isDeleting) {
			return;
		}

		this.isDeleting = true;
		this.projectservice.deleteProject({ _id: this.selectedProject._id }).subscribe({
			next: (response) => {
				this.isDeleting = false;
				if (response.code == 200) {
					this.modalService.dismissAll();
					this.showToast('Project deleted successfully!', 'success');
					this.isSortingMode = false;
					this.sortConfig = { column: '', order: 'none' };
					this.currentPage = 1;
					this.get_projectData();
				} else {
					this.showToast('Failed to delete project. Please try again.', 'error');
				}
			},
			error: (error) => {
				this.isDeleting = false;
				console.error('Error deleting project:', error);
				this.showToast('An error occurred while deleting the project.', 'error');
			}
		});
	}

	searchProject(skipLoading: boolean = true) {
		this.isSortingMode = false;
		this.sortConfig = { column: '', order: 'none' };

		if (this.searchText.trim() || this.isactive !== 'none') {
			this.currentLimit = 1000;
		} else {
			this.currentLimit = 10;
		}
		this.currentPage = 1;
		this.get_projectData(false, skipLoading);
	}

	clearSearch() {
		this.searchText = '';
		this.searchProject(true);
	}

	applyStatusFilter() {
		this.searchProject(true);
	}

	clearFilters() {
		this.searchText = '';
		this.isactive = 'none';
		this.searchProject(true);
	}

	// Generic sorting functionality for any column
	sortBy(column: string) {
		// Fetch all data for sorting if not already in sorting mode
		if (!this.isSortingMode) {
			this.isSortingMode = true;
			this.currentPage = 1; // Reset to first page
		}

		// If clicking the same column, cycle through: none -> asc -> desc -> none
		if (this.sortConfig.column === column) {
			if (this.sortConfig.order === 'none') {
				this.sortConfig.order = 'asc';
			} else if (this.sortConfig.order === 'asc') {
				this.sortConfig.order = 'desc';
			} else {
				// Reset sorting - exit sorting mode
				this.sortConfig.order = 'none';
				this.isSortingMode = false;
				this.get_projectData(); // Fetch regular paginated data
				return;
			}
		} else {
			// If clicking a different column, start with ascending
			this.sortConfig.column = column;
			this.sortConfig.order = 'asc';
		}

		// Fetch all data and apply sorting
		this.get_projectData(true);
	}

	applySorting() {
		if (!this.allProjectData || this.sortConfig.order === 'none') {
			// Reset to original order
			if (this.allProjectData) {
				this.allProjectData = [...this.originalProjectData];
			}
			return;
		}

		const column = this.sortConfig.column;
		const order = this.sortConfig.order;

		this.allProjectData.sort((a, b) => {
			let valueA: any;
			let valueB: any;

			// Handle different column types
			switch (column) {
				case 'name':
					valueA = (a.name || '').toLowerCase();
					valueB = (b.name || '').toLowerCase();
					return order === 'asc'
						? valueA.localeCompare(valueB)
						: valueB.localeCompare(valueA);

				case 'category':
					valueA = (a.category_name || '').toLowerCase();
					valueB = (b.category_name || '').toLowerCase();
					return order === 'asc'
						? valueA.localeCompare(valueB)
						: valueB.localeCompare(valueA);

				case 'sequence':
					valueA = parseInt(a.sequence_number) || 0;
					valueB = parseInt(b.sequence_number) || 0;
					return order === 'asc'
						? valueA - valueB
						: valueB - valueA;

				case 'doh':
					valueA = a.display_on_home ? 1 : 0;
					valueB = b.display_on_home ? 1 : 0;
					return order === 'asc'
						? valueA - valueB
						: valueB - valueA;

				case 'status':
					valueA = this.isProjectActive(a) ? 1 : 0;
					valueB = this.isProjectActive(b) ? 1 : 0;
					return order === 'asc'
						? valueA - valueB
						: valueB - valueA;

				case 'created':
					valueA = new Date(a.created_at).getTime();
					valueB = new Date(b.created_at).getTime();
					return order === 'asc'
						? valueA - valueB
						: valueB - valueA;

				case 'slno':
					// SL No is index-based, so we sort by original index
					valueA = this.originalProjectData.indexOf(a);
					valueB = this.originalProjectData.indexOf(b);
					return order === 'asc'
						? valueA - valueB
						: valueB - valueA;

				default:
					return 0;
			}
		});
	}

	// Paginate the sorted data
	paginateData() {
		if (!this.allProjectData) return;

		const startIndex = (this.currentPage - 1) * this.currentLimit;
		const endIndex = startIndex + this.currentLimit;
		this.projectData = this.allProjectData.slice(startIndex, endIndex);
	}

	getSortIcon(column: string): string {
		if (this.sortConfig.column !== column) {
			return '⇅'; // Default sort icon
		}
		if (this.sortConfig.order === 'asc') return '▲';
		if (this.sortConfig.order === 'desc') return '▼';
		return '⇅';
	}

	isSortActive(column: string): boolean {
		return this.sortConfig.column === column && this.sortConfig.order !== 'none';
	}

	onProjectImageError(event: Event) {
		const image = event.target as HTMLImageElement;
		image.onerror = null;
		image.src = 'assets/img/placeholder.webp';
	}

	// Toast notification system
	showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
		this.toastMessage = message;
		this.toastType = type;
		if (this.toastTimer) {
			clearTimeout(this.toastTimer);
		}
		this.toastTimer = setTimeout(() => this.toastMessage = '', 3000);
	}

	getToastIcon(type: string): string {
		switch (type) {
			case 'success': return '✓';
			case 'error': return '✕';
			case 'info': return 'ℹ';
			default: return 'ℹ';
		}
	}
}
