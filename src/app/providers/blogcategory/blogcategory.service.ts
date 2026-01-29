import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BlogcategoryService {

	constructor(private http: HttpClient) { }

	getCategoryDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/viewcategory';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getCategoryWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getCategoryWithId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addCategory = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/addcategory';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editCategorydata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/blog/editCategorydata';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletecategory = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deletecategory';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallCategoryDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/categorylisting';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletefile = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deletefile';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteMediaData = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deletemediadata';
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
