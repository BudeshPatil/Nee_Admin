import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class SubcategoryService {

	constructor(
		private http: HttpClient
	) { }

	
	getSubCategoryDetails = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/subcategory/subcategorygetall';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	deletesubcategory = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subcategory/subcategorydelete';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	getSubCategoryWithId = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subcategory/subcategorybyid';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	addSubCategory = (moreData:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/subcategory/subcategoryadd';
    return this.http
      .post(endpoint, moreData,this.getRequestHeaders())
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  };

	editSubCategorydata = (moreData:any,Id:any): Observable<any> => {
    let endpoint = environment.baseUrl+'/api/subcategory/subcategoryedit';
    if (Id) {
      endpoint += `?id=${Id}`;
    }
    return this.http.post(endpoint, moreData,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  getallSubCategory = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/subcategory/getallsubcategory';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };
 
  getsubCategoryByCategory = (data: any): Observable<any> => {
    const endpoint = environment.baseUrl + '/api/subcategory/getsubcategorybycatid';
    return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

  deleteMediaData = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/category/deletemediadata';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
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
