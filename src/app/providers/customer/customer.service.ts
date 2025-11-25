import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

	getCustomerDetails = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/customer/viewallCustomer';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

	deletecustomer = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/deleteCustomerByadmin';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	addCustomer = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/registerCustomer';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	editCustomerdata = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/customer/updateCustomer';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getCustomerWithId = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/getCustomerwithid';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	getAllCustomers = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/customer/getallcustomers';
    return this.http.post(endpoint, data,this.getRequestHeaders()).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  };

// Customer Group API's

  viewCustomer_Group = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/viewCustomerGroup';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

  customer_groupadd = (moreData: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/addCustomerGroup';
		return this.http
			.post(endpoint, moreData, this.getRequestHeaders())
			.pipe(
				catchError((err) => {
					return throwError(err);
				})
			);
	};

	getAllCustomer_Group = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/getAllCustomerGroup';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	getCustomer_GroupById = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/customer_groupgetbyid';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		)
	}

	customer_groupupdate = (moreData: any, Id: any): Observable<any> => {
		let endpoint = environment.baseUrl + '/api/customer/customer_groupupdate';
		if (Id) {
			endpoint += `?id=${Id}`;
		}
		return this.http.post(endpoint, moreData, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	customer_groupdelete = (data: any): Observable<any> => {
		const endpoint = environment.baseUrl + '/api/customer/deleteCustomerGroup';
		return this.http.post(endpoint, data, this.getRequestHeaders()).pipe(
			catchError((err) => {
				return throwError(err);
			})
		);
	};

	getallCustomers = (data:any): Observable<any> => {
    const endpoint = environment.baseUrl+'/api/customer/getallcustomers';
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
