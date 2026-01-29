import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  getPageDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/viewpage';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  GenrateXml = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/pixtarxml';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  Update_gslMatch = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/match/add';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getPageWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/getPageWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  getHomePageDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/viewhomepage';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getHomePageWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/getHomePageWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editHomePagedata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/home/editHomePagedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  editPagedata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/home/editPagedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addPagedata = (moreData:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/home/addpagedata';
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletePage = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/deletePage';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  // About Notice Services

  getAboutNoticeWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/getAboutNoticeWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addAboutNotice = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/addaboutnoticed';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editAboutNoticedata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/home/editAboutNoticedata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAboutNoticeDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/getAboutNoticeDetails';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteNotice = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/home/deleteNotice';
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
