import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '../../../../environments/environment';

// Services
import { from } from 'rxjs';
import { ConfigService } from '../../../providers/config/config.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-config',
  templateUrl: './view-config.component.html',
  styleUrls: ['./view-config.component.scss']
})
export class ViewConfigComponent implements OnInit {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  configImage: any = [];
  imagePath: any;
  imageArr: any = [];

  // Data Assign
  addconfigForm: FormGroup;
  throw_msg: any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  token: any;

  // Edit Action Here
  id: any;
  ConfigData: any;

  // pagination
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  extension = 'svg';
  qrCode = null;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  QRcodeImage: any = '';
  qrcodeurl: any = 'https://www.dr-neelgund.com/';
  @ViewChild('qrcode', { static: true }) qrcode: ElementRef;
  isUpdate: any = false;
  user: any;
  document: any;
  selectedFile: any;
  constructor(
    private router: Router,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrManager
  ) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addconfigForm = this.formBuilder.group({
      name: [''],
      status: [''],
      gmail_user: [''],
      gmail_password: [''],
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
      smtp_password: ['']
    });
    this.token = localStorage.getItem('neelgund-admin-token');
    this.imagePath = environment.baseUrl + '/public/';
    let tempuser = localStorage.getItem('user');
    this.user = JSON.parse(tempuser);
  }

  ngOnInit(): void {
    this.get_ConfigData();
  }

  get_ConfigData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      token: this.token,
    };
    this.configService.getConfigDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
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
              calendly_link: data?.calendly_link,
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
              smtp_password: data?.smtp_password
            });
            window.scroll(0, 0);
          }
          else {
            this.msg_danger = true;
          }

        }
      },
    );
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addconfigForm.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    this.submitted = true;

    if (this.addconfigForm.invalid) {
      return;
    }

    const obj = this.addconfigForm.value;

    // Default fallback values
    obj.name = obj.name?.trim() || 'Admin';
    obj.status = obj.status?.trim() || 'Active';

    // Attach additional required fields
    obj['neelgund-admin-token'] = this.token;
    obj['image'] = this.configImage;
    obj['qrcode_image'] = this.QRcodeImage;
    obj['documents'] = this.document;

    // ConfigData is empty → ADD
    if (!this.ConfigData || this.ConfigData.length === 0) {
      this.configService.addConfig(obj).subscribe(
        (response) => {
          if (response.code === 200) {
            this.showSuccess(response.message);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
        () => this.toastr.errorToastr("Error adding config data.")
      );
    } else {
      // ConfigData exists → EDIT the single existing config
      const id = this.ConfigData[0]._id;

      this.configService.editConfigdata(obj, id).subscribe(
        (response) => {
          if (response.code === 200) {
            this.showSuccess(response.message);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
        () => this.toastr.errorToastr("Error updating config data.")
      );
    }
  }

  // Helper method to reduce duplicate success handling
  showSuccess(message: string) {
    this.throw_msg = message;
    this.msg_success = true;
    setTimeout(() => {
      this.router.navigate(['/config/view']);
      this.toastr.successToastr(message);
    }, 2000);
  }


  onUploadOutput(output: UploadOutput, type): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/config/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      if (type == "QRcode") {
        this.QRcodeImage = environment.baseUrl + '/public/' + output.file.response.result;
        this.isUpdate = true;
        // this.onUpdate(this.qrcode);
      } else {
        this.configImage.push(output.file.response.result);
      }
    }
  }


  deleteImage(index: any) {
    if (confirm("Are you sure to delete this Image")) {
      this.configImage.splice(index, 1)
    }
  }


  /**
   * Update
   */
  public onUpdate(qrcode) {
    qrcode
      .update(qrcode.config, {
        // frameOptions: {
        //   height: 550,
        //   width: 325,
        // },
        image: this.QRcodeImage,
        data: this.addconfigForm.value.qrcode_url
      })
      .subscribe((res) => {
        // TO DO something!
        this.isUpdate = false;
        console.log('update:', res);
        console.log('Element:', res?.container?.querySelector('canvas'));
      });
  }

  /**
   * Download
   */
  onDownload(qrcode): void {
    qrcode.download('QR.png').subscribe((res) => {
      // TO DO something!
      console.log('download:', res);
    });
  }

  deleteQRImage() {
    if (confirm("Are you sure to delete this Image")) {
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

  onTestEmail(smtp_test_email: string) {
    // console.log(smtp_test_email);
    // const data = smtp_test_email
    const obj = {
      email: smtp_test_email
    };
    this.configService.testEmail(obj).subscribe(
      (response) => {
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
