import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient) { }

  addSubscriber = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subscriber/addsubscriber';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getSubscriberDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subscriber/adminsubscriberview';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  getSubscriberWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subscriber/getsubscriberWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editsubscriberdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/subscriber/editsubscriberdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletesubscriber = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subscriber/deletesubscriber';
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
    const token = localStorage.getItem('neelgund-admin-token');
    headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return { headers: headers };
  }

  sendMail = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subscriber/sendemail';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  sendMailAll = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subscriber/sendemailAll';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

}
