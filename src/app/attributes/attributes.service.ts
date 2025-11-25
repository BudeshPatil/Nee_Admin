import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(
    private http: HttpClient
  ) { }

  getAttributeDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/attribute/viewallAttribute';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAttributeWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/attribute/getAttributeWithId';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addAttribute = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/attribute/addAttribute';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editAttributedata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/attribute/editAttributedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deleteattribute = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/attribute/deleteattribute';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallAttributeDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/attribute/getAllAttribute';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  //Attribute Set API's
  getAttributeSetDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/attribute/viewallAttributeset';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAttributeSetWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/attribute/getAttributesetWithId';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addAttributeSet = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/attribute/addAttributeset';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editAttributeSetdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/attribute/editAttributesetdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deleteattributeSet = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/attribute/deleteattributeset';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallAttributeSetDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/attribute/getAllAttributeset';
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
