import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { SubscriberService } from '../../../providers/subscriber/subscriber.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-view-subscriber',
  templateUrl: './view-subscriber.component.html',
  styleUrls: ['./view-subscriber.component.scss']
})
export class ViewSubscriberComponent implements OnInit {

  msg_danger: boolean = false;
  subscriberData: any;
  addSubscriberEmailForm:FormGroup;
  submitted: boolean = false; 
  id:any;
  editorConfig: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '200px',
		maxHeight: 'auto',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Enter text here...',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [
			{ class: 'career_box', name: 'Rajdhani sans-serif' },
		],
	}

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  closeResult = '';
  modalReference = null;
  selectedBanner : any;

  constructor(
    private router: Router,
    private subscriberService:SubscriberService,
    private toaster : ToastrManager,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.addSubscriberEmailForm = this.formBuilder.group({
			email: ['', []],
			subject: ['', [Validators.required, Validators.maxLength(255)]],
			content: ['', Validators.required],
      });
    }
   

  ngOnInit(): void {
    this.get_subscriberData();
  }

  get_subscriberData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    this.subscriberService.getSubscriberDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.subscriberData = response.result; 
              this.totalRecord = response?.count;
              window.scroll(0,0); 
            }
            else
            {
              this.msg_danger   = true;
              this.toaster.errorToastr(response.message);
            }
           
          }
        },
      );
  }

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_subscriberData();
  }
  
  deleteSubscriber(listid:any)
  {
    if(confirm("Are you sure to delete this Subscriber Job"))
    {
      var mylist = {id:listid};
      this.subscriberService.deletesubscriber(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_subscriberData();
            this.router.navigate(['/subscriber/view']);
          }
        },
      );
    }
  }

  searchSubscriber(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_subscriberData();
  }

  open(content,data) {
    this.selectedBanner = data;
		this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  sendAllopen(content) {
    // this.selectedBanner = data;
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


onCancel(){
  this.router.navigate(['/subscriber/view']);
}

public hasError = (controlName: string, errorName: string) => { 
  return this.addSubscriberEmailForm.controls[controlName].hasError(errorName);
};

onSubmit(){
  this.submitted = true;
  let obj = this.addSubscriberEmailForm.value;
  
  if (this.addSubscriberEmailForm.invalid){
    return;
  }

 {

    this.subscriberService.sendMail(obj).subscribe(
      (response) => {
        if(response.code == 200) 
        {
          // this.throw_msg = response.message 
          // this.msg_success = true;
          this.toaster.successToastr(response.message);
          
          setTimeout(()=>{                           
            window.location.reload();
              this.router.navigate(['/subscriber/view']);
          },2000);  
        } else {
          this.toaster.errorToastr(response.message);
        } 
      },
    );

  }
}

SendAll() {
  this.submitted = true;
  let obj = this.addSubscriberEmailForm.value;
  
  if (this.addSubscriberEmailForm.invalid){
    return;
  }

 {

    this.subscriberService.sendMailAll(obj).subscribe(
      (response) => {
        if(response.code == 200) 
        {
          // this.throw_msg = response.message 
          // this.msg_success = true;
          this.toaster.successToastr(response.message);
          
          setTimeout(()=>{                           
            window.location.reload();
              this.router.navigate(['/subscriber/view']);
          },2000);  
        } else {
          this.toaster.errorToastr(response.message);
        } 
      },
    );

  } 
}

}
