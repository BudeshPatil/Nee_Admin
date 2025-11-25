import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient) { }

  addShipping = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/shipping/addshipping';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getShippingDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/shipping/viewallshipping';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  
  getShippingWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/shipping/getShippingWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editshippingdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/shipping/editShippingdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteshipping = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/shipping/deleteshipping';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallShippings = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/shipping/getallshipping';
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
