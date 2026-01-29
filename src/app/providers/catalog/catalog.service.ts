import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }
  getCatalogDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/catalog/viewallCatalog';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addCatalog = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/catalog/addcatalog';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };


  getCatalogWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/catalog/getCatalogWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  // update
  editCatalogdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/catalog/editCatalogdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

// export
exportCatalog = (data:any): Observable<any> => {
  const endpoint = environment.baseUrl+'/api/catalog/exportcatalog';
  return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// import
importallCatalog = (file: File): Observable<any> => {
  const formData: FormData = new FormData();
  formData.append('csvFile', file);
  const endpoint = environment.baseUrl+'/api/catalog/importcatalog';
  return this.http.post(endpoint, formData,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


  deletecatalog = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/catalog/deletecatalog';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deleteallcatalogs = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/catalog/deleteallcatalogs';
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
}
