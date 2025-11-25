import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {

  constructor(
    private http: HttpClient
  ) { }

  getReturnDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/return/returngetall';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getReturnWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/return/returnbyid';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addReturn = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/return/returnadd';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editReturndata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/return/returnedit';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deletereturn = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/return/returndelete';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallReturnDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/return/getallreturn';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  getReasonDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/return/reasongetall';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getReasonWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/return/reasonbyid';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addReason = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/return/reasonadd';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editReasondata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/return/reasonedit';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deletereason = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/return/reasondelete';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallReasonDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/return/getallreason';
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
