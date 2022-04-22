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
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.serverURL}views`,{headers:reqHeader});
  }
  getone(id:number): Observable<any> {
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.serverURL}views/${id}`,{headers:reqHeader});
  }
  update(id:number, views:View):Observable<any>{
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.serverURL}views/${id}`, views,{headers:reqHeader})
  }
  delete(id:number):Observable<any>{
    const token:any = localStorage.getItem('token')
    const reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.serverURL}views/${id}`,{headers:reqHeader})
  }
}
