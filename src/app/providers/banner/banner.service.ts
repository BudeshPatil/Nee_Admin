import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }
  getBannerDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/viewallBanner';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
  
  addBanner = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/addbanner';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };


  getBannerWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/getBannerWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  // update 
  editBannerdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/banner/editBannerdata';
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
exportBanner = (data:any): Observable<any> => {
  const endpoint = environment.baseUrl+'/api/banner/exportbanner';
  return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// import
importallBanner = (file: File): Observable<any> => {
  const formData: FormData = new FormData();
  formData.append('csvFile', file);
  const endpoint = environment.baseUrl+'/api/banner/importbanner';
  return this.http.post(endpoint, formData,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


  deletebanner = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/deletebanner';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deleteallbanners = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/deleteallbanners';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/deletefile';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/banner/deletemediadata';
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