import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {

	constructor(private http: HttpClient) { }

	getProjectDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/project/projectgetlist';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	deleteProject = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/project/projectdelete';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};


	addProject = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/project/projectadd';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};


	getProjectById = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/project/projectbyid';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editProjectdata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/project/projectedit';
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

	getAllProjects = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/project/allprojects';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getRecentProjects = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/project/relatedProjects';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	  getCategoryData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/category/viewcategory';
    return this.http.post(endpoint, data).pipe(
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
