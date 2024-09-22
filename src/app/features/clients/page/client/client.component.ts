import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../../../core/layout/header/header.component';

import { ClientService } from '../../service/client.service';
import { IClient } from '../../models/clients.model';

@Component({
  standalone: true,
  selector: 'app-client-page',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './client.component.html',
})
export class ClientPageComponent implements OnInit {
  clientInfo: IClient | null = null;
  errorMessage: string = '';

  clientService = inject(ClientService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const clientCode = this.route.snapshot.paramMap.get('code');

    if (clientCode === null) {
      this.errorMessage =
        'Não foi possível adquirir o código do cliente. Tente novamente.';
      return;
    }

    this.fetchClient(clientCode);

    this.clientService.getAll();
  }

  fetchClient(clientCode: string) {
    this.clientService.getAll({ codigo_cliente: clientCode }).subscribe({
      next: (data) => {
        if (data.length === 0) {
          this.errorMessage = 'Cliente não encontrado.';
          return;
        }

        this.clientInfo = data[0];
      },
      error: () => {
        this.errorMessage = 'Não foi possível carregar o cliente.';
      },
    });
  }
}
