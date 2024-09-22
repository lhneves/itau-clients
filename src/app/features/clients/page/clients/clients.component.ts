import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { IClient } from '../../models/clients.model';

import { MessageService } from 'primeng/api';
import { ClientService } from '../../service/client.service';

import { ToastModule } from 'primeng/toast';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { ClientCardComponent } from '../../components/client-card/client-card.component';
import { ClientSearchComponent } from '../../components/client-search/client-search.component';
import { ClientRegisterFormComponent } from '../../components/client-register-form/client-register-form.component';

@Component({
  standalone: true,
  selector: 'app-clients-page',
  imports: [
    CommonModule,
    ToastModule,
    ClientCardComponent,
    ClientSearchComponent,
    ClientRegisterFormComponent,
    PaginatorModule,
  ],
  templateUrl: './clients.component.html',
  providers: [MessageService],
})
export class ClientsPageComponent {
  clients: IClient[] = [];
  errorMessage: string | null = null;

  first: number = 0;
  rows: number = 9;
  page: number = 1;
  totalRecords!: number;

  clientService = inject(ClientService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.fetchClients();
  }

  fetchClients(filters?: Partial<IClient>) {
    this.clientService
      .getAll(filters, { page: this.page, limit: 9 })
      .subscribe({
        next: (response) => {
          this.clients = response.body || [];
          this.totalRecords =
            Number(response.headers.get('x-total-count')) || 0;
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

  onPageChange(event: PaginatorState) {
    const { first, rows, page } = event;

    if (first === undefined || rows === undefined || page === undefined) return;

    this.first = first;
    this.rows = rows;
    this.page = page + 1;
    this.fetchClients();
  }
}
