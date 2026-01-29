import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from '../../../../environments/environment';
// Services
import { TestimonialService } from '../../../providers/testimonial/testimonial.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  ImageName:any;
  imagePath : any;

  // Data Assign

  addTestimonialForm:FormGroup;
  throw_msg:any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;

  // Edit Action Here
  applyAction: any;
  id:any;
  show = false; // for tooltip
  show1 = false; // for tooltip
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
  jobs = [
    { id: 1, name: "User" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Admin" },
    { id: 4, name: "Developer" },
    { id: 5, name: "Others" },
  ];

  selected = [{ id: 1, name: "User" }];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private testimonialService:TestimonialService,
    private toastr: ToastrManager
  ){
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addTestimonialForm = this.formBuilder.group({
      name: ['',Validators.required],
      status: [true,Validators.required],
      title: [''],
      location: [''],
      text: ['',Validators.required],
      featured: [false],
      job: [''],
      ratings: ['',Validators.required]
     });
     this.imagePath = environment.baseUrl+'/public/testimonial/';
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addTestimonialForm.controls[controlName].hasError(errorName);
  };

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit)
    {
      this.patchingdata(this.id);
      this.applyAction = 'Update';
    }
    else
    {
      this.applyAction = 'Add';
    }
  }

  patchingdata(id:any) {
    let obj = {id:id};
    this.testimonialService.getTestimonialWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.ImageName = data?.image;
          this.addTestimonialForm.patchValue({
            name: data?.name,
            title: data?.title,
            location: data?.location,
            text: data?.text,
            featured:data?.featured,
            status:data?.status,
            job:data?.job,
            ratings:data?.ratings
          });
       }else{

        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addTestimonialForm.value;
    let id  = this.id;

    obj['image'] = this.ImageName;
    if (this.addTestimonialForm.invalid){
      return;
    }

    if (!this.isEdit)
    {
      this.testimonialService.addTestimonial(obj).subscribe(
        (response) => {
          if(response.code == 200)
          {
            // this.throw_msg   = response.message
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{
              this.router.navigate(['/testimonial/view']);
            },2000);
          }
          else if(response.code == 400)
          {
              // this.throw_msg  = response.message
              // this.msg_danger = true;
              this.toastr.errorToastr(response.message);
          }
        },
      );

    }
    else
    {
      this.testimonialService.editTestimonialdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200)
          {
            // this.throw_msg = response.message
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{
                this.router.navigate(['/testimonial/view']);
            },2000);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );
    }

  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue')
    {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl+'/api/testimonial/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if(output.type === 'done' && typeof output.file !== 'undefined')
    {
      this.ImageName = output.file.response.result;
    }
  }

  onCancel(){
    this.router.navigate(['/testimonial/view']);
  }

}
