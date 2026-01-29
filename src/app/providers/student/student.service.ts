import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  getStudentDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/viewallStudent';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addStudent = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/addstudent';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };


  getStudentWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/getStudentWithId';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  // update
  editStudentdata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/student/editStudentdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  // export
  exportStudent = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/exportstudent';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  // import
  importallStudent = (file: File): Observable<any> => {
    const formData: FormData = new FormData();
    formData.append('csvFile', file);
    const endpoint = environment.baseUrl + '/api/student/importstudent';
    return this.http.post(endpoint, formData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deletestudent = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/deletestudent';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deleteallstudents = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/deleteallstudents';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/deletefile';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/student/deletemediadata';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getCourseData = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/getAllCourse';
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
    const token = localStorage.getItem('neelgund-admin-token');
    headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return { headers: headers };
  }
}
