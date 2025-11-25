import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterloginService {

  constructor(private http: HttpClient) { }
  
  validateLogin = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/login';
    return this.http
      .post(endpoint, moreData, { observe: 'response' as 'body' })
      .pipe(
        catchError((err) => { 
          return throwError(err);
        })
      );
  };

  updateProfile = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/updateprofile';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editProfile = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/edituserprofile';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  createrofile = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/registerUser';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getUser = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/getuserwithid';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getallusers = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/adminuserview';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  deleteuser = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/deleteuser';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  forgotPassword = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/forgotcustomerpasswordlink';
    return this.http
      .post(endpoint, moreData)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  ChangePassword = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/users/updateforgotpassword';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
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
