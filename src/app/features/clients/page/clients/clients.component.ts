import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { IClient } from '../../models/clients.model';

import { ClientService } from '../../service/client.service';

import { ClientCardComponent } from '../../components/client-card/client-card.component';

@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [CommonModule, ClientCardComponent],
  templateUrl: './clients.component.html',
})
export class ProductPageComponent {
  clients: IClient[] = [];
  errorMessage: string | null = null;

  clientService = inject(ClientService);

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients() {
    this.clientService.getAll().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients:', error);
        this.errorMessage =
          'Não foi possível carregar os clientes. Tente novamente';
      }
    );
  }
}
