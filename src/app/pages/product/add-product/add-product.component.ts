import { Component, OnInit, ViewEncapsulation, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import { environment } from '../../../../environments/environment';
import { ProductService } from '../../../providers/product/product.service';
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

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  addProductForm: FormGroup;
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
      { class: 'product_box', name: 'Rajdhani sans-serif' },
    ],
  }
  // File Upload
  options: UploaderOptions;
  uploadInput: EventEmitter<UploadInput>;
  selectedFile: any;
  document: any;
  imagePath: any;
  url: any;
  productImage: any;
  countryData: any;
  artsData: any = [];
  categoryData: any = [];
  selectedCat: any;
  subcategoryData: any = [];
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
    checkedLabel: '',
    uncheckedLabel: '',
    fontColor: {
      checked: '#fafafa',
      unchecked: '#ffffff',
    },
  };
  isactive: any;
  relatedProductData: any = [];
  searchText = '';
  currentPage: number = 1;
  initialized: boolean = false;
  currentLimit: number = 10;
  totalRecord: number = 0;
  productData: any;
  closeResult = '';
  reviewData: any = [];
  seletdreview: any;
  sizeList = [];
  dropdownSettings: any = {};
  sizeData: any = [];
  colourData: any = [];
  subcatList: any = [];
  stylingtipList: any = [];
  fabricList: any = [];
  mediaData: any = [];
  descriptionImages: any = [];
  stylingtipData: any = [];
  fabricData: any = [];
  deletedMedia: any = [];
  productGalleryData: any;
  public loadContent: boolean = false;
  addmediaForm: FormGroup;
  token: any;
  mediaFile: any;
  fileFormat: any;
  product_gallery_temp: any = [];
  product_gallery_final: any = [];
  product_description_gallery: any = [];
  temp_sequence_number = 0;
  submittedMedia: boolean = false;
  attributeData: any = [];
  isfastdelivery: any;
  seletedProdCategory: any = [];
  collectionData: any;
  imageData: any;
  seletedAttribute: any = [];
  variants: any = [];
  configProductForm: FormGroup;
  related_products: any = [];
  availableColorData: any = [];
  available_colors: any = [];
  availableProductsList: any = [];
  uploadedFiles: any = [];
  isUploaded: boolean = false;
  public optionList: FormArray;
  configurableproductList: any = [];
  // returns all form groups under options
  get optionFormGroup() {
    return this.configProductForm.get('options') as FormArray;
  }
  config_step_1:boolean = true;
  config_step_2:boolean = false;
  config_step_3:boolean = false;
  configureColorData:any = [];
  colorForm: FormGroup;
  public configColorList: FormArray;
  configColorForm: FormGroup;
  // returns all form groups under options
  get configFormGroup() {
    return this.configColorForm.get('options') as FormArray;
  }
  selectedconfigureColor:any;
  modalReference: any = null;
  isMediaDeleted = false;
  deletedMediaData: any;
  isMediaFileDeleted = false;
  deletedMediaFile: any = [];
  isMediaEdit = false;
  mediaID: any;
  deletedMediaFiles:any = [];
  configProdError = '';
  seletedCol:any;
  seletedProdCat:any;
  selcategoryData:any = [];
  CollectioncategoryData:any = [];
  selCollectionData : any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productservice: ProductService,
    private toastr: ToastrManager,
    // public countryService: CountryService,
    // public artService: ArtService,
    public categoryService: CategoryService,
    public subCategoryService: SubcategoryService,
    private modalService: NgbModal,
    public reviewService: ReviewService,
    public sizeService: SizeService,
    public colorService: ColourService,
    private mediaService: MediaService,
    private attributeService: AttributesService,
    public collectionService: CollectionService,
    public collectionCategoryService: CollectioncategoryService
    // public stylingtipService: StylingtipService,
    // public fabrciService: FabricService
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
    this.addProductForm = this.formBuilder.group({
      status: [true, Validators.required],
      product_type: ['configurable', Validators.required],
      attribute_set: ['', Validators.required],
      oneday_delivery: [false, Validators.required],
      name: ['', Validators.required],
      sku: ['', Validators.required],
      caption: ['', Validators.required],
      inspiration: ['', Validators.required],
      material_info: ['', Validators.required],
      length: [''],
      width: [''],
      height: [''],
      color_option: ['', Validators.required],
      color: [''],
      regular_price: ['', Validators.required],
      product_discount: [0, Validators.required],
      sale_price: ['', Validators.required],
      tax_class: [''],
      product_count: ['', Validators.required],
      product_availability: ['', Validators.required],
      home_product: [false, Validators.required],
      latest_product: [false, Validators.required],
      collection_category: ['', Validators.required],
      category: [''],
      collections: [''],
      subcategory: ['', Validators.required],
      visibility: ['catalog', Validators.required],
      weight: ['', Validators.required],
      featured_product: [false, Validators.required],
      // country: ['', Validators.required],
      size: [''],

      image: [''],
      product_gallery: [],
      product_description: ['', Validators.required],
      short_description: ['', Validators.required],

      virtual_id: [''],
      save_extra: [''],
      pay_on_delivery: ['', Validators.required],
      shipping_info: [''],
      is_approved: [true, Validators.required],
      returnable: [true, Validators.required],

      related_products: [],

      styling_tip: [],
      fabric: [],
      product_description_gallery: [''],
      url_key: ['', Validators.required],
      meta_description: [''],
      meta_title: [''],
      meta_keywords: [''],
      searchText: [''],

    });
    this.addReviewForm = this.formBuilder.group({
      customername: [''],
      product: [''],
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
      color:[]
    });
    this.uploadInput = new EventEmitter<UploadInput>();
    this.token = localStorage.getItem('ghoastrental-token');
    this.addAttributeForm = this.formBuilder.group({});
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addProductForm.controls[controlName].hasError(errorName);
  };
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.imagePath = environment.baseUrl + '/public/';
    this.url = environment.Url + '/assets';
    let tempuser = localStorage.getItem('user');
    this.user = JSON.parse(tempuser);
    if (this.isEdit) {
      this.patchingdata(this.id);
      this.get_related_productData();
      this.get_available_color_productData();
      this.applyAction = 'Update';
    }
    else {
      this.applyAction = 'Add';
      this.calculate_saleprice('', 'nochange');
    }
    // this.getCountryData();
    this.getallCollectionCategory();
    this.getCategoryData();
    this.getSubCategoryData();
    this.get_reviewData();
    this.getSizeData();
    this.getColorData();
    this.getAttributeData();
    this.getCollectionsData();
    // this.getStylingTipData();
    // this.getFabricData();
    window.scroll(0, 0);
    this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = 'green';
    this.isactive = 'none';
    this.isfastdelivery = 'none';
    this.configProductForm = this.formBuilder.group({
      options: this.formBuilder.array([this.createoption()])
    });
    // set optionlist to this field
    this.optionList = this.configProductForm.get('options') as FormArray;
    this.removeoption(0);

  // set optionlist to this field
    this.configColorForm = this.formBuilder.group({
      options: this.formBuilder.array([this.createColoroption()])
    });
    // set optionlist to this field
    this.configColorList = this.configColorForm.get('options') as FormArray;
    if(this.configColorList && this.configColorList.length > 0){
      this.removeColorOption(0);
    }    

    //creating Configure Products
  }

  get f() {
    return this.addProductForm.controls;
  }

  // If Product data Existed get the form data
  patchingdata(id: any) {
    let obj = { id: id };
    this.productservice.getProductWithId(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          let data = response?.result;
          if (data?.image_data) {
            this.imageData = data?.image_data[0];
          }
          this.selectedCat = data?.subcategory;
          this.selcategoryData = data?.category_data;
          this.selCollectionData = data?.collection_data;
          this.configureColorData = data.configColorData;
          this.seletedProdCategory = data.subcategory_data;
          this.configurableproductList = data?.configurable_products;
          if (data?.media_data) {
            this.mediaData = data?.media_data;
            this.temp_sequence_number = data?.media_data.length;
          } else {
            this.mediaData = [];
          }
          if (data?.product_gallery) {
            this.product_gallery_temp = data?.product_gallery;
          } else {
            this.product_gallery_temp = [];
          }
          if (data?.related_products_data) {
            this.relatedProductData = data?.related_products_data;
          } else {
            this.relatedProductData = [];
          }
          if (data?.related_products) {
            this.related_products = data?.related_products;
          } else {
            this.related_products = [];
          }
          if (data?.available_color_data) {
            this.availableColorData = data?.available_color_data;
          } else {
            this.availableColorData = [];
          }
          if (data?.available_color) {
            this.available_colors = data?.available_color;
          } else {
            this.available_colors = [];
          }
          // let tempcatData = [];
          // if (data?.category_data) {
          //   data.category_data.forEach((item, index) => {
          //     tempcatData.push({ _id: item._id, name: item.name });
          //   });
          // }

          // let tempScatData = [];
          // if (data?.subcategory_data) {
          //   data.subcategory_data.forEach((item, index) => {
          //     tempScatData.push({ _id: item._id, name: item.name });
          //   });
          // }
          let tempSizeData: any = [];
          if (data?.product_type == 'configurable') {
            if (data?.size) {
              data.size.forEach((item, index) => {
                tempSizeData.push({ _id: item._id, name: item.name });
              });
            }
          } else {
            if (data?.size && data?.size.length > 0) {
              tempSizeData = data?.size[0]._id;
            }
          }
          if (data?.product_description_gallery) {
            this.product_description_gallery = data?.product_description_gallery;
          } else {
            this.product_description_gallery = [];
          }

          if (data?.description_images) {
            this.descriptionImages = data?.description_images;
          } else {
            this.descriptionImages = [];
          }

          let tempStylingtipData = [];
          if (data?.stylingtip_data) {
            data.stylingtip_data.forEach((item, index) => {
              tempStylingtipData.push({ stylingtip_id: item._id, stylingtip_name: item.name });
            });
          }
          let tempfabricData = [];
          if (data?.fabric_data) {
            data.fabric_data.forEach((item, index) => {
              tempfabricData.push({ fabric_id: item._id, fabric_name: item.name });
            });
          }
          let tempColorData = [];
          if (data?.product_type == 'configurable') {
            if (data?.variants && data?.variants.length > 0) {
              this.variants = data?.variants;
              data.variants.forEach((item, index) => {
                this.optionList.push(this.createmanageoption(item, 'edit'));
              });
            }
            if (data?.configColorData && data?.configColorData.length > 0) {
              this.variants = data?.configColorData;
              data?.configColorData.forEach((item, index) => {
                tempColorData.push({_id:item._id,name:item.name});
              });
            }
          }
          this.addProductForm.patchValue({
            status: data?.status,
            product_type: data?.product_type,
            attribute_set: data?.attribute_set,
            oneday_delivery: data?.oneday_delivery,
            name: data?.name,
            sku: data?.sku,
            caption: data?.caption,
            inspiration: data?.inspiration,
            material_info: data?.material_info,
            length: data?.length,
            width: data?.width,
            height: data?.height,
            color_option: data?.color_option,
            color: data?.color,
            regular_price: data?.regular_price,
            product_discount: data?.product_discount,
            sale_price: data?.sale_price,
            tax_class: data?.tax_class,
            product_count: data?.product_count,
            product_availability: data?.product_availability,
            home_product: data?.home_product,
            latest_product: data?.latest_product,
            collection_category: data?.collection_category,
            category: data?.category,
            collections: data?.collections,
            subcategory: data?.subcategory,
            visibility: data?.visibility,
            weight: data?.weight,
            featured_product: data?.featured_product,
            country: data?.country,
            size: tempSizeData,

            image: data?.image,
            product_gallery: data?.product_gallery,

            product_description: data?.product_description,
            short_description: data?.short_description,

            virtual_id: data?.virtual_id,
            save_extra: data?.save_extra,
            pay_on_delivery: data?.pay_on_delivery,
            shipping_info: data?.shipping_info,
            is_approved: data?.is_approved,
            returnable: data?.returnable,

            related_products: data?.related_products,

            styling_tip: data.stylingtip_data,
            fabric: data.fabric_data,
            product_description_gallery: data.product_description_gallery,
            url_key: data?.url_key,
            meta_description: data?.meta_description,
            meta_title: data?.meta_title,
            meta_keywords: data?.meta_keywords,
          });
          this.colorForm.patchValue({
            color: tempColorData
          });
        } else {

        }
      });
  }

  // Submit Product Data and Save into DataBase
  onSubmit() {
    this.submitted = true;
    let obj = this.addProductForm.value;
    let id = this.id;
    this.variants = this.configProductForm.value.options;
    obj['art_by'] = this.user._id;
    obj['product_gallery'] = this.product_gallery_temp;
    obj['related_products'] = this.related_products;
    obj['available_color'] = this.available_colors;
    obj['product_description_gallery'] = this.product_description_gallery;
    obj['variants'] = this.variants;
    let fabricData: any = [];
    if (this.addProductForm.value.fabric && this.addProductForm.value.fabric.length > 0) {
      this.addProductForm.value.fabric.forEach((fabric) => {
        let obj = {
          fabric_id: fabric._id,
          fabric_name: fabric.name
        };
        fabricData.push(obj);
      })
    }
    let stylingtipData: any = [];
    if (this.addProductForm.value.styling_tip && this.addProductForm.value.styling_tip.length > 0) {
      this.addProductForm.value.styling_tip.forEach((styling_tip) => {
        let obj = {
          stylingtip_id: styling_tip._id,
          stylingtip_name: styling_tip.name
        };
        stylingtipData.push(obj);
      })
    }
    let sizeData: any = [];
    if (this.addProductForm.value.product_type == 'configurable') {
      if (this.addProductForm.value.size && this.addProductForm.value.size.length > 0) {
        this.addProductForm.value.size.forEach((size) => {
          let obj = {
            size_id: size._id,
            size_name: size.name
          };
          sizeData.push(obj);
        });
      }
    } else {
      if (this.addProductForm.value.size) {
        let tempsize = this.sizeData.filter((size) => size._id == this.addProductForm.value.size);
        if (tempsize && tempsize.length > 0) {
          let obj = {
            size_id: tempsize[0]._id,
            size_name: tempsize[0].name
          };
          sizeData.push(obj);
        }
      }
    }
    let configProds: any = [];
    let configProdSkus: any = [];
    if (this.variants && this.variants.length > 0) {
      this.variants.forEach((variantData) => {
        let tempsize = this.sizeData.filter((size) => size._id == variantData.size_id);
        let tempcolor = this.colourData.filter((color) => color._id == variantData.obj_color_id);
        if(tempsize && tempsize.length > 0 && tempcolor.length > 0){
          tempsize[0] = { size_id:tempsize[0]._id,size_name:tempsize[0].name}
          variantData['name'] = variantData.obj_name;
          variantData['sku'] = variantData.obj_sku;
          // variantData['image'] = null;
          if (this.imageData) {
            variantData['image'] = this.imageData._id;
          }
          variantData['product_gallery'] = variantData.product_gallery;
          // variantData['product_gallery'] = null;
          variantData['size'] = tempsize;
          variantData['styling_tip'] = stylingtipData;
          variantData['fabric'] = fabricData;
          variantData['product_type'] = 'simple';
          variantData['color'] = tempcolor[0]._id;
          variantData['url_key'] = this.addProductForm.value.url_key+'-'+variantData.obj_color+'-'+tempsize[0].size_name;
          let config_obj = {
            ...this.addProductForm.value,
            ...variantData
          };
        configProds.push(config_obj);
        }
        let skuObj = {
          sku: variantData.obj_sku
        };
        configProdSkus.push(skuObj);
      });
    }
    obj['configProductsData'] = configProds;
    obj['configProductskus'] = configProdSkus;
    obj['configColorData'] = this.configureColorData;
    obj['size'] = sizeData;
    obj['styling_tip'] = stylingtipData;
    obj['fabric'] = fabricData;
    if (this.imageData) {
      obj['image'] = this.imageData._id;
    }
    if (this.addProductForm.invalid) {
      return;
    }
    if (!this.isEdit) {
      this.productservice.addProduct(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            // this.throw_msg   = response.message 
            // this.msg_success = true;
            if (response.result) {
              this.updateConfigurableProduct(configProds, response.result._id);
            }
            if (this.isMediaDeleted) {
							this.deleteMediaData();
						}
						if (this.isMediaFileDeleted) {
							this.deleteMediaFile();
						}
            this.toastr.successToastr(response.message);
            setTimeout(() => {
              this.router.navigate(['/product/view']);
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
      this.productservice.editproductdata(obj, id).subscribe(
        (response) => {
          if (response.code == 200) {
            this.updateConfigurableProduct(configProds, id);
            this.toastr.successToastr(response.message);
            setTimeout(() => {
              this.router.navigate(['/product/view']);
            }, 3000);
          } else {
            this.toastr.errorToastr(response.message);
          }
        },
      );

    }
  }

  //Update ConfigureProductData
  updateConfigurableProduct(configdata, id) {
    let obj = {
      configurable_products: configdata,
      product_id: id
    }
    this.productservice.updateconfigproducts(obj, id).subscribe(
      (response) => {
        if (response.code == 200) {
          // this.throw_msg = response.message 
          // this.msg_success = true;
          // this.toastr.successToastr(response.message);
          setTimeout(() => {
            this.router.navigate(['/product/view']);
          }, 2000);
        } else {
          // this.toastr.errorToastr(response.message);
        }
      },
    );
  }

  // on click of cancel button navigate to product view page and Delete the images which are uploaed and not used
  onCancel() {
    this.router.navigate(['/product/view']);
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

  //Get Preloaded Country data
  // getCountryData() {
  //   let obj = {};
  //   this.countryService.getallCountry(obj).subscribe(
  //     (response) => {
  //       if (response.code == 200) {
  //         this.countryData = response?.result;
  //       } else {

  //       }
  //     });
  // }

  //Get Preloaded Category data
  getCategoryData() {
    let obj = {};
    this.categoryService.getallCategoryDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.categoryData = response?.result;
        } else {

        }
      });
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

  selectCollectionCat(event, collection) {
    this.selCollectionData = [];
    if (collection) {
      let tempCol = this.collectionData.filter((col) => col.collection_category == collection);
      if (tempCol && tempCol.length > 0) {
        this.selCollectionData = tempCol;
      }
    }
    // if(this.seletedColCat && this.seletedColCat.category_data.length > 0){
    //   this.selCollectionData = this.seletedColCat.category_data;
    //   let tempData = [];
    //   this.selCollectionData.forEach((item, index) => {
    //     tempData.push({ _id: item._id, name: item.name });
    //   });
    //   this.selCollectionData = tempData;
    // }
    this.selectProductCategory('collection_category',collection);
  }

  selectCollection(event, collection) {
    this.selcategoryData = [];
    if (collection) {
      let tempCol = this.categoryData.filter((col) => col.collection_id == collection);
      if (tempCol && tempCol.length > 0) {
        this.selcategoryData = tempCol;
      }
    }
    // this.selectProductCategory('',collection);
    // if(this.seletedCol && this.seletedCol.category_data.length > 0){
    //   this.selcategoryData = this.seletedCol.category_data;
    //   let tempData = [];
    //   this.selcategoryData.forEach((item, index) => {
    //     tempData.push({ _id: item._id, name: item.name });
    //   });
    //   this.selcategoryData = tempData;
    // }
  }

  selectProductCategory(type,collection){
    let selectedprodCat = [];
    if(type == 'collection_category'){
      if(this.subcategoryData && this.subcategoryData.length > 0){
        this.subcategoryData.forEach((item, index) => {
          if(item.parent_collection_category_data && item.parent_collection_category_data.length > 0){
            let tempColl = item.parent_collection_category_data.filter((cat) => cat._id == collection);
            if (tempColl && tempColl.length > 0 && selectedprodCat.length == 0) {
              selectedprodCat.push(item);
            } else if (tempColl && tempColl.length > 0 && selectedprodCat.length > 0) {
              let tempcat = selectedprodCat.filter((cat) => cat._id == item._id);
              if (tempcat && tempcat.length == 0) {
                selectedprodCat.push(item);
              }
            }
          }
        });
      }
    } else if(type == 'collection_type'){

    } else if(type == 'collection'){

    }

    if (selectedprodCat.length > 0) {
     this.seletedProdCategory = selectedprodCat;
    } else {
     this.seletedProdCategory = [];
    }
  }

  //Get Preloaded Sub-Category data
  getSubCategoryData() {
    let obj = {};
    this.subCategoryService.getallSubCategory(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.subcategoryData = response?.result;
        } else {

        }
      });
  }

  //Get Preloaded Collection data
  getCollectionsData() {
    let obj = {};
    this.collectionService.getallCollectionDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.collectionData = response?.result;
        } else {

        }
      });
  }

  getallCollectionCategory() {
		this.collectionCategoryService.getallCollectionCategoryDetails({}).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CollectioncategoryData = response.result;
					}
					else {
					}
				}
			},
		);
	}


  //Get Preloaded Stylingtip data
  // getStylingTipData() {
  //   let obj = {};
  //   this.stylingtipService.getallStylingtips(obj).subscribe(
  //     (response) => {
  //       if (response.code == 200) {
  //         this.stylingtipData = response?.result;
  //         if (this.stylingtipData && this.stylingtipData.length > 0) {
  //           let tempData = [];
  //           this.stylingtipData.forEach((item, index) => {
  //             tempData.push({ _id: item._id, name: item.name });
  //           });
  //           this.stylingtipList = tempData;
  //         }
  //       } else {

  //       }
  //     });
  // }

  //Get Preloaded Fabric data
  // getFabricData() {
  //   let obj = {};
  //   this.fabrciService.getallFabrics(obj).subscribe(
  //     (response) => {
  //       if (response.code == 200) {
  //         this.fabricData = response?.result;
  //         if (this.fabricData && this.fabricData.length > 0) {
  //           let tempData = [];
  //           this.fabricData.forEach((item, index) => {
  //             tempData.push({ _id: item._id, name: item.name });
  //           });
  //           this.fabricList = tempData;
  //         }
  //       } else {

  //       }
  //     });
  // }

  //Get Preloaded Size data
  getSizeData() {
    let obj = {};
    this.sizeService.getallSizes(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          this.sizeData = response?.result;
          if (this.sizeData && this.sizeData.length > 0) {
            let tempData = [];
            this.sizeData.forEach((item, index) => {
              tempData.push({ _id: item._id, name: item.name });
            });
            this.sizeList = tempData;
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
    return this.addProductForm.controls;
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

  calculate_saleprice(event: any, type) {
    let value;
    let parecentage;
    if (type == 'nochange') {
      parecentage = this.addProductForm.get('product_discount')?.value;
    } else {
      parecentage = event.target.value
    }
    let regular_price: any = this.addProductForm.get('regular_price')?.value;
    value = regular_price * (100 - parecentage) / 100;
    this.addProductForm.patchValue({ sale_price: value });
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
            // this.addAttributeForm.addControl(controname, this.formBuilder.group({
            //   value: ['', Validators.required],
            //   name: ['', Validators.required]
            // }));
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
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
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
    if(!id){
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
              this.product_description_gallery.push(description_image);
              this.mediaFile = '';
              this.modalService.dismissAll();
            } else if (type == 'config') {
              if (this.selectedconfigureColor && this.configureColorData.length > 0) {
                this.configureColorData.forEach((configColor)=> {  
                  if(configColor._id == this.selectedconfigureColor._id){
                    if(configColor && configColor.product_gallery){
                      configColor.product_gallery.push(response.result);
                    } else {
                      let tempcg = [];
                      tempcg.push(response.result)
                      configColor['product_gallery'] = tempcg;
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
              this.product_gallery_temp.push({
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
      if(id){
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
              if(this.id){
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
    if (type == 'image' && this.imageData ) {
      this.deletedMediaFiles.push(this.imageData.src);
      this.deletedMediaData.push(this.imageData._id);
			this.isMediaDeleted = true;
      this.imageData = null;
    } else {
      let tempMedia = this.mediaData.filter((item) => item._id == id);
      if (tempMedia && tempMedia.length > 0) {
        this.deletedMediaFiles.push(tempMedia[0].src);
        this.deletedMediaData.push(tempMedia[0]);
        this.isMediaDeleted = true;
      }
      this.product_gallery_temp.splice(i, 1);
      this.mediaData.splice(i, 1);
    }
  }

  deleteDescMedia(i) {
    this.descriptionImages.splice(i, 1);
    this.product_description_gallery.splice(i, 1);
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

  deleteMediaData() {
    if (this.deletedMediaData && this.deletedMediaFiles) {
        let obj = {};
        obj['files'] = this.deletedMediaFiles;
        obj['ids'] = this.deletedMediaData.map(md => { return md._id });
      this.mediaService.deleteSelectedMedia(obj).subscribe(
        (response) => {
          if (response.code == 200) {
            this.deletedMediaFile = [];
            this.modalService.dismissAll();
          }
        },
      );
    }
  }

  openConfigMedia(content: any,cinfigdata) {
    this.selectedconfigureColor = cinfigdata;
      this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' });
      this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  deleteconfigcolorMedia(i,configId) {
    if(configId){
      this.configureColorData.forEach((colorData) => {
        if(colorData && colorData.product_gallery.length > 0){
          colorData.product_gallery.splice(i, 1);
        }
      });
    }
  }

  //*************** End Media Image/Video Section ****************//

  //*************** Starts Configure Producuct Section ****************//

  openConfigModal(content: any) {
    if (!this.addProductForm.value.name || !this.addProductForm.value.sku || !this.addProductForm.value.sale_price
      || !this.addProductForm.value.regular_price || !this.addProductForm.value.product_count || !this.addProductForm.value.weight) {
      this.submitted = true;
      return;
    } else { 
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl', backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  goToStep(step:string){
    if(step == 'one'){
        this.config_step_1 = true;
        this.config_step_2 = false;
        this.config_step_3 = false;
    } else if(step == 'two'){
      if(this.configureColorData && this.configureColorData.length > 0){
        this.config_step_1 = false;
        this.config_step_2 = true;
        this.config_step_3 = false;
        this.configProdError = '';
      } else {
        this.configProdError = "Please Select atleast a Color";
      }      
    } else if(step == 'three'){
      if(this.configureColorData && this.configureColorData.length > 0 && this.configureColorData[0].size && this.configureColorData[0].size.length > 0){
        this.config_step_1 = false;
        this.config_step_2 = false;
        this.config_step_3 = true;
        let prodData = this.addProductForm.value;
        this.configProdError = '';
        this.createConfigProducts(prodData);
      } else {
        this.configProdError = "Please Select Size for the Vatiants";
      }       
    }
  }

  get fcolor() {
    return this.colorForm.controls;
  }

  selectColors(data:any){
    let tempcolorData = this.colourData.filter((color)=> color._id == data._id );
    if(tempcolorData && tempcolorData.length > 0 && this.configureColorData.length > 0){
      let isColorPrasent = this.configureColorData.filter((color)=> color._id == data._id);
      if(isColorPrasent.length == 0){
        this.configureColorData.push(tempcolorData[0]);
        // this.configColorList.push(this.createConfigColorFormOption(data, 'new'));
      }
    } else {
      this.configureColorData.push(tempcolorData[0]);
      // this.configColorList.push(this.createConfigColorFormOption(data, 'new'));
    }
  }

  selecteConfigSize(sizeId,colordata){
    if(sizeId){
      let tempSize = this.sizeData.filter((size)=>size._id == sizeId);
      if(tempSize && tempSize.length > 0 && this.configureColorData.length > 0){
        this.configureColorData.forEach(colorData => {
            if(colorData.size && colorData.size.length > 0){
              let isexisted = colorData.size.filter((s)=> s._id == sizeId);
              if(isexisted.length == 0 && colorData._id == colordata._id){
                colorData.size.push(tempSize[0]);
              }
            } else {
              if(colorData._id == colordata._id){
                colorData['size'] = tempSize;
              }
          }
        });
      }
    }
  }

  removeSize(colorId,sizeId,index){
    if(sizeId){
      if(this.configureColorData.length > 0){
        this.configureColorData.forEach(colorData => {
          if(colorId ==colorData._id && colorData.size && colorData.size.length > 0){
          let tempSize = colorData.size.filter((size)=>size._id == sizeId);
            if(tempSize && tempSize.length > 0){
              colorData.size.splice(index, 1);
            }
          }
        });
      }
    }
  }


  createConfigProducts(congiobject:any){
    if(this.configureColorData.length > 0){
      this.configureColorData.forEach(colorData => {
        if(colorData.size && colorData.size.length > 0){
          colorData.size.forEach(color_size => {
            let tempProductGal = [];
            if(colorData.product_gallery && colorData.product_gallery.length > 0){
              tempProductGal = colorData.product_gallery.map((gal)=> {
                let tempgal = {
                  media_id: gal._id,
                  file_name: gal.name
                };
                return tempgal;
              });
            }
            congiobject['obj_name'] = congiobject.name  +'-'+ colorData.name +'-'+ color_size.name;
            congiobject['obj_sku'] = congiobject.sku +'-'+ colorData.name +'-'+ color_size.name;
            congiobject['id'] = color_size._id;
            congiobject['uniq_id'] = colorData._id+color_size._id;
            congiobject['obj_size'] = color_size.name;
            congiobject['size_id'] = color_size._id;
            congiobject['obj_color'] = colorData.name;
            congiobject['obj_color_id'] = colorData._id;
            congiobject['product_gallery'] = tempProductGal;
            if (this.optionList.value && this.optionList.value.length > 0) {
              let vardata = this.optionList.value.filter((vdata) => vdata.uniq_id == colorData._id+color_size._id );
              if (vardata.length == 0) {
                this.addmanageoption(congiobject);
              }
            } else {
              this.addmanageoption(congiobject);
            }
          });
        }
      });
      this.configureColorData = this.configureColorData.filter(cData =>{
        if(cData._id){
            return cData
          }
        });
    }
  }


  // option formgroup
  createColoroption(): FormGroup {
    return this.formBuilder.group({
      id: [''], // i.e Name,
      name: [null, Validators.compose([Validators.required])], // i.e Name,
      size: [[], Validators.compose([Validators.required])], // i.e SKU,
      product_gallery: [[], Validators.compose([Validators.required])], // i.e Price,
    });
  }

  // option formgroup
  createConfigColorFormOption(opdata, type): FormGroup {
    if (type == 'edit') {
      if (opdata.size && opdata.size.size_name) {
        opdata.name = opdata.size.size_name;
      }
    }
    return this.formBuilder.group({
      id: [opdata._id], // i.e Name,
      name: [opdata.name], // i.e Name,
      size: [''], // i.e Size,
      product_gallery: [''], // i.e Gallery Images,
    });
  }

   // get the formgroup under options form array
   getColorFormGroup(index): FormGroup {
    // this.optionList = this.form.get('options') as FormArray;
    const formGroup = this.configColorList.controls[index] as FormGroup;
    return formGroup;
  }

  // remove option from group
  removeColorOption(index) {
    // this.optionList = this.form.get('options') as FormArray;
    this.configColorList.removeAt(index);
    if(this.configureColorData && this.configureColorData.length > 0){
      this.configureColorData.removeAt(index, 1);
    }
  }

  onSelectAllColors(items:any){
    if(items && items.length > 0){
      items.forEach((op)=> {
        let isColorPrasent = this.configureColorData.filter((item)=>op._id == item._id);
        if(isColorPrasent.length == 0){
          this.configureColorData.push(op);
        }
      });
    }
  }

  onDeselectColors(item:any) {
    if(this.configureColorData && this.configureColorData.length > 0){
      let index = this.configureColorData.findIndex((color)=>  color._id == item._id);
      this.configureColorData.splice(index, 1);
    }
  }

  onDeselectAllColors(data:any){
    this.configureColorData = [];
    this.config_step_2 = false;
  }


  selectSize(data: any) {
    let variantData = {};
    if (this.addProductForm.value.name) {
      variantData['name'] = this.addProductForm.value.name + '-' + data.name;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (this.addProductForm.value.sku) {
      variantData['sku'] = this.addProductForm.value.sku + '-' + data.name;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (this.addProductForm.value.sale_price) {
      variantData['sale_price'] = this.addProductForm.value.sale_price;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (this.addProductForm.value.regular_price) {
      variantData['regular_price'] = this.addProductForm.value.regular_price;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (this.addProductForm.value.product_discount) {
      variantData['product_discount'] = this.addProductForm.value.product_discount;
    }
    if (this.addProductForm.value.product_count) {
      variantData['product_count'] = this.addProductForm.value.product_count;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (this.addProductForm.value.weight) {
      variantData['weight'] = this.addProductForm.value.weight;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (data.name) {
      variantData['size'] = data.name;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }
    if (data._id) {
      variantData['id'] = data._id;
    } else {
      this.addProductForm.patchValue({
        size: null
      });
      this.submitted = true;
      return;
    }

    if (this.addProductForm.value.status) {
      variantData['status'] = this.addProductForm.value.status;
    }
    variantData['url_key'] = this.addProductForm.value.name + '-' + data.name;
    if (this.variants && this.variants.length > 0) {
      let vardata = this.variants.filter((vdata) => { vdata.id == data._id });
      if (vardata.length == 0) {
        this.addmanageoption(variantData);
      }
    } else {
      this.addmanageoption(variantData);
    }
  }

  onDeselectSize(data) {
    let filterVar = this.variants.filter((item) => data._id != item.id);
    this.variants = filterVar;
    const index = this.optionList.value.findIndex(sizeEl => sizeEl.size === data.name)
    if (index !== -1) this.optionList.removeAt(index)
  }

  calculate_optionformprice(event: any, type, index) {
    let value;
    let parecentage;
    if (type == 'nochange') {
      parecentage = this.getoptionsFormGroup(index).controls['product_discount'].value;
    } else {
      parecentage = event.target.value
    }
    let regular_price: any = this.getoptionsFormGroup(index).controls['regular_price'].value;
    value = regular_price * (100 - parecentage) / 100;
    this.optionList.controls[index].patchValue({ sale_price: value });
  }

  onSelectAllSizes(items: any) {
    if (items && items.length > 0) {
      items.forEach((op) => {
        let filterVar = this.variants.filter((item) => op._id == item.id);
        if (filterVar.length == 0) {
          this.selectSize(op);
        }
      });
    }
  }

  onDeselectAllSize(data) {
    this.variants = [];
    this.optionList.clear();
  }

  // option formgroup
  createoption(): FormGroup {
    return this.formBuilder.group({
      id: [''], // i.e Name,
      obj_name: [null, Validators.compose([Validators.required])], // i.e Name,
      obj_sku: [null, Validators.compose([Validators.required])], // i.e SKU,
      obj_color: [null, Validators.compose([Validators.required])], // i.e SKU,
      sale_price: [null, Validators.compose([Validators.required])], // i.e Price,
      product_count: [null, Validators.compose([Validators.required])], // i.e Quantity,
      weight: [null, Validators.compose([Validators.required])], // i.e Weight,
      obj_size: [null, Validators.compose([Validators.required])], // i.e Size,
      status: [false, Validators.compose([Validators.required])], // i.e. Status
      regular_price: [null, Validators.compose([Validators.required])], // i.e Regular Price,
      product_discount: [null, Validators.compose([Validators.required])], // i.e Discount,
      url_key: [''], // i.e. Url_Key
      uniq_id:[''],
      size_id:[''],
      obj_color_id:[''],
      product_gallery:[]
    });
  }

  // add a option form group
  addoption() {
    this.optionList.push(this.createoption());
  }

  // remove option from group
  removeoption(index) {
    // this.optionList = this.form.get('options') as FormArray;
    this.optionList.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index) {
    let validators = null;
    this.getoptionsFormGroup(index).controls['value'].updateValueAndValidity();
  }

  // get the formgroup under options form array
  getoptionsFormGroup(index): FormGroup {
    // this.optionList = this.form.get('options') as FormArray;
    const formGroup = this.optionList.controls[index] as FormGroup;
    return formGroup;
  }

  // add a option form group
  addmanageoption(opdata) {
    if (opdata) {
      if (this.variants && this.variants.length > 0) {
        let temp = this.variants.filter((item) => {
          opdata._id == item._id
        })
        if (temp.length == 0) {
          this.variants.push(opdata);
          this.optionList.push(this.createmanageoption(opdata, 'new'));
        }
      } else {
        this.variants.push(opdata);
        this.optionList.push(this.createmanageoption(opdata, 'new'));
      }
    }
  }

  // option formgroup
  createmanageoption(opdata, type): FormGroup {
    if (type == 'edit') {
      if (opdata.size && opdata.size.length > 0 && opdata.size[0].size_name) {
        opdata.size = opdata.size[0].size_name;
      }
    }
    return this.formBuilder.group({
      id: [opdata.id], // i.e Name,
      obj_name: [opdata.obj_name, Validators.compose([Validators.required])], // i.e Name,
      obj_sku: [opdata.obj_sku, Validators.compose([Validators.required])], // i.e SKU,
      obj_color: [opdata.obj_color, Validators.compose([Validators.required])], // i.e SKU,
      regular_price: [opdata.regular_price, Validators.compose([Validators.required])], // i.e Regular Price,
      product_discount: [opdata.product_discount, Validators.compose([Validators.required])], // i.e Discount,
      sale_price: [opdata.sale_price, Validators.compose([Validators.required])], // i.e Sale Price,
      product_count: [opdata.product_count, Validators.compose([Validators.required])], // i.e Name,
      weight: [opdata.weight, Validators.compose([Validators.required])], // i.e Name,
      obj_size: [opdata.obj_size, Validators.compose([Validators.required])], // i.e Code,
      status: [opdata.status, Validators.compose([Validators.required])], // i.e. isDefault,
      url_key: [''],
      size_id:[opdata.size_id],
      uniq_id:[opdata.uniq_id],
      obj_color_id:[opdata.obj_color_id],
      product_gallery:[opdata.product_gallery]
    });
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
      product: reviewData.product_name,
      rating: reviewData.rating,
      description: reviewData.description,
      summary: reviewData.summary
    });
    this.modalService.open(review, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  changeReviewStatus() {
    let obj = this.addReviewForm.value;
    obj['user_id'] = this.seletdreview.user_id;
    obj['product_id'] = this.seletdreview.product_id;
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

  //*************** Starts Available Products List *************************//

  // Availabel Color Product Methods
  get_available_color_productData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      related_product: this.availableColorData,
      existedproduct: this.id
    };
    this.productservice.getAvailableColorProductDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.availableProductsList = response.result;
            this.totalRecord = response?.count;
            window.scroll(0, 0);
          }
          else {
            this.msg_danger = true;
            this.availableProductsList = [];
          }
        }
      },
    );
  }

  searchAvailableProduct() {
    if (this.searchText) {
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_available_color_productData();
  }

  onAvailListChangePage(event: any) {
    this.currentPage = event;
    this.get_available_color_productData();
  }

  openAvailable(available: any) {
    this.get_available_color_productData();
    this.modalService.open(available, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
      .result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  addAvailableProduct(product, index) {
    let rproduct = {
      product_id: product._id,
      color_id: product.color
    }
    this.available_colors.push(rproduct);
    this.availableColorData.push(product);
    this.get_available_color_productData();
  }

  removeAvailProduct(id, index) {
    this.availableColorData.splice(index, 1);
  }

  //*************** End Available Products List *************************//

  //*************** Start Related Products List *************************//

  searchProduct() {
    if (this.searchText) {
      this.currentLimit = 1000;
      this.currentPage = 1;
    } else {
      this.currentLimit = 10;
    }
    this.get_related_productData();
  }

  onListChangePage(event: any) {
    this.currentPage = event;
    this.get_related_productData();
  }

  openRelatedProductModal(content: any) {
    this.get_related_productData();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass", size: 'xl',  backdrop: 'static' })
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

  addRelatedProduct(product, index) {
    let rproduct = {
      product_id: product._id,
      product_gallery: product.product_gallery,
      media: product.image
    }
    this.related_products.push(rproduct);
    this.relatedProductData.push(product);
    this.get_related_productData();
  }

  removeProduct(id, index) {
    this.relatedProductData.splice(index, 1);
  }

  // Related Products Methods
  get_related_productData() {
    const obj = {
      limit: this.currentLimit,
      page: this.currentPage,
      related_product: this.relatedProductData,
      existedproduct: this.id
    };
    this.productservice.getRelatedProductDetails(obj).subscribe(
      (response) => {
        if (response.code == 200) {
          if (response.result != null && response.result != '') {
            this.productData = response.result;
            this.totalRecord = response?.count;
            window.scroll(0, 0);
          }
          else {
            this.msg_danger = true;
            this.productData = [];
          }
        }
      },
    );
  }
}
