import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// Services
import { ColourService } from '../../../providers/colour/colour.service';
import { from } from 'rxjs';
import { MediaService } from 'src/app/providers/media/media.service';
import { ResponseService } from 'src/app/providers/response/response.service';

@Component({
  selector: 'app-view-colour',
  templateUrl: './view-colour.component.html',
  styleUrls: ['./view-colour.component.scss']
})
export class ViewColourComponent {
  msg_danger: boolean = false;
  colourData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath :any;
  selectedData:any;
	modalReference = null;
  closeResult = '';
  token:any;
  constructor(
    private router: Router,
    private colourService:ColourService,
    private modalService: NgbModal,
		private activeModal: NgbActiveModal,
    private mediaService: MediaService,
		public responseService: ResponseService
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
   }

  ngOnInit(): void {
    this.get_colourData();
  }

  get_colourData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.colourService.getColourDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.colourData = response.result; 
              this.totalRecord = response?.count;
              window.scroll(0,0); 
            }
            else
            {
              this.msg_danger   = true;
            }
           
          }
        },
      );
  }

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_colourData();
  }
  
  deleteColour()
  {
    if(this.selectedData)
    {
      var mylist = {id:this.selectedData._id};
      mylist['token'] = this.token;
      this.colourService.deletecolour(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_colourData();
            this.deleteMediaData();
            this.CreateErrorResponse(response);
            this.router.navigate(['/colour/view']);
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  open(content,data) {
    this.selectedData = data;
		if (this.selectedData) {
		var mylist = { id: this.selectedData._id };
		this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
		}
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

  searchColour(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_colourData();
  }

  deleteMediaFile(){
    let obj = {	};
		let imageFiles = [];
		if(this.selectedData.media_data && this.selectedData.media_data.length > 0){
			imageFiles.push(this.selectedData.media_data[0].src)
			obj['files'] =  imageFiles;
			this.colourService.deletefile(obj).subscribe(
				(response) => {
					if (response.code == 200) {
					}
					else {
						// this.bannerVideo = this.bannerVideo;
					}
				},
			);
		}
	}

  deleteMediaData() {
		if (this.selectedData.media_data && this.selectedData.media_data.length > 0) {
			var mylist = { id: this.selectedData.media_data[0]._id, file: this.selectedData.media_data[0].src };
			this.colourService.deleteMediaData(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.modalService.dismissAll();
					}
				},
			);
		}
	}

  CreateErrorResponse(responseData) {
    if (responseData && this.token) {
      let obj = {
        model: 'Color',
        request: responseData,
        errorCode: 400,
        error: responseData.error,
        status: responseData.status,
        massage: responseData.massage,
        log_type: 'Delete',
        token: this.token,
      };
      this.responseService.addErrorResponse(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            console.log('logs updated');
          }
          else {
          }
        },
      );
    }
  }

}
