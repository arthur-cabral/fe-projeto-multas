import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/auth/loginModel';
import { AccessTokenModel } from '../models/auth/accessTokenModel';
import { RegisterModel } from '../models/auth/registerModel';
import { MessageResponse } from '../models/responses/MessageResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = '/api/auth';
  private userRole: string | null = null;


  constructor(
    private httpClient: HttpClient
  ) { }

  login(login: LoginModel): Observable<AccessTokenModel> {
    var request = this.httpClient.post<AccessTokenModel>(this.url + "/login", login);
    request.subscribe(response => {
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('expiration', response.expiration.toString());
      localStorage.setItem('userRoles', JSON.stringify(response.roles));
    });
    return request;
  }

  register(register: RegisterModel): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(this.url + "/register", register);
  }

  getRoles(): string | null {
    var userRoles = localStorage.getItem('userRoles');
    return userRoles ? JSON.parse(userRoles) : null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRoles');
  }

}
