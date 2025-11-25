import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ShopbyService {



	constructor(private http: HttpClient) { }
	getShopbyDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/viewallShopby';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	addShopby = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/addShopby';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};


	getShopbyWithId = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/getShopbyWithId';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	// update
	editShopbydata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/shopby/editShopbydata';
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
	exportShopby = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/exportshopby';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	// import
	importallShopby = (file: File): Observable<any> => {
		const formData: FormData = new FormData();
		formData.append('csvFile', file);
		const endpoint = environment.baseUrl + '/api/shopby/importshopby';
		return this.http.post(endpoint, formData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	deleteshopby = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/deleteshopby';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	deleteallshopbys = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/deleteallshopbys';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletefile = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/deletefile';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deleteMediaData = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/shopby/deletemediadata';
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
