import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IClient } from '../models/clients.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getAll(filters: Partial<IClient> = {}): Observable<IClient[]> {
    let params = new HttpParams();

    const { codigo_cliente, risco } = filters;

    if (codigo_cliente) {
      params = params.set('codigo_cliente_like', codigo_cliente);
    }

    if (risco && risco !== 'todos') {
      params = params.set('risco', risco);
    }

    return this.http
      .get<IClient[]>(`${this.apiUrl}/clients`, { params })
      .pipe(shareReplay(1));
  }

  delete(clientCode: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${clientCode}`);
  }

  create(newClient: IClient): Observable<IClient> {
    const formattedClient = {
      ...newClient,
      codigo_cliente: newClient.codigo_cliente.toString().padStart(7, '0'),
    };

    return this.http.post<IClient>(`${this.apiUrl}/clients`, formattedClient);
  }
}
