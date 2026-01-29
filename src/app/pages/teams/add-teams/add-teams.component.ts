import {  Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { TeamsService } from 'src/app/teams/teams.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-teams',
  templateUrl: './add-teams.component.html',
  styleUrls: ['./add-teams.component.scss']
})
export class AddTeamsComponent implements OnInit {
  @ViewChild('uploader', { read: ElementRef }) fileInput: ElementRef;

// File Upload
options: UploaderOptions;
uploadInput: EventEmitter<UploadInput>;
ImageName:any;
imagePath : any;

// Data Assign

addTeamsForm:FormGroup;
throw_msg:any; 
submitted: boolean = false;
msg_success: boolean = false;
msg_danger: boolean = false;
// Edit Action Here
applyAction: any;
id:any;
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
    private teamsservice:TeamsService,
    private toastr: ToastrManager
  ) {
    this.uploadInput = new EventEmitter<UploadInput>();
    this.addTeamsForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      phone: [''],
      description: ['',Validators.required],
      status: ['',Validators.required],
      job: [''],
     });
     this.imagePath = environment.baseUrl+'/public/';
   }
   public hasError = (controlName: string, errorName: string) => { 
    return this.addTeamsForm.controls[controlName].hasError(errorName);
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
    this.teamsservice.getTeamsWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.ImageName = data?.image;
          this.addTeamsForm.patchValue({
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
            description: data?.description, 
            status:data?.isDeleted,
            job:data?.job
          });
       }else{
          
        }
      },
    );
  }
  onSubmit(){
    this.submitted = true;
    let obj = this.addTeamsForm.value;
    let id  = this.id;
    
    obj['image'] = this.ImageName; 
    if (this.addTeamsForm.invalid){
      return;
    }
    
    if (!this.isEdit)
    {
      this.teamsservice.addTeams(obj).subscribe(
        (response) => {
          if(response.code == 200) 
          { 
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
              this.router.navigate(['/teams/view']);
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
      this.teamsservice.editTeamsdata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            // this.throw_msg = response.message 
            // this.msg_success = true;
            this.toastr.successToastr(response.message);
            setTimeout(()=>{                           
                this.router.navigate(['/teams/view']);
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
        url: environment.baseUrl+'/api/team/addimage',
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
    this.router.navigate(['/teams/view']);
  } 
}
