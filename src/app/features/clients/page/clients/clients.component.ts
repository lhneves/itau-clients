import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { IClient } from '../../models/clients.model';

import { ClientService } from '../../service/client.service';

import { ClientCardComponent } from '../../components/client-card/client-card.component';
import { ClientSearchComponent } from '../../components/client-search/client-search.component';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [CommonModule, ClientCardComponent, ClientSearchComponent],
  templateUrl: './clients.component.html',
})
export class ClientsPageComponent {
  clients: IClient[] = [];
  errorMessage: string | null = null;

  clientService = inject(ClientService);

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients(filters?: Partial<IClient>) {
    this.clientService.getAll(filters).subscribe(
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

  handleSearch(filters: Partial<IClient>) {
    this.fetchClients(filters);
  }
}
