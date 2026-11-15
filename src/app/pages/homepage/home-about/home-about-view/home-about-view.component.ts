import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AboutService } from 'src/app/providers/about/about.service';

@Component({
	selector: 'app-home-about-view',
	templateUrl: './home-about-view.component.html',
	styleUrls: ['./home-about-view.component.scss']
})
export class HomeAboutViewComponent implements OnInit {
	AboutData: any[] = [];
	imagePath = environment.baseUrl + '/public/about/';
	token: string;
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isLoading = true;
	loadError = false;

	constructor(
		private toastr: ToastrManager,
		private aboutservice: AboutService
	) {
		this.token = localStorage.getItem('token');
	}

	ngOnInit(): void {
		this.get_AboutData();
	}

	get_AboutData() {
		this.isLoading = true;
		this.loadError = false;

		const request = {
			limit: this.currentLimit,
			page: this.currentPage,
			token: this.token
		};

		this.aboutservice.getaboutDetails(request).subscribe({
			next: (response) => {
				this.isLoading = false;

				if (response.code === 200) {
					const results = Array.isArray(response.result) ? response.result : [];
					this.AboutData = results.filter((item) => item.page_section === 'home');
					this.totalRecord = Number(response.count) || 0;
					return;
				}

				this.AboutData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr(response.message || 'Homepage content could not be loaded.');
			},
			error: () => {
				this.isLoading = false;
				this.AboutData = [];
				this.totalRecord = 0;
				this.loadError = true;
				this.toastr.errorToastr('Homepage content could not be loaded.');
			}
		});
	}

	onListChangePage(page: number) {
		this.currentPage = page;
		this.get_AboutData();
	}

	searchAbout() {
		if (this.searchText.trim()) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
			this.currentPage = 1;
		}

		this.get_AboutData();
	}

	get filteredAboutData(): any[] {
		if (this.isLoading || this.loadError) {
			return [];
		}

		const query = this.searchText.trim().toLowerCase();
		if (!query) {
			return this.AboutData;
		}

		return this.AboutData.filter((item) => {
			const searchableText = [item.title_name, item.desc_short, item.page_section]
				.filter(Boolean)
				.join(' ')
				.toLowerCase();
			return searchableText.includes(query);
		});
	}
}
