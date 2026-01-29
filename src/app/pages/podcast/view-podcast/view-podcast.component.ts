import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { from } from 'rxjs';
import { PodcastService } from '../../../providers/podcast/podcast.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-podcast',
  templateUrl: './view-podcast.component.html',
  styleUrls: ['./view-podcast.component.scss']
})
export class ViewPodcastComponent implements OnInit {

  msg_danger: boolean = false;
	PodcastData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';
  isactive :any ;
	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
	searchText = '';
  closeResult = '';
  modalReference = null;
  selectedPodcast : any;
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

	constructor(
		private router: Router,
		// private loginService: LoginService,
		private toastr: ToastrManager,
    private podcastservice:PodcastService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('token');
	}

	ngOnInit(): void {
		this.get_PodcastData();
    this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.isactive = 'none';
	}

	get_PodcastData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			vendor_id: this.vendorid,
			token: this.token,
		};
		this.podcastservice.getPodcastDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.PodcastData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	changeVendorList(event: any) {
		this.vendorid = event.currentTarget.value;
		this.get_PodcastData();
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_PodcastData();
	}

	selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

	deleteAllPodcasts()
  {
    if(confirm("Are you sure to delete All Podcasts"))
    {
      var mylist = {};
      this.podcastservice.deleteallpodcasts(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_PodcastData();
						this.toastr.successToastr(response.message);
            window.location.reload();
          }
        },
      );
    }
  }


	searchPodcast(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_PodcastData();
  }

  open(content,data) {
    this.selectedPodcast = data;
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

  closeModal(){
    this.activeModal.close();
  }


  deletePodcast() {
		if (this.selectedPodcast) {
			var mylist = { id: this.selectedPodcast._id };
			this.podcastservice.deletepodcast(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_PodcastData();
						this.router.navigate(['/podcast/view']);
            window.location.reload();
					}
				},
			);
		}
	}

	changeStatus(){
    if(this.isactive != 'none'){
      this.config.switchColor.checked = '#ffffff';
      this.config.color.checked = 'green';
      this.config.labels.checked = 'Active';
    } else {
      if(this.isactive){
        this.isactive = false;
        this.config.switchColor.unchecked = 'crimson';
        this.config.color.unchecked = '#423f3f';
        this.config.labels.unchecked = 'Deactive';
      } else {
        this.isactive = true;
        
      }
    }
	}

  resetFilter(){
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.config.switchColor.unchecked = '#dcdcdc';
    this.config.color.unchecked = '#dcdcdc';
    this.config.labels.unchecked = 'Change';
    this.isactive = 'none';
	}

}
