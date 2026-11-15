import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';

@Component({
	selector: 'app-viewprices',
	templateUrl: './viewprices.component.html',
	styleUrls: ['./viewprices.component.scss']
})
export class ViewpricesComponent implements OnInit {
	selectedContact: any = null;
	isMessageOpen = false;
	contactData: any[] = [];
	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isLoading = false;
	loadError = false;

	constructor(private testimonialservice: TestimonialService) { }

	ngOnInit(): void {
		this.get_contactData();
	}

	get filteredContacts(): any[] {
		const query = this.searchText.trim().toLowerCase();
		return this.contactData.filter(contact => {
			const searchable = `${contact.firstname || ''} ${contact.lastname || ''} ${contact.email || ''} ${contact.phone || ''} ${contact.product || ''}`.toLowerCase();
			return !query || searchable.includes(query);
		});
	}

	get displayedContacts(): any[] {
		const start = (this.currentPage - 1) * this.currentLimit;
		return this.filteredContacts.slice(start, start + this.currentLimit);
	}

	get_contactData(): void {
		this.isLoading = true;
		this.loadError = false;
		this.testimonialservice.getcontactDetails({ limit: 1000, page: 1 }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (response.code !== 200 || !Array.isArray(response.result)) {
					this.loadError = response.code !== 200;
					this.contactData = [];
					this.totalRecord = 0;
					return;
				}
				this.contactData = response.result.filter((contact: any) => contact.subject === 'price_on_request');
				this.totalRecord = this.contactData.length;
				if (this.currentPage > Math.max(1, Math.ceil(this.totalRecord / this.currentLimit))) {
					this.currentPage = Math.max(1, Math.ceil(this.totalRecord / this.currentLimit));
				}
			},
			error: error => {
				console.error('Error loading price requests:', error);
				this.isLoading = false;
				this.loadError = true;
				this.contactData = [];
				this.totalRecord = 0;
			}
		});
	}

	onListChangePage(page: number): void {
		this.currentPage = page;
	}

	searchContact(): void {
		this.currentPage = 1;
	}

	deletecontact(id: string): void {
		if (!confirm('Are you sure you want to delete this price request?')) {
			return;
		}
		this.testimonialservice.deletecontact({ id }).subscribe({
			next: (response: any) => {
				if (response.code === 200) {
					this.get_contactData();
				} else {
					console.error('Unable to delete price request:', response.message);
				}
			},
			error: error => console.error('Error deleting price request:', error)
		});
	}

	openMessage(contact: any): void {
		this.selectedContact = contact;
		this.isMessageOpen = true;
	}

	closeMessage(): void {
		this.isMessageOpen = false;
		this.selectedContact = null;
	}
}
