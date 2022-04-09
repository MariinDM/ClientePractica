import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  serverURL=environment.apiURL
  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
  //   const token:any = localStorage.getItem('token')
  //   const reqHeader = new HttpHeaders({ 
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //  });
    return this.http.get(`${this.serverURL}category`);
  }
}
