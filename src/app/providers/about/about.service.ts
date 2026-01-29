import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  getaboutDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/about/viewallAboutus';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  editaboutdata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/about/editabout';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	addAboutData = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/about/addabout';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  deletefile = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/about/deletefile';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/about/deletemediadata';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAboutWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/about/getaboutid';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };
  getAboutDelete = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/about/aboutdelete';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
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
}
