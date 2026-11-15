import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';

@Component({
  selector: 'app-view-testimonial',
  templateUrl: './view-testimonial.component.html',
  styleUrls: ['./view-testimonial.component.css']
})
export class ViewTestimonialComponent implements OnInit {
  testimonialData: any[] = [];
  imagePath = environment.baseUrl + '/public/testimonial/';
  searchText = '';
  currentPage = 1;
  currentLimit = 10;
  totalRecord = 0;
  isactive: 'all' | boolean = 'all';
  isLoading = false;
  loadError = false;
  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private loadRequestId = 0;

  constructor(private testimonialservice: TestimonialService) { }

  ngOnInit(): void {
    this.get_testimonialData();
  }

  get filteredTestimonials(): any[] {
    const query = this.searchText.trim().toLowerCase();
    return this.testimonialData.filter(item => {
      const searchable = `${item.name || ''} ${item.title || ''} ${item.location || ''} ${item.text || ''}`.toLowerCase();
      const active = item.status === true || item.status === 'true';
      return (!query || searchable.includes(query)) &&
        (this.isactive === 'all' || active === this.isactive);
    });
  }

  get hasFilters(): boolean {
    return !!this.searchText.trim() || this.isactive !== 'all';
  }

  get_testimonialData(): void {
    const requestId = ++this.loadRequestId;
    this.isLoading = true;
    this.loadError = false;
    this.testimonialservice.getTestimonialDetails({
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
          this.testimonialData = [];
          return;
        }
        this.testimonialData = Array.isArray(response.result) ? response.result : [];
        this.totalRecord = Number(response.count) || this.testimonialData.length;
      },
      error: (error: any) => {
        if (requestId !== this.loadRequestId) {
          return;
        }
        console.error('Error loading testimonials:', error);
        this.isLoading = false;
        this.loadError = true;
        this.testimonialData = [];
      }
    });
  }

  onListChangePage(event: number): void {
    this.currentPage = event;
    this.get_testimonialData();
  }

  searchProduct(): void {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    this.currentPage = 1;
    this.currentLimit = this.hasFilters ? 1000 : 10;
    this.searchTimer = setTimeout(() => this.get_testimonialData(), 250);
  }

  clearFilters(): void {
    this.searchText = '';
    this.isactive = 'all';
    this.searchProduct();
  }

  deleteTestimonial(id: string): void {
    if (!confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }
    this.testimonialservice.deleteTestimonial({ id }).subscribe({
      next: (response: any) => {
        if (response.code === 200) {
          this.get_testimonialData();
        } else {
          console.error('Unable to delete testimonial:', response.message);
        }
      },
      error: error => console.error('Error deleting testimonial:', error)
    });
  }

  onImageError(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.src = 'assets/img/placeholder.webp';
  }
}
