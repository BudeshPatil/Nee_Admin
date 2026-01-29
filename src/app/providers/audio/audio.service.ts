import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(
    private http: HttpClient
  ) { }

  getAudioDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/audio/viewallAudio';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getAudioWithId = (moreData: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/audio/getAudioWithId';
    return this.http
      .post(endpoint, moreData, this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addAudio = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/audio/addAudio';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

  editAudiodata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/audio/editAudiodata';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deleteaudio = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/audio/deleteaudio';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteSelectedAudio = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/audio/deleteallaudios';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallAudioDetails = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/audio/getAllAudio';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletefile = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/audio/deletefile';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deletemultifiles = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/audio/deletemultifiles';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteAudioData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/audio/deleteaudiodata';
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
