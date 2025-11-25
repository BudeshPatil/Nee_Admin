import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'

// Services
import { VehicleService } from '../../../providers/vehicle/vehicle.service';
import { from } from 'rxjs';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.scss']
})
export class ViewVehicleComponent {
  msg_danger: boolean = false;
  vehicleData: any;

  // pagination
  currentPage: number  = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number  = 0;
  searchText = '';
  imagePath : any;
  isFilterActive : boolean = false;
  filterArray:any = [];
  _id:any;
  filter_price_from:number = 0;
  filter_price_to:number = 0;
  filter_quantity_from:number = 0;
  filter_quantity_to:number = 0;
  name:any;
  vehicle_type:any;
  sku:any;
  visibility:any;
  status:any = 'true';
  user: any;
  config = {
    value: true,
    name: '',
    disabled: false,
    height: 25,
    width: 80,
    margin: 3,
    fontSize: 10,
    speed: 300,
    color: {
      checked: 'green',
      unchecked: '#423f3f',
    },
    switchColor: {
      checked: 'crimson',
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
  selectedVehicle:any;
  modalReference = null;
  closeResult = '';
  constructor(
    private router: Router,
    private vehicleService:VehicleService,
    public loginService: LoginService,
    private modalService: NgbModal,
		private activeModal: NgbActiveModal
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    let tempuser = localStorage.getItem('user'); 
    this.user = JSON.parse(tempuser);
    this.filterArray.push({
      vehicle_type: 'configurable'
    });
   }

  ngOnInit(): void {
    this.get_vehicleData();
  }

  get_vehicleData()
  {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
    };
    if(this.filterArray && this.filterArray.length > 0){
      obj['filterArray'] = this.filterArray
    }
    this.vehicleService.getVehicleDetails(obj).subscribe(
        (response)=> {
          if (response.code == 200) 
          {
            if(response.result != null && response.result != '')
            {
              this.vehicleData = response.result; 
              this.totalRecord = response?.count;
              if(this.filterArray && this.filterArray.length > 0){
                this.updateFilterInUsers();
              }
              window.scroll(0,0); 
            }
            else
            {
              this.msg_danger   = true;
              this.vehicleData = [];
            }
           
          }
        },
      );
  }

  onListChangePage(event:any) {
    this.currentPage = event;
    this.get_vehicleData();
  }
  
  deleteVehicle()
  {
    if (this.selectedVehicle) {
			var mylist = { id: this.selectedVehicle._id };
      this.vehicleService.deletevehicle(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_vehicleData();
            this.router.navigate(['/vehicle/view']);
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  open(content,data) {
    this.selectedVehicle = data;
		if (this.selectedVehicle) {
		var mylist = { id: this.selectedVehicle._id };
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

  searchVehicle(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_vehicleData();
  }

  onListChangeLimit(event: any) {
    this.currentLimit = parseInt(event.target.value);
    this.get_vehicleData();
  }

  toggelFilter(){
    if(this.isFilterActive){
      this.isFilterActive = false;
    } else {
      this.isFilterActive = true;
    }
  }

  applyFilter(){
    this.filterArray = [];
    if(this._id){
      this.filterArray.push({
        _id: this._id.trim()
      });
    }
    if(this.name){
      this.filterArray.push({
        name: this.name.trim()
      });
    }
    if(this.vehicle_type){
      this.filterArray.push({
        vehicle_type: this.vehicle_type
      });
    }
    if(this.sku){
      this.filterArray.push({
        sku: this.sku.trim()
      });
    }
    if(this.visibility){
      this.filterArray.push({
        visibility: this.visibility
      });
    }
    if(this.status){
      this.filterArray.push({
        status: this.status == 'true'? true : false
      });
    }
    if(this.filter_price_to){
      this.filterArray.push({
        sale_price:{$gte: this.filter_price_from, $lt: this.filter_price_to}
      });
    }
    if(this.filter_quantity_to){
      this.filterArray.push({
        vehicle_count:{$gte: this.filter_quantity_from, $lt: this.filter_quantity_to}
      });
    }
    this.get_vehicleData();
  }
  
  clearFilter(){
    this._id = '';
    this.name = '';
    this.sku = '';
    this.vehicle_type = '';
    this.status = '';
    this.visibility = '';
    this.filterArray = [];
    this.filter_price_to = 0;
    this.filter_price_from = 0;
    this.filter_quantity_to = 0;
    this.filter_quantity_from = 0;
    this.get_vehicleData();
  }

  updateFilterInUsers(){
    if(this.user){
      let obj = this.user;
      obj['filter'] = this.filterArray;
      obj['id'] = this.user._id;
      this.loginService.updateProfile(obj).subscribe(
          (response) => {
            if(response.code == 200) 
            {
              console.log('Filter Updated to User');
            } else {
              console.log('Failed to Updated filters')
            } 
          },
      );    
    }
  }
}
