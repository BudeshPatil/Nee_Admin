import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  addConfig = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/addconfig';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editConfigdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/config/editConfigdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getConfigWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/getConfigWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getConfigDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/viewallConfig';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAllConfig = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/getAllConfig';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteconfig = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/deleteconfig';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCategories = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/getAllConfig';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	// testEmail = (data:any): Observable<any> => {
  //   const endpoint = environment.baseUrl+'/api/config/testemail';
  //   return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
  //     catchError((err) => {
  //       return throwError(err);
  //     })
  //   );
  // };

	testEmail = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/testemail';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  generareSitemapXML = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/config/generateSitemapXML';
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
