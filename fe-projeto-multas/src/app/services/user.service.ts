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
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }

  getUserById(id: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(this.url + "/" + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }

  putUser(userId: string, user: UserModel): Observable<UserModel> {
    user.id = userId;
    return this.httpClient.put<UserModel>(this.url, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }

  deleteUser(id: string): Observable<UserModel> {
    return this.httpClient.delete<UserModel>(this.url + "/" + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}
