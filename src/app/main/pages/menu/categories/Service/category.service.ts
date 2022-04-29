import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/main/Model/category';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  serverURL = environment.apiURL

  constructor(private http: HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}category`);
  }
  getone(id: number): Observable<any> {
    return this.http.get(`${this.serverURL}category/${id}`);
  }
  insert(category: Category): Observable<any> {
    return this.http.post(`${this.serverURL}category`, category)
  }
  update(id: number, category: Category): Observable<any> {
    return this.http.put(`${this.serverURL}category/${id}`, category)
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.serverURL}category/${id}`)
  }
}
