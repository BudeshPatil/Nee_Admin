import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PromocodeService {

	constructor(private http: HttpClient) { }



	getAllPromocode = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/promocode/viewallpromocode';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getPromocodeById = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/promocode/getpromocodewithid';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addPromocode = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/promocode/addpromocode';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editPromoCodeData = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/promocode/editPromocodedata';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletePromocode = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/promocode/deletepromocode';
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
