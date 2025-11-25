import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  getLocationDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/viewallLocation';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getLocationWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/getLocationWithId';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  addLocation = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/addLocation';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editLocationdata = (moreData: any, Id: any): Observable<any> => {
    let endpoint = environment.baseUrl + '/api/location/editLocationdata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletelocation = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/deletelocation';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallLocationDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/getAllLocation';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/deletefile';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/location/deletemediadata';
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
