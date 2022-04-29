import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/main/Model/rol';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  serverURL=environment.apiURL  

  constructor(private http:HttpClient) { }

  getall(): Observable<any> {
    return this.http.get(`${this.serverURL}rol`);
  }
  getone(id:number): Observable<any> {
    return this.http.get(`${this.serverURL}rol/${id}`);
  }
  insert(rol:Rol):Observable<any>{
    return this.http.post(`${this.serverURL}rol`, rol)
  }
  update(id:number, rol:Rol):Observable<any>{
    return this.http.put(`${this.serverURL}rol/${id}`, rol)
  }
  delete(id:number):Observable<any>{
    return this.http.delete(`${this.serverURL}rol/${id}`)
  }
}
