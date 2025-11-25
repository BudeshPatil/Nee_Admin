import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  
    addVehicle = (moreData:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/addvehicle';
      return this.http
        .post(endpoint, moreData,this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    getVehicleDetails = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/viewallvehicle';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }; 
  
    getDisplayonHomeVehicleDetails = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/displayonhomevehicles';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }; 
  
    
    getVehicleWithId = (moreData:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/getVehicleWithId';
      return this.http
        .post(endpoint, moreData,this.getRequestHeaders())
        .pipe(
          catchError((err) => {
            return throwError(err);
          })
        );
    };
  
    getallVehiclesWithoutProdId = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/getVehiclesWithOutProdIds';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    editvehicledata = (moreData:any,Id:any): Observable<any> => {
      let endpoint = environment.baseUrl+'/api/vehicle/editVehicledata';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deletevehicle = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/deletevehicle';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getRelatedVehicleDetails = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/getrelatedvehicle';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    }; 
  
    getallVehicles = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/getAllVehicle';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getAvailableColorVehicleDetails = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/getAvailableColorvehicle';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    updateconfigvehicles = (moreData:any,Id:any): Observable<any> => {
      let endpoint = environment.baseUrl+'/api/vehicle/updateconfigvehicles';
      if (Id) {
        endpoint += `?id=${Id}`;
      }
      return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    deletedisplayonehomevehicle = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/deletedisplayonhome';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    getDisplayonHomeDisabledVehicles = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/displayonhomedisbaled';
      return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
    };
  
    adddisplayonehomevehicle = (data:any): Observable<any> => {
      const endpoint = environment.baseUrl+'/api/vehicle/adddisplayonhome';
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
