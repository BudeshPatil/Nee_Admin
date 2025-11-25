import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	constructor(private http: HttpClient) { }

	getTagDeta = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/viewtag';
		return this.http.post(endpoint, data).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getAuthorData = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getauthors';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	addBlog = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/addblog';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	getblogDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/bloglisting';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getblogWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getblogWithId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editBlogdata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/blog/editblogdata';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteblog = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deleteblog';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getcommentDetails = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getblogcomment';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	deletecomment = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deletecomment';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getInviteDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/adminsideinvites';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getInviteWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/getinviteId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	addInvite = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/addinvite';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editInvitedata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/blog/editinvite';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteinvite = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/deleteinvite';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	downloadInvites = (): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/blog/downloadinvites';
		return this.http.post(endpoint, this.getRequestHeaders()).pipe(
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
		const token = localStorage.getItem('ghoastrental-token');
		headers = new HttpHeaders({
			Authorization: `Bearer ${token}`,
		});
		return { headers: headers };
	}

}
