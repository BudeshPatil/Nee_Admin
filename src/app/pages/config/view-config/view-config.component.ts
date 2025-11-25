import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';

// Services
import { from } from 'rxjs';
import { ConfigService } from '../../../providers/config/config.service';
import { ToastrManager } from 'ng6-toastr-notifications';
// import { NgxQrcodeStylingComponent, NgxQrcodeStylingService} from 'ngx-qrcode-styling';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent {

  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  configImage:any = [];
  imagePath : any;
  imageArr: any = [];

  // Data Assign
  addconfigForm:FormGroup;
  throw_msg:any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  token: any;

  // Edit Action Here
  id:any;
  ConfigData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  extension = 'svg';
  qrCode = null;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  QRcodeImage :any = '';
  qrcodeurl:any = 'http://miniaar.ae/';
  @ViewChild('qrcode', { static: true }) qrcode: ElementRef;
  isUpdate:any = false;
  user:any;
  document:any;
  selectedFile:any;
  constructor(
    private router: Router,
    private configService:ConfigService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrManager,
    // private testDI: NgxQrcodeStylingService
  )
  {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addconfigForm = this.formBuilder.group({
      name: ['',Validators.required],
      status:['',Validators.required],
      gmail_user:['',Validators.required],
      gmail_password: ['',Validators.required],
      qrcode_image: [''],
      qrcode_url: [''],
      calendly_link: [''],
      contactEmail: [''],
      contactEmailPassword: [''],
      contactEmailSubject: [''],
      careerEmail: [''],
      careerEmailPassword: [''],
      careerEmailSubject: [''],
			smtp_status: [''],
      smtp_host: [''],
      smtp_port: [''],
      smtp_secure: [''],
      smtp_user: [''],
      smtp_password: [''],
      contact_email: [''],
      support_email: [''],
      sales_email: [''],
      orders_email: [''],
      tax_rate: [''],
      currency_type: [''],
      inclusive_tax:[true]
     });
     this.token = localStorage.getItem('ghoastrental-token');
     this.imagePath = environment.baseUrl+'/public/';
     let tempuser = localStorage.getItem('user');
    this.user = JSON.parse(tempuser);
  }

  ngOnInit(): void {
    this.get_ConfigData();
  }

  get_ConfigData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.configService.getConfigDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            if(response.result != null && response.result != '')
            {
              this.ConfigData = response.result;
              this.totalRecord = response?.count;
              let data = this.ConfigData[0];
              this.configImage = data?.image;
              this.QRcodeImage = data?.qrcode_image;
              this.document = data?.documents;
              this.addconfigForm.patchValue({
                name: data?.name,
                status: data?.status,
                gmail_user: data?.gmail_user,
                gmail_password: data?.gmail_password,
                qrcode_url: data?.qrcode_url,
                calendly_link:data?.calendly_link,
                contactEmail: data?.contactEmail,
                contactEmailPassword: data?.contactEmailPassword,
                contactEmailSubject: data?.contactEmailSubject,
                careerEmail: data?.careerEmail,
                careerEmailPassword: data?.careerEmailPassword,
                careerEmailSubject: data?.careerEmailSubject,
                smtp_status: data?.smtp_status,
                smtp_host: data?.smtp_host,
                smtp_port: data?.smtp_port,
                smtp_secure: data?.smtp_secure,
                smtp_user: data?.smtp_user,
                smtp_password: data?.smtp_password,
								contact_email: data?.contact_email,
								support_email: data?.support_email,
								sales_email: data?.sales_email,
								orders_email: data?.orders_email,
                inclusive_tax: data?.inclusive_tax,
								tax_rate: data?.tax_rate,
								currency_type: data?.currency_type
              });
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

  public hasError = (controlName: string, errorName: string) => {
    return this.addconfigForm.controls[controlName].hasError(errorName);
  };

  onSubmit(){
    this.submitted = true;
    let obj = this.addconfigForm.value;
    let id  = this.ConfigData[0]._id;
    obj['ghoastrental-token'] = this.token;
    obj['image'] = this.configImage;
    obj['qrcode_image'] = this.QRcodeImage;
    obj['documents'] = this.document;
    if (this.addconfigForm.invalid){
      return;
    }
    this.configService.editConfigdata(obj,id).subscribe(
      (response) => {
        if(response.code == 200)
        {
          this.throw_msg = response.message
          this.msg_success = true;
          setTimeout(()=>{
              this.router.navigate(['/config/view']);
              this.toastr.successToastr(response.message);
          },2000);
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
    );
  }

	onTestEmail(smtp_test_email: string) {
		// console.log(smtp_test_email);
		// const data = smtp_test_email
		const obj = {
      email: smtp_test_email
    };
		this.configService.testEmail(obj).subscribe(
			(response)=> {
				if (response.code === 200) {
					this.throw_msg = response.message
					this.msg_success = true;
					setTimeout(() => {
						this.router.navigate(['/config/view']);
						this.toastr.successToastr(response.message);
					}, 2000);
				} else {
					this.toastr.errorToastr(response.message);
				}
			}
		)
	}

  onUploadOutput(output: UploadOutput,type): void {
    if (output.type === 'allAddedToQueue')
    {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl+'/api/config/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if(output.type === 'done' && typeof output.file !== 'undefined')
    {
      if(type == "QRcode"){
        this.QRcodeImage = environment.baseUrl+'/public/'+output.file.response.result;
        this.isUpdate = true;
        // this.onUpdate(this.qrcode);
      } else {
        this.configImage.push(output.file.response.result);
      }
    }
  }


  deleteImage(index:any){
    if(confirm("Are you sure to delete this Image"))
    {
      this.configImage.splice(index,1)
    }
  }


  /**
   * Update
   */
  // public onUpdate(qrcode: NgxQrcodeStylingComponent) {
  //   qrcode
  //     .update(qrcode.config, {
  //       // frameOptions: {
  //       //   height: 550,
  //       //   width: 325,
  //       // },
  //       image:this.QRcodeImage,
  //       data: this.addconfigForm.value.qrcode_url
  //     })
  //     .subscribe((res) => {
  //       // TO DO something!
  //       this.isUpdate = false;
  //       console.log('update:', res);
  //       console.log('Element:', res?.container?.querySelector('canvas'));
  //     });
  // }

  /**
   * Download
   */
  // onDownload(qrcode: NgxQrcodeStylingComponent): void {
  //   qrcode.download('MiniaarQR.png').subscribe((res) => {
  //     // TO DO something!
  //     console.log('download:', res);
  //   });
  // }

  deleteQRImage(){
    if(confirm("Are you sure to delete this Image"))
    {
      this.QRcodeImage = '';
    }
  }

  onUploadFile(output: UploadOutput): void {
    this.selectedFile = output;
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/config/addNewDocument',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.document = output.file.response.result;
      this.throw_msg = output.file.response.message;
      this.msg_success = true;
    }
  }

  generateSitemapXML() {
		const obj = { };
		this.configService.generareSitemapXML(obj).subscribe(
			(response)=> {
				if (response.code === 200) {
					this.throw_msg = response.message
					this.msg_success = true;
					setTimeout(() => {
						this.router.navigate(['/config/view']);
						this.toastr.successToastr(response.message);
					}, 2000);
				} else {
					this.toastr.errorToastr(response.message);
				}
			}
		)
	}

}
