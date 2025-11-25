import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectioncategoryService {

  constructor(
      private http: HttpClient
    ) { }
  
    getCollectionCategoryDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/collectioncategory/viewallCollectionCategory';
      return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getCollectionCategoryWithId = (moreData: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/collectioncategory/getCollectionCategoryWithId';
      return this.http
        .post(endpoint, moreData, this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    addCollectionCategory = (moreData:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/collectioncategory/addCollectionCategory';
      return this.http
        .post(endpoint, moreData,this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    editCollectionCategorydata = (moreData:any,Id:any): Observable<any> => {
      let endpoint = environment.baseUrl+'/api/collectioncategory/editCollectionCategorydata';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deletecollectionCategory = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/collectioncategory/deletecollectionCategory';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getallCollectionCategoryDetails = (data: any): Observable<any> => {
      const endpoint = environment.baseUrl + '/api/collectioncategory/getAllCollectionCategory';
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
