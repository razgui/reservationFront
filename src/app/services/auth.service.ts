import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private tokenKey = 'jwt_token'; // Key to store the token in localStorage
  private currentUser! : string ;
  constructor(private http: HttpClient) {}

  registerUser(user: UserDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/auth/register`, user, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  loginUser(user: UserDTO): Observable<any> {
    this.currentUser = user.email!;
    return this.http.post(`${this.baseUrl}/auth/authenticate`, user);
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public logout() {
    // Clear the token from localStorage on logout
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem("currentUser")
  }

  public setToken(token: string) {
    // Store the token in localStorage after successful login
    localStorage.setItem(this.tokenKey, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public storeCurrentUser(){
    return localStorage.setItem('currentUser',this.currentUser) ;
  }
  public removeCurrentUser(){
    localStorage.removeItem('currentUser')
  }
}
