import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(
    private http: HttpClient
  ) { }

  getPaymentDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/payments/paymentmethodgetall';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getPaymentWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/payments/paymentmethodbyid';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addPayment = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/payments/paymentmethodadd';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editPaymentdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/payments/paymentmethodedit';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deletepayments = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/payments/paymentmethoddelete';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallPaymentDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/payments/getallpaymentmethod';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
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
