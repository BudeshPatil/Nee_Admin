import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EventService {

	constructor(private http: HttpClient) { }
	getEventDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/viewallevent';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	addEvent = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/addevent';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};


	getEventWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/getEventWithId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	// update
	editEventdata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/event/editEventdata';
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
	exportEvent = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/exportevent';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	// import
	importallEvent = (file: File): Observable<any> => {
		const formData: FormData = new FormData();
		formData.append('csvFile', file);
		const endpoint = environment.baseUrl + '/api/event/importevent';
		return this.http.post(endpoint, formData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	deleteevent = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/deleteevent';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	deleteallevents = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/deleteallevents';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletefile = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/deletefile';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteMediaData = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/event/deletemediadata';
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
