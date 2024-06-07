import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Multa } from '../models/multas/multaModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MultasService {
  url: string = '/api/multa';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllMultas(): Observable<Multa[]> {
    return this.httpClient.get<Multa[]>(this.url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('bearerToken')
      }
    });
  }

  getMultaById(id: number): Observable<Multa> {
    return this.httpClient.get<Multa>(this.url + "/" + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('bearerToken')
      }
    });
  }

  postMulta(multa: Multa): Observable<Multa> {
    return this.httpClient.post<Multa>(this.url, multa, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}