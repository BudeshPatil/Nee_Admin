import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BodytypeService {

  constructor(
    private http: HttpClient
  ) { }

  getBodytypeDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/viewallBodytype';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getBodytypeWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/getBodytypeWithId';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addBodytype = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/addBodytype';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editBodytypedata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/bodytype/editBodytypedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletebodytype = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/deletebodytype';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallBodytypeDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/getAllBodytype';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/deletefile';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/bodytype/deletemediadata';
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