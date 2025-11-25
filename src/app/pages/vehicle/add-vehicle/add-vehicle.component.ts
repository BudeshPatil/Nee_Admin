import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import { VehicleService } from '../../../providers/vehicle/vehicle.service';
import { from } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { CategoryService } from '../../../providers/category/category.service';
import { ReviewService } from '../../../providers/review/review.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SubcategoryService } from '../../../providers/subcategory/subcategory.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SizeService } from '../../../providers/size/size.service';
import { ColourService } from '../../../providers/colour/colour.service';
import { MediaService } from '../../../providers/media/media.service';
import { AttributesService } from 'src/app/providers/attributes/attributes.service';
import { CollectionService } from 'src/app/providers/collection/collection.service';
import { CollectioncategoryService } from 'src/app/providers/collectioncategory/collectioncategory.service';
import { BodytypeService } from 'src/app/providers/bodytype/bodytype.service';
import { BrandService } from 'src/app/providers/brand/brand.service';
import { ModelService } from 'src/app/providers/model/model.service';
import { FeatureService } from 'src/app/providers/feature/feature.service';
import { CartypeService } from 'src/app/providers/cartype/cartype.service';
import { LocationService } from 'src/app/providers/location/location.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {
  addVehicleForm: FormGroup;
  addReviewForm: FormGroup;
  addAttributeForm: FormGroup;
  throw_msg: any;
  submitted: boolean = false;
  msg_success: boolean = false;
  msg_danger: boolean = false;
  videomsg: boolean = false;
  applyAction: any;
  id: any;
  public data = [];
  isEdit = this.route.snapshot.data.title === 'edit' ? true : false;
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
      { class: 'vehicle_box', name: 'Rajdhani sans-serif' },
    ],
  }
  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  selectedFile: any;
  document: any;
  imagePath: any;
  url: any;
  vehicleImage: any;
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
    yes_no_labels: {
      unchecked: 'No',
      checked: 'Yes',
    },
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
  };
  isactive: any;
  relatedVehicleData: any = [];
  searchText = '';
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  vehicleData: any;
  closeResult = '';
  reviewData: any = [];
  seletdreview: any;
  sizeList = [];
  dropdownSettings: any = {};
  colourData: any = [];
  mediaData: any = [];
  descriptionImages: any = [];
  stylingtipData: any = [];
  fabricData: any = [];
  deletedMedia: any = [];
  vehicleGalleryData: any;
  public loadContent: boolean = false;
  addmediaForm: FormGroup;
  token: any;
  mediaFile: any;
  fileFormat: any;
  vehicle_gallery_temp: any = [];
  vehicle_gallery_final: any = [];
  vehicle_description_gallery: any = [];
  temp_sequence_number = 0;
  submittedMedia: boolean = false;
  attributeData: any = [];
  isfastdelivery: any;
  imageData: any;
  seletedAttribute: any = [];
  related_vehicles: any = [];
  available_colors: any = [];
  availableVehiclesList: any = [];
  uploadedFiles: any = [];
  isUploaded: boolean = false;
  config_step_1: boolean = true;
  config_step_2: boolean = false;
  config_step_3: boolean = false;
  configureColorData: any = [];
  colorForm: FormGroup;
  public configColorList: FormArray;
  configColorForm: FormGroup;
  selectedconfigureColor: any;
  modalReference: any = null;
  isMediaDeleted = false;
  deletedMediaData: any;
  isMediaFileDeleted = false;
  deletedMediaFile: any = [];
  isMediaEdit = false;
  mediaID: any;
  deletedMediaFiles: any = [];
  seletedCol: any;
  seletedProdCat: any;
  bodytypeData: any = [];
  bodytypeDataCar: any = [];
  bodytypeDataYacht: any = [];
  brandData: any = [];
  modelData: any = [];
  featureData: any = [];
  featureListCar: any = [];
  featureListYacht: any = [];
  cartypeData:any = [];
  locationData:any = [];
  locationList:any = [];
  availableYears = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                    2020, 2021, 2022, 2023, 2024, 2025]
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private vehicleservice: VehicleService,
    private toastr: ToastrManager,
    private modalService: NgbModal,
    public reviewService: ReviewService,
    public colorService: ColourService,
    private mediaService: MediaService,
    private attributeService: AttributesService,
    public bodytypeService:BodytypeService,
    public brandService:BrandService,
    public modelService: ModelService,
    public featureService : FeatureService,
    public cartypeservice : CartypeService,
    public locationService: LocationService
  ) {
    this.data = [
      { item_id: 1, item_text: 'Hanoi' },
      { item_id: 2, item_text: 'Lang Son' },
      { item_id: 3, item_text: 'Vung Tau' },
      { item_id: 4, item_text: 'Hue' },
      { item_id: 5, item_text: 'Cu Chi' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
    this.addVehicleForm = this.formBuilder.group({
      status: [true, Validators.required],
      vehicle_type: ['Car', Validators.required],
      attribute_set: [''],
      registration_number: [''],
      name: ['', Validators.required],
      vehicle_id: ['', Validators.required],
      manufacture: [''],
      year: [''],
      fuelType: [''],
      brandId: [''],
      modelId: [''],
      bodyTypeId: [''],
      featureIds: [],
      rentalType: ['Daily', Validators.required],
      regularRateDaily: [''],
      regularRateHalfDay: [''],
      regularRateHourly: [''],
      regularRateWeekly: [''],
      regularRateMonthly: [''],
      dailyRate: [''],
      halfdayRate: [''],
      hourlyRate: [''],
      weeklyRate: [''],
      monthlyRate: [''],
      image: [''],
      vehicle_gallery: [],
      availabilityStatus: [''],
      currentLocation: [''],
      pickupLocation: [''],
      dropLocation: [''],
      availableFromDate: [''],
      availableToDate: [''],
      description: [''],
      short_description: [''],
      segment: [''],

      rating: [false, Validators.required],
      popularityScore: [''],
      color: [''],
      home_vehicle: [true, Validators.required],
      latest_vehicle: [true, Validators.required],
      featured_vehicle: [true, Validators.required],
      // Car Type Vehicles Form Fileds
      cartype: [''],
      transmission: [''],
      seating_capacity: [''],
      door_count: [''],
      mileage: [''],
      drive_type: [''],
      engine_size: [''],
      // Yachts Type Vehicles Form Fileds
      length: [''],
      beam: [''],
      draft: [''],
      hull_material: [''],
      flag: [''],
      gross_tonnage: [''],
      cruising_speed: [''],
      builder: [''],
      model: [''],
      exterior_designer: [''],
      interior_design: [''],
      summer_price: [''],
      winter_price: [''],
      operating_area: [''],
      crew_included: [true],
      fuel_capacity: [''],
      water_capacity: [''],
      generator: [true],
      stabilizers: [true],
      guest_capacity: [''],
      sleeping_capacity: [''],
      cabin_count: [''],
      berth_count: [''],
      head_count: [''],
      crew_cabins: [''],
      crew_capacity: [''],
      // General form fields
      visibility: [''],
      related_vehicles: [],
      isvipNumberPlate: [false],
      url_key: ['', Validators.required],
      sequence_number: [''],
      meta_description: [''],
      meta_title: [''],
      meta_keywords: [''],
      searchText:['']

    });
    this.addReviewForm = this.formBuilder.group({
      customername: [''],
      vehicle: [''],
      isApproved: [''],
      rating: [''],
      description: [''],
      summary: ['']
    });
    this.addmediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      sequence_number: [''],
      src: ['', Validators.required],
      format: [''],
      file_type: ['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
      width: [''],
      mute: ['muted'],
      autoplay: [true],
      loop: [true],
      full_screen: [''],
    });
    this.colorForm = this.formBuilder.group({
      color: []
    });
    this.uploadInput = new EventEmitter<UploadInput>();
    this.token = localStorage.getItem('ghoastrental-token');
    this.addAttributeForm = this.formBuilder.group({});
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addVehicleForm.controls[controlName].hasError(errorName);
  };


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imagePath = environment.baseUrl + '/public/';
    this.url = environment.Url + '/assets';
    let tempuser = localStorage.getItem('user');
    this.user = JSON.parse(tempuser);
    if (this.isEdit) {
      this.patchingdata(this.id);
      this.get_related_vehicleData();
      this.applyAction = 'Update';
    }
    else {
      this.applyAction = 'Add';
    }
    this.getBodyTypeData();
    this.getBodyTypeCarData();
    this.getBodyTypeYachtData();
    this.getBrandData();
    this.getModelsData();
    this.getFeatureData();
    this.getCarTypeData();
    this.get_reviewData();
    this.getColorData();
    this.getAttributeData();
    this.getLocationData()
    window.scroll(0, 0);
    this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = 'green';
    this.isactive = 'none';
    this.isfastdelivery = 'none';

    //creating Configure Vehicles
  }

  get f() {
    return this.addVehicleForm.controls;
  }

  // If Vehicle data Existed get the form data
  patchingdata(id: any) {
    let obj = { id: id };
    this.vehicleservice.getVehicleWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result[0];
          if (data?.image_data) {
            this.imageData = data?.image_data[0];
          }
          if (data?.vehicle_gallery) {
            this.vehicle_gallery_temp = data?.vehicle_gallery;
          } else {
            this.vehicle_gallery_temp = [];
          }
          if (data?.gallery_image) {
            this.mediaData = data?.gallery_image;
            this.temp_sequence_number = data?.gallery_image.length;
          } else {
            this.mediaData = [];
          }
          if (data?.related_vehicle_data) {
            this.relatedVehicleData = data?.related_vehicle_data;
          } else {
            this.relatedVehicleData = [];
          }
          if (data?.related_vehicles) {
            this.related_vehicles = data?.related_vehicles;
          } else {
            this.related_vehicles = [];
          }
          if (data?.available_color) {
            this.available_colors = data?.available_color;
          } else {
            this.available_colors = [];
          }
          let tempfeatures: any = [];
          if (data?.featureIds) {
            data.featureIds.forEach((item, index) => {
              tempfeatures.push({ _id: item._id, name: item.name });
            });
          }
          if (data?.vehicle_description_gallery) {
            this.vehicle_description_gallery = data?.vehicle_description_gallery;
          } else {
            this.vehicle_description_gallery = [];
          }

          if (data?.description_images) {
            this.descriptionImages = data?.description_images;
          } else {
            this.descriptionImages = [];
          }
          let tempPickupLocation: any = [];
          if (data?.pickupLocation && data?.dropLocation.length > 0) {
            data.pickupLocation.forEach((item, index) => {
              tempPickupLocation.push({ _id: item._id, name: item.name });
            });
          }
          let tempDropLocation: any = [];
          if (data?.dropLocation) {
            data.dropLocation.forEach((item, index) => {
              tempDropLocation.push({ _id: item._id, name: item.name });
            });
          }
          this.addVehicleForm.patchValue({
            status: data?.status,
            vehicle_type: data?.vehicle_type,
            attribute_set: data?.attribute_set,
            registration_number: data?.registration_number,
            isvipNumberPlate: data?.isvipNumberPlate == true ? true : false,
            name: data?.name,
            vehicle_id: data?.vehicle_id,
            manufacture: data?.manufacture,
            year: data?.year,
            bodyTypeId: data?.bodyTypeId,
            fuelType: data?.fuelType,
            brandId: data?.brandId,
            modelId: data?.modelId,
            featureIds: tempfeatures,
            regularRateDaily: data?.regularRateDaily,
            regularRateHalfDay: data?.regularRateHalfDay,
            regularRateHourly: data?.regularRateHourly,
            regularRateWeekly: data?.regularRateWeekly,
            regularRateMonthly: data?.regularRateMonthly,
            rentalType: data?.rentalType,
            dailyRate: data?.dailyRate,
            halfdayRate: data?.halfdayRate,
            hourlyRate: data?.hourlyRate,
            weeklyRate: data?.weeklyRate,
            monthlyRate: data?.monthlyRate,
            image: data?.image,
            vehicle_gallery: data?.vehicle_gallery,
            availabilityStatus: data?.availabilityStatus,
            currentLocation: data?.currentLocation,
            pickupLocation: tempPickupLocation,
            dropLocation: tempDropLocation,
            availableFromDate: moment(data?.availableFromDate).format('YYYY-MM-DD hh:mm:ss'),
            availableToDate: moment(data?.availableToDate).format('YYYY-MM-DD hh:mm:ss'),
            engine_size: data?.engine_size,
            description: data?.description,
            short_description: data?.short_description,
            drive_type: data?.drive_type,
            rating: data?.rating,
            color: data?.color,
            home_vehicle: data?.home_vehicle,
            latest_vehicle: data?.latest_vehicle,
            featured_vehicle: data?.featured_vehicle,
            cartype: data?.cartype,
            transmission: data?.transmission,
            seating_capacity: data?.seating_capacity,
            door_count: data?.door_count,
            mileage: data?.mileage,
            length: data?.length,
            beam: data?.beam,
            draft: data?.draft,
            hull_material: data.hull_material,
            flag: data.flag,
            gross_tonnage: data?.gross_tonnage,
            cruising_speed: data?.cruising_speed,
            builder: data?.builder,
            model: data.model,
            exterior_designer: data.exterior_designer,
            interior_design: data.interior_design,
            summer_price: data.summer_price,
            winter_price: data?.winter_price,
            operating_area: data?.operating_area,
            crew_included: data?.crew_included,
            fuel_capacity: data.fuel_capacity,
            water_capacity: data.water_capacity,
            generator: data.generator,
            stabilizers: data?.stabilizers,
            guest_capacity: data?.guest_capacity,
            sleeping_capacity: data?.sleeping_capacity,
            cabin_count: data.cabin_count,
            berth_count: data.berth_count,
            head_count: data.head_count,
            crew_cabins: data.crew_cabins,
            crew_capacity: data.crew_capacity,
            visibility: data?.visibility,
            related_vehicles: data?.related_vehicles,
            url_key: data?.url_key,
            sequence_number: data?.sequence_number,
            meta_description: data?.meta_description,
            meta_title: data?.meta_title,
            meta_keywords: data?.meta_keywords,
          });
        } else {

        }
      });
  }

  // Submit Vehicle Data and Save into DataBase
  onSubmit() {
    this.submitted = true;
    let obj = this.addVehicleForm.value;
    let id = this.id;
    obj['art_by'] = this.user._id;
    obj['vehicle_gallery'] = this.vehicle_gallery_temp;
    obj['related_vehicles'] = this.related_vehicles;
    if (this.imageData) {
      obj['image'] = this.imageData._id;
    }
    if (this.addVehicleForm.invalid) {
      return;
    }
    if (!this.isEdit) {
      this.vehicleservice.addVehicle(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            if (this.isMediaDeleted) {
              this.deleteMediaData();
            }
            if (this.isMediaFileDeleted) {
              this.deleteMediaFile();
            }
            this.toastr.successToastr(response.message);
            setTimeout(() => {
              this.router.navigate(['/vehicle/view']);
            }, 3000);
          }
          else {
            // this.throw_msg  = response.message
            // this.msg_danger = true;
            this.toastr.errorToastr(response.message);
          }
        },
      );
    } else {
      this.vehicleservice.editvehicledata(obj, id).subscribe(
        (response) => {
          if (response.code == 200) {
            this.toastr.successToastr(response.message);
            if (this.isMediaDeleted) {
              this.deleteMediaData();
            }
            if (this.isMediaFileDeleted) {
              this.deleteMediaFile();
            }
            setTimeout(() => {
              this.router.navigate(['/vehicle/view']);
            }, 3000);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );

    }
  }
  // on click of cancel button navigate to vehicle view page and Delete the images which are uploaed and not used
  onCancel() {
    this.router.navigate(['/vehicle/view']);
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      let obj = {};
      obj['files'] = this.uploadedFiles;
      this.mediaService.deletemultifiles(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            this.isUploaded = false;
            this.mediaFile = '';
          }
          else {
            // this.bannerVideo = this.bannerVideo;
          }
        },
      );
    }
  }

  //**************** following methods to get all required prevalues *****************//

  //Get Preloaded Bodytype data
  getBodyTypeData() {
    let obj = {};
    this.bodytypeService.getallBodytypeDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.bodytypeData = response?.result;
        } else {

        }
      });
  }

	getBodyTypeCarData() {
		let obj = {};
		this.bodytypeService.getallBodytypeDetails(obj).subscribe((response) => {
			if (response.code == 200) {
				this.bodytypeDataCar = (response.result || []).filter(item => item.type === 'Car');
			} else {
				// Handle error or show message
			}
		});
	}

	getBodyTypeYachtData() {
  let obj = {};
  this.bodytypeService.getallBodytypeDetails(obj).subscribe((response) => {
    if (response.code == 200) {
      this.bodytypeDataYacht = (response.result || []).filter(item => item.type === 'Yachts');
    } else {
      // Handle error or show message
    }
  });
}

  //Get Preloaded Brand data
  getBrandData() {
    let obj = {};
    this.brandService.getallBrandDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.brandData = response?.result;
        } else {

        }
      });
  }

  //Get Model Data
  getModelsData() {
    let obj = {};
    this.modelService.getallModelDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.modelData = response?.result;
        } else {

        }
      });
  }

  //Get Preloaded Feature data
	getFeatureData() {
		const obj = {};
		this.featureService.getallFeatureDetails(obj).subscribe(
			(response) => {
				if (response.code === 200) {
					this.featureData = response?.result || [];

					this.featureListCar = [];
					this.featureListYacht = [];

					this.featureData.forEach((item) => {
						const feature = {
							_id: item._id,
							name: item.name,
						};

						const vehicleType = item.vehicle_type?.toLowerCase();

						if (vehicleType === 'car') {
							this.featureListCar.push(feature);
						} else if (vehicleType === 'yachts') {
							this.featureListYacht.push(feature);
						}
					});
				} else {
					console.error('Failed to load feature data:', response);
				}
			},
			(error) => {
				console.error('Error fetching feature data:', error);
			}
		);
	}





  //Get Preloaded Attribute Data
  getAttributeData() {
    let obj = {};
    this.attributeService.getallAttributeSetDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.attributeData = response?.result;
        } else {

        }
      });
  }

  getCarTypeData() {
    this.cartypeservice.getallCartypeDetails({}).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.cartypeData = response.result;
          }
          else {
          }
        }
      },
    );
  }

  //Get Preloaded Attribute Data
  getLocationData() {
    let obj = {};
    this.locationService.getallLocationDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.locationData = response?.result;
          if (this.locationData && this.locationData.length > 0) {
            let tempData = [];
            this.locationData.forEach((item, index) => {
              tempData.push({ _id: item._id, name: item.name });
            });
            this.locationList = tempData;
          }
        } else {

        }
      });
  }


  //Get Preloaded Color data
  getColorData() {
    let obj = {};
    this.colorService.getallColours(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.colourData = response?.result;
        } else {

        }
      });
  }

  get getsubcategory() {
    return this.addVehicleForm.controls;
  }


  //*************** End Preloaded data methods ************************//

  //************ Change the Values *************//
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

  changeFasttDelivery() {
    if (this.isfastdelivery != 'none') {
      this.config.switchColor.checked = '#ffffff';
      this.config.color.checked = 'green';
      this.config.labels.checked = 'Active';
    } else {
      if (this.isfastdelivery) {
        this.isfastdelivery = false;
        this.config.switchColor.unchecked = 'crimson';
        this.config.color.unchecked = '#423f3f';
        this.config.labels.unchecked = 'Deactive';
      } else {
        this.isfastdelivery = true
      }
    }
  }

  setAttributeData(attrId) {
    if (attrId) {
      let tempattr = this.attributeData.filter((attr) => attr._id == attrId);
      if (tempattr && tempattr.length > 0) {
        this.seletedAttribute = tempattr[0];
      }
      if (this.seletedAttribute && this.seletedAttribute.attribute_data.length > 0) {
        this.seletedAttribute.attribute_data.forEach((attrb) => {
          if (attrb) {
            let controname = attrb.name;
            if (attrb.isRequired) {
              this.addAttributeForm.addControl(controname, this.formBuilder.control('', Validators.required));
            } else {
              this.addAttributeForm.addControl(controname, this.formBuilder.control(''));
            }


          }
        });
      }
    }
  }

  //******************* Starts Media Image/Video Section ***************//
  openMedia(content: any) {
    this.addmediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      sequence_number: [''],
      src: ['', Validators.required],
      format: [''],
      file_type: ['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
      width: [''],
      mute: ['muted'],
      autoplay: [true],
      loop: [true],
      full_screen: [''],
    });
    this.mediaFile = '';
    this.isMediaEdit = false;
    this.mediaID = '';
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  editMedia(content: any, mediaData, type) {
    this.isMediaEdit = true;
    this.mediaID = mediaData._id;
    this.mediaFile = mediaData.src;
    this.addmediaForm.patchValue({
      name: mediaData.name,
      status: mediaData.status,
      sequence_number: mediaData.sequence_number,
      src: mediaData.src,
      format: mediaData.format,
      file_type: mediaData.file_type,
      alt: mediaData.alt,
      role: mediaData.role,
      resolution: mediaData.resolution,
      size: mediaData.size,
      height: mediaData.height,
      width: mediaData.width,
      mute: mediaData.mute,
      autoplay: mediaData.autoplay,
      loop: mediaData.loop,
      full_screen: mediaData.full_screen,
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  public hasMediaFormError = (controlName: string, errorName: string) => {
    return this.addmediaForm.controls[controlName].hasError(errorName);
  };

  onSubmitMedia(type) {
    let obj = this.addmediaForm.value;
    let id = this.mediaID;
    obj['token'] = this.token;
    obj['src'] = this.mediaFile;
    obj['format'] = this.fileFormat;
    this.submittedMedia = true;
    if (this.addmediaForm.invalid) {
      return;
    }
    if (!id) {
      this.mediaService.addMedia(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            this.submittedMedia = false;
            this.uploadedFiles.push(this.mediaFile);
            this.toastr.successToastr(response.message);
            if (type == 'image') {
              this.imageData = response.result;
              this.mediaFile = '';
              this.modalService.dismissAll();
            } else if (type == 'description_image') {
              if (this.addmediaForm.value.sequence_number) {
                this.temp_sequence_number = this.addmediaForm.value.sequence_number
              } else {
                this.temp_sequence_number = this.temp_sequence_number + 1;
              }
              let description_image = {
                media_id: response.result._id,
                file_name: response.result.name,
                sequence_number: this.addmediaForm.value.sequence_number
              };
              this.descriptionImages.push(response.result);
              this.vehicle_description_gallery.push(description_image);
              this.mediaFile = '';
              this.modalService.dismissAll();
            } else if (type == 'config') {
              if (this.selectedconfigureColor && this.configureColorData.length > 0) {
                this.configureColorData.forEach((configColor) => {
                  if (configColor._id == this.selectedconfigureColor._id) {
                    if (configColor && configColor.vehicle_gallery) {
                      configColor.vehicle_gallery.push(response.result);
                    } else {
                      let tempcg = [];
                      tempcg.push(response.result)
                      configColor['vehicle_gallery'] = tempcg;
                    }
                  }
                });
              }
              this.addmediaForm = this.formBuilder.group({
                name: ['', Validators.required],
                status: [true, Validators.required],
                sequence_number: [''],
                src: ['', Validators.required],
                format: [''],
                file_type: ['image'],
                alt: [''],
                role: [''],
                resolution: [''],
                size: [''],
                height: [''],
                width: [''],
                mute: ['muted'],
                autoplay: [true],
                loop: [true],
                full_screen: [''],
              });
              this.mediaFile = '';
              this.modalReference.close();
            } else {
              if (this.addmediaForm.value.sequence_number) {
                this.temp_sequence_number = this.addmediaForm.value.sequence_number
              } else {
                this.temp_sequence_number = this.temp_sequence_number + 1;
              }
              this.vehicle_gallery_temp.push({
                media_id: response.result._id,
                file_name: response.result.name,
                sequence_number: this.addmediaForm.value.sequence_number
              });
              this.mediaData.push(response.result);
              this.mediaFile = '';
              this.modalService.dismissAll();
            }
            this.isUploaded = false;
            this.addmediaForm = this.formBuilder.group({
              name: ['', Validators.required],
              status: [true, Validators.required],
              sequence_number: [''],
              src: ['', Validators.required],
              format: [''],
              file_type: ['image'],
              alt: [''],
              role: [''],
              resolution: [''],
              size: [''],
              height: [''],
              width: [''],
              mute: ['muted'],
              autoplay: [true],
              loop: [true],
              full_screen: [''],
            });
          }
          else {
            this.toastr.errorToastr(response.message);
          }
        },
      );
    } else {
      if (id) {
        this.mediaService.editMediadata(obj, id).subscribe(
          (response) => {
            if (response.code == 200) {
              this.throw_msg = response.message
              this.msg_success = true;
              this.toastr.successToastr(response.message);
              this.addmediaForm = this.formBuilder.group({
                name: ['', Validators.required],
                status: [true, Validators.required],
                sequence_number: [''],
                src: ['', Validators.required],
                format: [''],
                file_type: ['image'],
                alt: [''],
                role: [''],
                resolution: [''],
                size: [''],
                height: [''],
                width: [''],
                mute: ['muted'],
                autoplay: [true],
                loop: [true],
                full_screen: [''],
              });
              if (this.id) {
                this.patchingdata(this.id);
              }
              this.deleteMediaFile();
              this.modalService.dismissAll();
            } else {
              this.throw_msg = response.message
              this.msg_danger = true;
              this.toastr.errorToastr(response.message);
            }
          },
        );
      }
    }
  }

  onUploadOutputMedia(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/media/addimage',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.fileFormat = output.file.type
      if (this.mediaFile) {
        this.deletedMediaFile.push(this.mediaFile);
        this.isMediaFileDeleted = true;
      }
      this.mediaFile = output.file.response.result;
      this.addmediaForm.value.resolution = output.file.size;
      this.submittedMedia = false;
      this.addmediaForm.patchValue({
        src: this.mediaFile
      });
      this.isUploaded = true;
    }
  }

  onUploadVideo(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: environment.baseUrl + '/api/media/addVideo',
        method: 'POST',
        data: {},
      };
      this.uploadInput.emit(event);
    }
    else if (output.type === 'done' && typeof output.file !== 'undefined') {
      this.fileFormat = output.file.type
      if (this.mediaFile) {
        this.deletedMediaFile.push(this.mediaFile);
        this.isMediaFileDeleted = true;
      }
      this.mediaFile = output.file.response.result;
      this.submittedMedia = false;
      this.addmediaForm.patchValue({
        src: this.mediaFile
      });
      this.isUploaded = true;
    }
  }

  deleteMedia(i, type, id) {
    if (type == 'image' && this.imageData) {
      this.deletedMediaFiles.push(this.imageData.src);
      this.deletedMediaData = { id: this.imageData._id, src : this.imageData.src };
      this.isMediaDeleted = true;
      this.imageData = null;
    } else {
      let tempMedia = this.mediaData.filter((item) => item._id == id);
      if (tempMedia && tempMedia.length > 0) {
        this.deletedMediaFiles.push(tempMedia[0].src);
        this.deletedMediaData = { id: tempMedia[0]._id, src : tempMedia[0].src };
        this.isMediaDeleted = true;
      }
      this.vehicle_gallery_temp.splice(i, 1);
      this.mediaData.splice(i, 1);
    }
  }

  deleteDescMedia(i) {
    this.descriptionImages.splice(i, 1);
    this.vehicle_description_gallery.splice(i, 1);
  }

  selectImageRole(event, role) {
    if (role == 'base') {
      this.addmediaForm.patchValue({
        height: 1100,
        width: 1100,
      });
    } else if (role == 'small') {
      this.addmediaForm.patchValue({
        height: 309,
        width: 309,
      });
    } else if (role == 'thumbnail') {
      this.addmediaForm.patchValue({
        height: 150,
        width: 150,
      });
    }
  }

  onCancelMedia() {
    this.addmediaForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: [true, Validators.required],
      sequence_number: [''],
      src: ['', Validators.required],
      format: [''],
      file_type: ['image'],
      alt: [''],
      role: [''],
      resolution: [''],
      size: [''],
      height: [''],
      width: [''],
      mute: ['muted'],
      autoplay: [true],
      loop: [true],
      full_screen: [''],
    });
    this.modalService.dismissAll();
    if (this.mediaFile) {
      this.deletedMediaFile.push(this.mediaFile);
      this.deleteMediaFile();
    }
  }


  deleteMediaFile() {
    if (this.isUploaded && this.deletedMediaFile && this.deletedMediaFile.length > 0) {
      let obj = {};
      obj['files'] = this.deletedMediaFile;
      this.mediaService.deletemultifiles(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            this.isUploaded = false;
            this.mediaFile = '';
            this.deletedMediaFile = [];
          }
        },
      );
    }
  }

  // deleteMediaData() {
  //   if (this.deletedMediaData) {
  //     let obj = {};
  //     obj['file'] = this.deletedMediaData;
  //     this.mediaService.deletefile(obj).subscribe(
  //       (response) => {
  //         if (response.code == 200) {
  //           this.deletedMediaFile = [];
  //           this.modalService.dismissAll();
  //         }
  //       },
  //     );
  //   }
  // }

  deleteMediaData()
  {
    if (this.deletedMediaData) {
			var mylist = { id: this.deletedMediaData.id, file:this.deletedMediaData.src };
      this.mediaService.deletemedia(mylist).subscribe(
        (response)=> {
          if (response.code == 200)
          {
            this.deletedMediaData = {};
            window.location.reload();
						this.modalService.dismissAll();
          }
        },
      );
    }
  }

  //*************** End Media Image/Video Section ****************//

  get fcolor() {
    return this.colorForm.controls;
  }

  selectColors(data: any) {
    let tempcolorData = this.colourData.filter((color) => color._id == data._id);
    if (tempcolorData && tempcolorData.length > 0 && this.configureColorData.length > 0) {
      let isColorPrasent = this.configureColorData.filter((color) => color._id == data._id);
      if (isColorPrasent.length == 0) {
        this.configureColorData.push(tempcolorData[0]);
        // this.configColorList.push(this.createConfigColorFormOption(data, 'new'));
      }
    } else {
      this.configureColorData.push(tempcolorData[0]);
      // this.configColorList.push(this.createConfigColorFormOption(data, 'new'));
    }
  }


  //*************** Starts Review Methods *********************************//

  get_reviewData() {
    const obj = {
      id: this.id
    };
    this.reviewService.getReviewDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.reviewData = response.result;
          }
          else {
            this.msg_danger = true;
          }

        }
      },
    );
  }

  deleteReview(id) {
    if (confirm("Are you sure to delete this Review")) {
      var mylist = { id: id };
      this.reviewService.deletereview(mylist).subscribe(
        (response) => {
          if (response.code == 200) {
            this.get_reviewData();
            // this.router.navigate(['/review/view']);
          }
        },
      );
    }
  }

  editreview(review: any, reviewData: any) {
    this.seletdreview = reviewData;
    this.addReviewForm.patchValue({
      isApproved: reviewData.isApproved,
      customername: reviewData.name,
      vehicle: reviewData.vehicle_name,
      rating: reviewData.rating,
      description: reviewData.description,
      summary: reviewData.summary
    });
    this.modalService.open(review, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  changeReviewStatus() {
    let obj = this.addReviewForm.value;
    obj['user_id'] = this.seletdreview.user_id;
    obj['vehicle_id'] = this.seletdreview.vehicle_id;
    let id = this.seletdreview._id;
    this.reviewService.editreviewdata(obj, id).subscribe(
      (response) => {
        if (response.code == 200) {
          this.toastr.successToastr(response.message);
          setTimeout(() => {
            this.get_reviewData();
          }, 2000);
        } else {
          this.toastr.errorToastr(response.message);
        }
      },
    );
  }
  //*************** End Review Methods *********************************//


  //*************** Start Related Vehicles List *************************//

  searchVehicle() {
    if (this.searchText) {
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_related_vehicleData();
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_related_vehicleData();
  }

  openRelatedVehicleModal(content: any) {
    this.get_related_vehicleData();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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

  addRelatedVehicle(vehicle, index) {
    let rvehicle = {
      vehicle_id: vehicle._id,
      vehicle_gallery: vehicle.vehicle_gallery,
      media: vehicle.image
    }
    this.related_vehicles.push(rvehicle);
    this.relatedVehicleData.push(vehicle);
    this.get_related_vehicleData();
  }

  removeVehicle(id, index) {
    this.relatedVehicleData.splice(index, 1);
    if(this.relatedVehicleData && this.relatedVehicleData.length > 0){
      this.related_vehicles = [];
      this.relatedVehicleData.forEach((rvehicle)=>{
        let tempvehicle = {
          vehicle_id: rvehicle._id,
          vehicle_gallery: rvehicle.vehicle_gallery,
          media: rvehicle.image
        };
        this.related_vehicles.push(tempvehicle);
      })
    } else {
      this.related_vehicles = [];
    }

  }

  // Related Vehicles Methods
  get_related_vehicleData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      related_vehicle: this.relatedVehicleData,
      existedvehicle: this.id
    };
    this.vehicleservice.getRelatedVehicleDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.vehicleData = response.result;
            this.totalRecord = response?.count;
            window.scroll(0, 0);
          }
          else {
            this.msg_danger = true;
            this.vehicleData = [];
          }
        }
      },
    );
  }
}
