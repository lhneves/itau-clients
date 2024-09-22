import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { IClient } from '../../models/clients.model';

import { MessageService } from 'primeng/api';
import { ClientService } from '../../service/client.service';

import { ToastModule } from 'primeng/toast';
import { ClientCardComponent } from '../../components/client-card/client-card.component';
import { ClientSearchComponent } from '../../components/client-search/client-search.component';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [
    CommonModule,
    ToastModule,
    ClientCardComponent,
    ClientSearchComponent,
  ],
  templateUrl: './clients.component.html',
  providers: [MessageService],
})
export class ClientsPageComponent {
  clients: IClient[] = [];
  errorMessage: string | null = null;

  clientService = inject(ClientService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients(filters?: Partial<IClient>) {
    this.clientService.getAll(filters).subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: () => {
        this.errorMessage =
          'Não foi possível carregar os clientes. Tente novamente.';
      },
    });
  }

  handleSearch(filters: Partial<IClient>) {
    this.fetchClients(filters);
  }

  onClientDelete() {
    this.messageService.add({
      severity: 'success',
      summary: 'Deletado',
      detail: 'Cliente deletado com sucesso!',
    });

    this.fetchClients();
  }
}
