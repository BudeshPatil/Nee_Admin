import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  addOrder = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/addOrder';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  UpdateAdminOrderStatus = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/UpdateAdminOrderStatus';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getOrderDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/viewadminorder';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  
  getOrderWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/getOrderDataByOrderId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editorderdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/order/editOrderdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteorder = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/deleteorder';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getRelatedOrderDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/getrelatedorder';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  getallOrders = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/getAllOrder';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAdminOrderSummaryData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/viewadminorderSummary';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  downloadInvoice = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/downloadInvoice';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  generateInvoice = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/generateInvoice';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  UpdateOrderPaymentStatus = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/order/UpdateAdminOrderPayementStatus';
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
