import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	constructor(private http: HttpClient) { }

	getCategoryDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/category/categorygetall';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getCategoryWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/category/categorybyid';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addCategory = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/category/categoryadd';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editCategorydata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/category/categoryedit';
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
		const endpoint = environment.baseUrl + '/api/category/categorydelete';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallCategoryDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/category/getallcategory';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletefile = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/category/deletefile';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteMediaData = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/category/deletemediadata';
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
