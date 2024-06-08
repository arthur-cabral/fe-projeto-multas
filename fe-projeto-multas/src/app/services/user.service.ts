import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user/userModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = '/api/user';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUsers(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(this.url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('bearerToken')
      }
    });
  }
}
