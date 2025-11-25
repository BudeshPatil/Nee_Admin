import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //Dashboard API's
  getboardDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/dashboard/viewDashboard';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getResponseDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/response/viewallResponse';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteresponse = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/response/deleteresponse';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getResponseWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/response/responsebyid';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getallResponseDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/response/getallresponse';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/response/deletefile';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addErrorResponse = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/response/addErrorResponse';
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
