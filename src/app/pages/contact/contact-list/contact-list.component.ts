import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { MatDialog } from '@angular/material/dialog';

// Services
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';
import { from } from 'rxjs';

@Component({
	selector: 'app-contact-list',
	templateUrl: './contact-list.component.html',
	styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	selectedContact: any = null;
	isMessageOpen = false;

	msg_danger: boolean = false;
	contactData: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	searchText = '';

	constructor(
		private router: Router,
		private testimonialservice: TestimonialService
	) { }

	ngOnInit(): void {
		this.get_contactData();
	}

	get_contactData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.testimonialservice.getcontactDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.contactData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}
				}
			},
		);
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_contactData();
	}

	deletecontact(listid: any) {
		if (confirm("Are you sure to delete this Contact")) {
			var mylist = { id: listid };
			this.testimonialservice.deletecontact(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_contactData();
						this.router.navigate(['/contact/list']);
					}
				},
			);
		}
	}

	searchContact() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_contactData();
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
