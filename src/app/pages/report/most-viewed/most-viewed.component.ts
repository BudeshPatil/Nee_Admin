import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// Services
import { ColourService } from '../../../providers/colour/colour.service';
import { from } from 'rxjs';
import { MediaService } from 'src/app/providers/media/media.service';
import { ResponseService } from 'src/app/providers/response/response.service';
import { DataService } from '../../../providers/data/data.service';

@Component({
  selector: 'app-most-viewed',
  templateUrl: './most-viewed.component.html',
  styleUrls: ['./most-viewed.component.scss']
})
export class MostViewedComponent {
  lastsearchterm: any = [];
  topsearchtems: any = [];
  mostviewedProducts: any = [];
  viewed_products: any = [];
  bestsellerProducts: any = [];
  seller_products: any = [];
  imagePath: any;
  token: any;
  constructor(
    private router: Router,
    private colourService: ColourService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private mediaService: MediaService,
    public responseService: ResponseService,
    private dashboardService: DataService
  ) {
    this.imagePath = environment.baseUrl + '/public/';
    this.token = localStorage.getItem('ghoastrental-token');
  }

  ngOnInit(): void {
    this.dashboard_data();
  }

  dashboard_data() {
    this.dashboardService.getboardDetails({}).subscribe(
      (response) => {
        if (response.code == 200) {
          this.lastsearchterm = response.last_search_items;
          this.topsearchtems = response.top_search_items;
          this.mostviewedProducts = response.most_viewed_products;
          this.viewed_products = response.viewed_products;
          this.bestsellerProducts = response.best_seller_products;
          this.seller_products = response.seller_products;
          // this.toastr.successToastr(response.message);
          if (this.mostviewedProducts && this.mostviewedProducts.length > 0) {
            this.mostviewedProducts.forEach((item) => {
              if (item && this.viewed_products.length > 0) {
                let tempProd = this.viewed_products.filter((prod) => prod._id.toString() == item.product_id.toString());
                if (tempProd && tempProd.length > 0) {
                  item['product'] = tempProd[0];
                }
              }
            });
          }
          if (this.bestsellerProducts && this.bestsellerProducts.length > 0) {
            this.bestsellerProducts.forEach((item) => {
              if (item && this.seller_products.length > 0) {
                let tempProd = this.seller_products.filter((prod) => prod._id.toString() == item.product_id.toString());
                if (tempProd && tempProd.length > 0) {
                  item['product'] = tempProd[0];
                }
              }
            });
          }
        } else {
          // this.toastr.errorToastr(response.message);
        }
      },
    );
  }
}
