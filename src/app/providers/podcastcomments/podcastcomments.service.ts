import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PodcastcommentsService {

  constructor(private http: HttpClient) { }

  addComments = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/podcast/addcomments';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getCommentsDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/podcast/adminsidecomments';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCommentsWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/podcast/getCommentsWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editCommentsdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/podcast/editCommentsdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletecomments = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/podcast/deletecomments';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCommentsData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/podcast/adminsidecategories';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallComments = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/podcast/getAllComments';
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
