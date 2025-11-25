import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }

  addWishlist = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/wishlist/addNewWishlist';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getWishlistDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/wishlist/adminwishlistview';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }; 

  
  getWishlistWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/wishlist/getwishlistWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editwishlistdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/wishlist/editwishlistdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletewishlist = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/wishlist/deletewishlist';
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
