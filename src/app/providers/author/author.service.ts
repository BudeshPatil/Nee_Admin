import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AuthorService {


	constructor(private http: HttpClient) { }

	addAuthor = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/addauthor';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	getAuthorDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/viewauthor';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getAuthorWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getAuthorWithId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editAuthordata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/blog/editAuthordata';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteauthor = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deleteauthor';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
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

	getAllAuthors = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getauthors';
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
