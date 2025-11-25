import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlogService } from 'src/app/providers/blog/blog.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-view-blog',
	templateUrl: './view-blog.component.html',
	styleUrls: ['./view-blog.component.scss']
})

export class ViewBlogComponent {

	msg_danger: boolean = false;
	blogData: any;
	imagePath: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 5;
	totalRecord: number = 0;
	searchText = '';
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
	selectedBlog: any;
	closeResult = '';
	modalReference = null;
	constructor(
		private router: Router,
		private blogService: BlogService,
		private modalService: NgbModal,
	) {
		this.imagePath = environment.baseUrl + '/public/';

	}

	ngOnInit(): void {
		this.get_blogData();
		this.config.switchColor.checked = '#dcdcdc';
		this.config.color.checked = '#dcdcdc';
		this.config.labels.checked = 'Change';
		this.isactive = 'none';
	}

	get_blogData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
		};
		this.blogService.getblogDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.blogData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	deleteblog() {
		if (this.selectedBlog) {
			var mylist = { id: this.selectedBlog._id };
			this.blogService.deleteblog(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_blogData();
						this.router.navigate(['/blog/view']);
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

	searchBlog() {
		if (this.searchText) {
			this.currentLimit = 1000;
			this.currentPage = 1;
		} else {
			this.currentLimit = 10;
		}
		this.get_blogData();
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
				this.isactive = true
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
	}

	open(content, data) {
		this.selectedBlog = data;
		this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


}
