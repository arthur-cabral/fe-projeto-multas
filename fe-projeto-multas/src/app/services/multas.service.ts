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
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }

  getMultaById(id: number): Observable<Multa> {
    return this.httpClient.get<Multa>(this.url + "/byId/" + id, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getMultaByAIT(ait: string): Observable<Multa> {
    return this.httpClient.get<Multa>(this.url + "/byAIT/" + ait, {
      headers: {
        'Content-Type': 'application/json'
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

  putMulta(multaId: number, multa: Multa): Observable<Multa> {
    return this.httpClient.put<Multa>(this.url + "/" + multaId, multa, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }

  deleteMulta(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + "/" + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      }
    });
  }
}