import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementcategoryService {

  constructor(private http: HttpClient) { }

  addCategory = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/addcategory';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getCategoryDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/adminsidecategories';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCategoryWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/getCategoryWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editCategorydata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/achievement/editCategorydata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletecategory = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/deletecategory';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCategoryData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/adminsidecategories';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallCategory = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/getAllCategory';
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
