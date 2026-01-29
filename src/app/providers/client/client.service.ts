import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class ClientService {

	constructor(private http: HttpClient) { }

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

	getClient = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/client/clientgetall';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	getClientById = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/client/clientgetbyid';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	clientadd = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/client/clientadd';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	clientupdate = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/client/clientupdate';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	clientdelete = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/client/clientdelete';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};
}
