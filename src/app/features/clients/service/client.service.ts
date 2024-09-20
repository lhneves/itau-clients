import { shareReplay } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { IClient } from '../models/clients.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:3000';

  constructor(private readonly http: HttpClient) {}

  getAll(filters: Partial<IClient> = {}) {
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
}
