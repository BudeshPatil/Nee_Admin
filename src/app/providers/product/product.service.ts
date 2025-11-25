import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/addproduct';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getProductDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/viewallproduct';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  getDisplayonHomeProductDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/displayonhomeproducts';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  
  getProductWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/getsingleproduct';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getallProductsWithoutProdId = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/getProductsWithOutProdIds';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  editproductdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/product/editProductdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteproduct = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/deleteproduct';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getRelatedProductDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/getrelatedproduct';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  getallProducts = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/getAllProduct';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAvailableColorProductDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/getAvailableColorproduct';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  updateconfigproducts = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/product/updateconfigproducts';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletedisplayonehomeproduct = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/deletedisplayonhome';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getDisplayonHomeDisabledProducts = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/displayonhomedisbaled';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  adddisplayonehomeproduct = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/product/adddisplayonhome';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  protected getRequestHeaders(): {
    headers: HttpHeaders | { [header: string]: string | string[] };
  } {
    let headers;
    const token = localStorage.getItem('ghoastrental-token');
    headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return { headers: headers };
  }
}
