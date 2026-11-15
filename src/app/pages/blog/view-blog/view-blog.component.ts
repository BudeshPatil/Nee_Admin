import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BlogService } from '../../../providers/blog/blog.service';

@Component({
	selector: 'app-view-blog',
	templateUrl: './view-blog.component.html',
	styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
	blogData: any[] = [];
	imagePath = environment.baseUrl + '/public/blog/';
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isactive: 'all' | boolean = 'all';
	isLoading = false;
	loadError = false;
	private searchTimer: ReturnType<typeof setTimeout> | null = null;
	private loadRequestId = 0;

	constructor(private blogService: BlogService) { }

	ngOnInit(): void {
		this.get_blogData();
	}

	get filteredBlogs(): any[] {
		const query = this.searchText.trim().toLowerCase();
		return this.blogData.filter(blog => {
			const searchable = `${blog.name || ''} ${blog.category_name || ''} ${blog.meta_description || ''} ${blog.author_name || ''}`.toLowerCase();
			const active = blog.status === true || blog.status === 'true';
			return (!query || searchable.includes(query)) &&
				(this.isactive === 'all' || active === this.isactive);
		});
	}

	get hasFilters(): boolean {
		return !!this.searchText.trim() || this.isactive !== 'all';
	}

	get_blogData(): void {
		const requestId = ++this.loadRequestId;
		this.isLoading = true;
		this.loadError = false;
		this.blogService.getblogDetails({
			limit: this.currentLimit,
			page: this.currentPage
		}).subscribe({
			next: (response: any) => {
				if (requestId !== this.loadRequestId) {
					return;
				}
				this.isLoading = false;
				if (response.code !== 200) {
					this.loadError = true;
					this.blogData = [];
					return;
				}
				this.blogData = Array.isArray(response.result) ? response.result : [];
				this.totalRecord = Number(response.count) || this.blogData.length;
			},
			error: error => {
				if (requestId !== this.loadRequestId) {
					return;
				}
				console.error('Error loading blogs:', error);
				this.isLoading = false;
				this.loadError = true;
				this.blogData = [];
			}
		});
	}

	onListChangePage(event: number): void {
		this.currentPage = event;
		this.get_blogData();
	}

	searchBlog(): void {
		if (this.searchTimer) {
			clearTimeout(this.searchTimer);
		}
		this.currentPage = 1;
		this.currentLimit = this.hasFilters ? 1000 : 10;
		this.searchTimer = setTimeout(() => this.get_blogData(), 250);
	}

	clearFilters(): void {
		this.searchText = '';
		this.isactive = 'all';
		this.searchBlog();
	}

	deleteblog(id: string): void {
		if (!confirm('Are you sure you want to delete this blog?')) {
			return;
		}
		this.blogService.deleteblog({ id }).subscribe({
			next: (response: any) => {
				if (response.code === 200) {
					this.get_blogData();
				} else {
					console.error('Unable to delete blog:', response.message);
				}
			},
			error: error => console.error('Error deleting blog:', error)
		});
	}

	onImageError(event: Event): void {
		const image = event.target as HTMLImageElement;
		image.onerror = null;
		image.src = 'assets/img/placeholder.webp';
	}
}
