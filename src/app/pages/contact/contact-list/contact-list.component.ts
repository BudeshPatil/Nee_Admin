import { Component, HostListener, OnInit } from '@angular/core';
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';

interface ContactRecord {
	_id?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	phone?: string;
	subject?: string;
	message?: string;
	created_at?: string | Date;
}

@Component({
	selector: 'app-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	selectedContact: ContactRecord | null = null;
	isMessageOpen = false;
	contactData: ContactRecord[] = [];

	currentPage = 1;
	currentLimit = 10;
	totalRecord = 0;
	searchText = '';
	isLoading = false;
	loadError = false;
	actionError = '';

	constructor(private testimonialservice: TestimonialService) { }

	ngOnInit(): void {
		this.get_contactData();
	}

	get filteredContacts(): ContactRecord[] {
		const query = this.searchText.trim().toLowerCase();
		return this.contactData.filter(contact => {
			const searchable = [
				contact.firstname,
				contact.lastname,
				contact.email,
				contact.phone,
				contact.subject,
				contact.message
			].filter(Boolean).join(' ').toLowerCase();
			return !query || searchable.includes(query);
		});
	}

	get displayedContacts(): ContactRecord[] {
		const start = (this.currentPage - 1) * this.currentLimit;
		return this.filteredContacts.slice(start, start + this.currentLimit);
	}

	get_contactData(): void {
		this.isLoading = true;
		this.loadError = false;
		this.actionError = '';
		this.testimonialservice.getcontactDetails({ limit: 1000, page: 1 }).subscribe({
			next: (response: any) => {
				this.isLoading = false;
				if (!response || response.code !== 200 || !Array.isArray(response.result)) {
					this.loadError = true;
					this.contactData = [];
					this.totalRecord = 0;
					return;
				}
				this.contactData = response.result.filter((contact: ContactRecord) => contact.subject !== 'price_on_request');
				this.totalRecord = this.contactData.length;
				this.clampCurrentPage();
			},
			error: error => {
				console.error('Error loading contact enquiries:', error);
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

	deletecontact(id: string | undefined): void {
		if (!id || !confirm('Are you sure you want to delete this contact enquiry?')) {
			return;
		}
		this.actionError = '';
		this.testimonialservice.deletecontact({ id }).subscribe({
			next: (response: any) => {
				if (response.code === 200) {
					this.get_contactData();
				} else {
					this.actionError = 'This enquiry could not be deleted. Please try again.';
					console.error('Unable to delete contact enquiry:', response.message);
				}
			},
			error: error => {
				this.actionError = 'This enquiry could not be deleted. Please try again.';
				console.error('Error deleting contact enquiry:', error);
			}
		});
	}

	searchContact(): void {
		this.currentPage = 1;
	}

	openMessage(contact: ContactRecord): void {
		this.selectedContact = contact;
		this.isMessageOpen = true;
	}

	closeMessage(): void {
		this.isMessageOpen = false;
		this.selectedContact = null;
	}

	@HostListener('document:keydown.escape')
	onEscapeKey(): void {
		if (this.isMessageOpen) {
			this.closeMessage();
		}
	}

	private clampCurrentPage(): void {
		const pageCount = Math.max(1, Math.ceil(this.filteredContacts.length / this.currentLimit));
		this.currentPage = Math.min(this.currentPage, pageCount);
	}
}
