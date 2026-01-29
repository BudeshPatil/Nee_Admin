import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HomegalleryService {

	constructor(private http: HttpClient) { }

	addGallery = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/homegallery/addgallery';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editGallerydata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/homegallery/editGallerydata';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getGalleryWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/homegallery/getGalleryWithId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	getGalleryDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/homegallery/viewallGallery';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getAllGallery = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/homegallery/getAllGallery';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletegallery = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/homegallery/deletegallery';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getCategories = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/homegallery/getAllGallery';
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
