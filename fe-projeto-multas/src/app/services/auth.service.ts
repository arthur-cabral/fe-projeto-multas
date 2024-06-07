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

  constructor(
    private httpClient: HttpClient
  ) { }

  login(login: LoginModel): Observable<AccessTokenModel> {
    return this.httpClient.post<AccessTokenModel>(this.url + "/login", login);
  }

  register(register: RegisterModel): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(this.url + "/register", register);
  }

}
