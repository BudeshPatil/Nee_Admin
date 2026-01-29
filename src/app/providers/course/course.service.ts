import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }
  getCourseDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/viewallCourse';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addCourse = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/addcourse';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };


  getCourseWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/getCourseWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  // update
  editCoursedata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/course/editCoursedata';
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
exportCourse = (data:any): Observable<any> => {
  const endpoint = environment.baseUrl+'/api/course/exportcourse';
  return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// import
importallCourse = (file: File): Observable<any> => {
  const formData: FormData = new FormData();
  formData.append('csvFile', file);
  const endpoint = environment.baseUrl+'/api/course/importcourse';
  return this.http.post(endpoint, formData,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


  deletecourse = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/deletecourse';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deleteallcourses = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/deleteallcourses';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/deletefile';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/course/deletemediadata';
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
