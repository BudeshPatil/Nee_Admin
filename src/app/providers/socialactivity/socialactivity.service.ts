import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocialactivityService {

  constructor(private http: HttpClient) { }
  getSocialactivityDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/viewallSocialactivity';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addSocialactivity = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/addsocialactivity';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };


  getSocialactivityWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/getSocialactivityWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  // update
  editSocialactivitydata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/socialactivity/editSocialactivitydata';
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
exportSocialactivity = (data:any): Observable<any> => {
  const endpoint = environment.baseUrl+'/api/socialactivity/exportsocialactivity';
  return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// import
importallSocialactivity = (file: File): Observable<any> => {
  const formData: FormData = new FormData();
  formData.append('csvFile', file);
  const endpoint = environment.baseUrl+'/api/socialactivity/importsocialactivity';
  return this.http.post(endpoint, formData,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


  deletesocialactivity = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/deletesocialactivity';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deleteallsocialactivitys = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/deleteallsocialactivitys';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/deletefile';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/socialactivity/deletemediadata';
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
