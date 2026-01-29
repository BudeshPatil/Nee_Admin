import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CompanyService {
	private baseUrl = `${environment.baseUrl}/api/company`;

	constructor(private http: HttpClient) { }

	create(formData: FormData) {
		return this.http.post(`${this.baseUrl}/create`, formData);
	}

	update(id: string, formData: FormData) {
		return this.http.put(`${this.baseUrl}/update/${id}`, formData);
	}

	getAll() {
		return this.http.get<any>(`${this.baseUrl}/all`);
	}

	delete(id: string) {
		return this.http.delete(`${this.baseUrl}/delete/${id}`);
	}
}
