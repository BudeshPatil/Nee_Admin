import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AchievementService {

  constructor(private http: HttpClient) { }
  getAchievementDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/viewallAchievement';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  addAchievement = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/addachievement';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };


  getAchievementWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/getAchievementWithId';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  // update
  editAchievementdata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/achievement/editAchievementdata';
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
exportAchievement = (data:any): Observable<any> => {
  const endpoint = environment.baseUrl+'/api/achievement/exportachievement';
  return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};

// import
importallAchievement = (file: File): Observable<any> => {
  const formData: FormData = new FormData();
  formData.append('csvFile', file);
  const endpoint = environment.baseUrl+'/api/achievement/importachievement';
  return this.http.post(endpoint, formData,this.getRequestHeaders()).pipe(
    catchError((err) => {
      return throwError(err);
    })
  );
};


  deleteachievement = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/deleteachievement';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };


  deleteallachievements = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/deleteallachievements';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/deletefile';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/deletemediadata';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	getallCategory = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/achievement/getAllCategory';
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
