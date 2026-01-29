import { Component, OnInit, ViewEncapsulation, EventEmitter , ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl,AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// Services
import { PageService } from '../../../providers/page/page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

   // Data Assign

   addPageForm:FormGroup;
   throw_msg:any; 
   submitted: boolean = false;
   msg_success: boolean = false;
   msg_danger: boolean = false;
   tagtexist:any;
 
   // Edit Action Here
   id:any;
   isEdit = this.route.snapshot.data.title === 'edit' ? true : false;

   
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private pageService:PageService
  )
  { 
    this.addPageForm = this.formBuilder.group({
      name: ['',Validators.required],
      global_spot_league: ['',Validators.required],
      top_league_title1: ['',Validators.required],
      top_league_description1: ['',Validators.required],
      top_league_title2: ['',Validators.required],
      top_league_description2: ['',Validators.required],
      top_league_title3: ['',Validators.required],
      top_league_description3: ['',Validators.required],
      top_league_title4: ['',Validators.required],
      top_league_description4: ['',Validators.required],
      top_league_title5: ['',Validators.required],
      top_league_description5: ['',Validators.required],
      active_user: ['',Validators.required],
      total_active_user: ['',Validators.required],
      download: ['',Validators.required],
      total_download: ['',Validators.required],
      winning_credit: ['',Validators.required],
      total_winning_credit: ['',Validators.required],
      meta_description: ['',Validators.required],
      meta_title: ['',Validators.required],
      meta_keywords: ['',Validators.required],
     }); 
  }

  public hasError = (controlName: string, errorName: string) => { 
    return this.addPageForm.controls[controlName].hasError(errorName);
  };


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.isEdit) 
    {
      this.patchingdata(this.id);
    }
  }

  patchingdata(id:any) { 
    let obj = {id:id};
    this.pageService.getHomePageWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          this.addPageForm.patchValue({
            name: data?.page_name,
            global_spot_league: data?.global_spot_league,
            top_league_title1: data?.top_league_title1,
            top_league_description1: data?.top_league_description1,
            top_league_title2: data?.top_league_title2,
            top_league_description2: data?.top_league_description2,
            top_league_title3: data?.top_league_title3,
            top_league_description3: data?.top_league_description3,
            top_league_title4: data?.top_league_title4,
            top_league_description4: data?.top_league_description4,
            top_league_title5: data?.top_league_title5,
            top_league_description5: data?.top_league_description5,
            active_user: data?.active_user,
            total_active_user: data?.data?.active_user,
            download: data?.download,
            total_download: data?.total_download,
            winning_credit: data?.winning_credit,
            total_winning_credit: data?.total_winning_credit,
            meta_description: data?.meta_description,
            meta_title: data?.meta_title,
            meta_keywords: data?.meta_keywords,
          });
       }else{
          
        }
      },
    );
  }

  onSubmit(){
    this.submitted = true;
    let obj = this.addPageForm.value;
    let id  = this.id;
  
    if (this.addPageForm.invalid){
      return;
    }
  
    if(this.isEdit)
    {
      this.pageService.editHomePagedata(obj,id).subscribe(
        (response) => {
          if(response.code == 200) 
          {
            this.throw_msg = response.message 
            this.msg_success = true;
            setTimeout(()=>{                           
                this.router.navigate(['/page/homepage']);
            },2000);  
          } 
        },
      );    
    }
  }

}
