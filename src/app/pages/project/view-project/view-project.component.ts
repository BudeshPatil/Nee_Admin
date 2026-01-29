import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { from } from 'rxjs';
import { ProjectService } from '../../../providers/project/project.service';

@Component({
	selector: 'app-view-project',
	templateUrl: './view-project.component.html',
	styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

	msg_danger: boolean = false;
	authorData: any;
	imagePath: any;
	projectData: any;
	originalProjectData: any; // Store original data
	allProjectData: any; // Store all data for sorting
	isLoading: boolean = false;
	isSortingMode: boolean = false; // Track if we're in sorting mode

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
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

	constructor(
		private router: Router,
		private projectservice: ProjectService
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.isactive = 'none';
	}

	ngOnInit(): void {
		this.get_projectData();
	}

	get_projectData(fetchAll: boolean = false, skipLoading: boolean = false) {
		if (!skipLoading) {
			this.isLoading = true;
		}
		const obj = {
			limit: fetchAll ? this.totalRecord || 10000 : this.currentLimit,
			page: fetchAll ? 1 : this.currentPage,
		};
		this.projectservice.getAllProjects(obj).subscribe(
			(response) => {
				if (!skipLoading) {
					this.isLoading = false;
				}
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						if (fetchAll) {
							// Store all data when fetching for sorting
							this.allProjectData = response.result;
							this.originalProjectData = [...response.result];
							this.totalRecord = response?.count;
							this.applySorting();
							this.paginateData();
						} else {
							this.projectData = response.result;
							this.originalProjectData = [...response.result];
							this.totalRecord = response?.count;
						}
						this.msg_danger = false;
					} else {
						this.msg_danger = true;
						this.projectData = [];
					}
				} else {
					this.msg_danger = true;
					this.projectData = [];
				}
			},
			(error) => {
				if (!skipLoading) {
					this.isLoading = false;
				}
				console.error('Error fetching projects:', error);
				this.msg_danger = true;
				this.projectData = [];
				this.showToast('Error loading projects. Please try again.', 'error');
			}
		);
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

	deleteProject(listid: any) {
		if (confirm("Are you sure you want to delete this project?")) {
			this.isLoading = true;
			const mylist = { _id: listid };
			this.projectservice.deleteProject(mylist).subscribe(
				(response) => {
					this.isLoading = false;
					if (response.code == 200) {
						this.showToast('Project deleted successfully!', 'success');
						// Reset sorting mode and refetch data
						this.isSortingMode = false;
						this.sortConfig = { column: '', order: 'none' };
						this.currentPage = 1;
						this.get_projectData();
					} else {
						this.showToast('Failed to delete project. Please try again.', 'error');
					}
				},
				(error) => {
					this.isLoading = false;
					console.error('Error deleting project:', error);
					this.showToast('An error occurred while deleting the project.', 'error');
				}
			);
		}
	}

	searchProject(skipLoading: boolean = true) {
		// Exit sorting mode when searching
		this.isSortingMode = false;
		this.sortConfig = { column: '', order: 'none' };

		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_projectData(false, skipLoading);
	}

	clearSearch() {
		this.searchText = '';
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
					valueA = a.status ? 1 : 0;
					valueB = b.status ? 1 : 0;
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

		// Reset sorting and exit sorting mode
		this.sortConfig = {
			column: '',
			order: 'none'
		};
		this.isSortingMode = false;
		this.currentPage = 1;
		this.get_projectData();
	}

	// Toast notification system
	showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
		// Create toast element
		const toast = document.createElement('div');
		toast.className = `custom-toast toast-${type}`;
		toast.innerHTML = `
			<div class="toast-content">
				<span class="toast-icon">${this.getToastIcon(type)}</span>
				<span class="toast-message">${message}</span>
			</div>
		`;

		// Add to body
		document.body.appendChild(toast);

		// Trigger animation
		setTimeout(() => toast.classList.add('show'), 10);

		// Remove after 3 seconds
		setTimeout(() => {
			toast.classList.remove('show');
			setTimeout(() => document.body.removeChild(toast), 300);
		}, 3000);
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
