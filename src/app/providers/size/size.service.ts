import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  constructor(private http: HttpClient) { }

  addSize = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/size/addsize';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getSizeDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/size/viewallsize';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  
  getSizeWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/size/getSizeWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editsizedata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/size/editSizedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletesize = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/size/deletesize';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallSizes = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/size/getallsize';
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
