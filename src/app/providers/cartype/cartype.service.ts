import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartypeService {

  constructor(
      private http: HttpClient
    ) { }
  
    getCartypeDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/cartype/viewallCartype';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getCartypeWithId = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/cartype/getCartypeWithId';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    addCartype = (moreData:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/cartype/addCartype';
      return this.http
        .post(endpoint, moreData,this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    editCartypedata = (moreData:any,Id:any): Observable<any> => {
      let endpoint = environment.baseUrl+'/api/cartype/editCartypedata';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deletecartype = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/cartype/deletecartype';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getallCartypeDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/cartype/getAllCartype';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deletefile = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/cartype/deletefile';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deleteMediaData = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/cartype/deletemediadata';
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
