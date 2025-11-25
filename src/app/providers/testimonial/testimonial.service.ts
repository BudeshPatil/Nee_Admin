import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient) { }

  addTestimonial = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/addtestimonial';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getTestimonialDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/alltestimonial';
    return this.http.post(endpoint, data).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
  getTestimonialWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/getTestimonialWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editTestimonialdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/home/editTestimonialdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteTestimonial = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/deleteTestimonial';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getcontactDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/allcontact';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletecontact = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/deletecontact';
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
