import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

	getServiceDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/service/servicegetlist';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	deleteService = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/service/servicedelete';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	addService = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/service/serviceadd';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};


	getServiceById = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/service/servicebyid';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editServicedata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/service/serviceedit';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};



	getInfluencerDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/home/viewinfluencer';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteprogram = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/home/deleteprogram';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getAllServices = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/service/allservices';
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
		const token = localStorage.getItem('neelgund-admin-token');
		headers = new HttpHeaders({
			Authorization: `Bearer ${token}`,
		});
		return { headers: headers };
	}
}
