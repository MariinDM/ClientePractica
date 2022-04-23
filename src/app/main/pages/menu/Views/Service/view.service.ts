import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { View } from 'src/app/main/Model/view';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  serverURL=environment.apiURL  

  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}views`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}views/${id}`);
  }
  update(id:number, views:View):Observable<any>{
    return this.http.put(`${this.serverURL}views/${id}`, views)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${this.serverURL}views/${id}`)
  }
}
