import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User, UserLogin } from '../Model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverURL = environment.apiURL

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<any> {
    return this.http.post(`${this.serverURL}user/login`, user)
      .pipe(
        map((res: any) => {
          // console.log(res)
          this.saveToken(res.token.token, res.token.refreshToken)
          return res
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  private saveToken(token: string, refreshToken: string): void {
    localStorage.setItem("token", token)
    localStorage.setItem("refreshToken", refreshToken)

  }

  private clearToken(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")

  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = `Ocurrio un Error`;
    if (err) {
      errorMessage = `Error: code ${err.mesagge}`;
    }
    return throwError(errorMessage)
  }

  logout(): void {
    const token: any = localStorage.getItem('token')
    this.clearToken()
    this.http.post(`${this.serverURL}logout`, token)
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.serverURL}user/register`, user)
      .pipe(
        map((res: any) => {
          this.saveToken(res.token.token, res.token.refreshToken)
          return res
        }),
        catchError((err) => this.handlerError(err))
      )
  }

  changePassword1(user: UserLogin): Observable<any> {
    return this.http.post(`${this.serverURL}user/change1/password`, user)
  }
  changePassword2(password: string): Observable<any> {
    return this.http.post(`${this.serverURL}user/change2/password`, password)
  }
  getUser(): Observable<any> {
    return this.http.get(`${this.serverURL}user/get/user`)
  }
}
