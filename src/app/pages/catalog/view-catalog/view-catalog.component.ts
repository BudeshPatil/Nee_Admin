import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { from } from 'rxjs';
import { CatalogService } from '../../../providers/catalog/catalog.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-catalog',
  templateUrl: './view-catalog.component.html',
  styleUrls: ['./view-catalog.component.scss']
})
export class ViewCatalogComponent implements OnInit {

  msg_danger: boolean = false;
	CatalogData: any;
	imagePath: any;
	token: any;
	VendorData: any;
	vendorid: any = '';

	// pagination
	currentPage: number = 1;
	initialized: boolean = false;
	currentLimit: number = 10;
	totalRecord: number = 0;
	selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  searchText = '';
  config = {
    value: true,
    name: '',
    disabled: false,
    height: 25,
    width: 90,
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
  isactive :any ;
	constructor(
		private router: Router,
		// private loginService: LoginService,
		private toastr: ToastrManager,
    private catalogservice:CatalogService
	) {
		this.imagePath = environment.baseUrl + '/public/';
		this.token = localStorage.getItem('token');
    this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.isactive = 'none';
	}

	ngOnInit(): void {
		this.get_CatalogData();
	}

	get_CatalogData() {
		const obj = {
			limit: this.currentLimit,
			page: this.currentPage,
			vendor_id: this.vendorid,
			token: this.token,
		};
		this.catalogservice.getCatalogDetails(obj).subscribe(
			(response) => {
				if (response.code == 200) {
					if (response.result != null && response.result != '') {
						this.CatalogData = response.result;
						this.totalRecord = response?.count;
					}
					else {
						this.msg_danger = true;
					}

				}
			},
		);
	}

	changeVendorList(event: any) {
		this.vendorid = event.currentTarget.value;
		this.get_CatalogData();
	}

	onListChangePage(event: any) {
		this.currentPage = event;
		this.get_CatalogData();
	}

	deleteCatalog(listid: any) {
		if (confirm("Are you sure to delete this Catalog")) {
			var mylist = { id: listid };
			this.catalogservice.deletecatalog(mylist).subscribe(
				(response) => {
					if (response.code == 200) {
						this.get_CatalogData();
						this.router.navigate(['/catalog/view']);
					}
				},
			);
		}
	}

	selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  importCatalog()
  {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.catalogservice.importallCatalog(this.currentFile).subscribe(
            (response)=> {
              if (response.code == 200) 
              {
                console.log('file uploaded sucessfully');
                this.toastr.successToastr("catalog Image Imported sucessfully");
                setTimeout(()=>{                           
                  window.location.reload();
                },2000);  
                this.selectedFiles;
              
              } else {
                this.toastr.errorToastr(response.message);
              }
            },
          );
      }
    }
  }

  exportCatalog()
  {
    if(confirm("Are you sure to Export this Catalog"))
    {
      var obj = {};
      this.catalogservice.exportCatalog(obj).subscribe(
        (response)=> {
          if (response) 
          {   
            if(response.filepath){
              window.location.href = response.filepath;
            }
          }
        },
      );
    }
  }

	deleteAllCatalogs()
  {
    if(confirm("Are you sure to delete All Catalogs"))
    {
      var mylist = {};
      this.catalogservice.deleteallcatalogs(mylist).subscribe(
        (response)=> {
          if (response.code == 200) 
          {   
            this.get_CatalogData();
						this.toastr.successToastr(response.message);
            window.location.reload();
          }
        },
      );
    }
  }

  searchCatalog(){
    if(this.searchText){
      this.currentLimit = 1000;
      this.currentPage = 1; 
    } else {
      this.currentLimit = 10;
    }
    this.get_CatalogData();
  }

  changeStatus(){
    if(this.isactive != 'none'){
      this.config.switchColor.checked = '#ffffff';
      this.config.color.checked = 'green';
      this.config.labels.checked = 'Active';
    } else {
      if(this.isactive){
        this.isactive = false;
        this.config.switchColor.unchecked = 'crimson';
        this.config.color.unchecked = '#423f3f';
        this.config.labels.unchecked = 'Deactive';
      } else {
        this.isactive = true
      }
    }
	}

  resetFilter(){
		this.config.switchColor.checked = '#dcdcdc';
    this.config.color.checked = '#dcdcdc';
    this.config.labels.checked = 'Change';
    this.config.switchColor.unchecked = '#dcdcdc';
    this.config.color.unchecked = '#dcdcdc';
    this.config.labels.unchecked = 'Change';
    this.isactive = 'none';
	}


}
