import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { BlogService } from '../../../providers/blog/blog.service';
import { from } from 'rxjs';

@Component({
	selector: 'app-view-blog',
	templateUrl: './view-blog.component.html',
	styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
	msg_danger: boolean = false;
	blogData: any;
	imagePath: any;

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
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
	constructor(
		private router: Router,
		private blogService: BlogService
	) {
		this.imagePath = environment.baseUrl + '/public/blog/';

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

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_blogData();
	}

	deleteblog(listid: any) {
		if (confirm("Are you sure to delete this Blog")) {
			var mylist = { id: listid };
			this.blogService.deleteblog(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_blogData();
						this.router.navigate(['/blog/view']);
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
}
