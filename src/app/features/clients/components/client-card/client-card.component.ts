import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgIconComponent } from '@ng-icons/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { ClientService } from '../../service/client.service';
import { ConfirmationService } from 'primeng/api';

import { IClient } from '../../models/clients.model';

@Component({
  selector: 'app-client-card',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    RouterOutlet,
    RouterLink,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input() clientInfo!: IClient;
  @Output() deleteEvent = new EventEmitter();

  clientService = inject(ClientService);
  confirmationService = inject(ConfirmationService);

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Tem certeza que deseja deletar esse cliente?',
      header: 'Confirmação',
      icon: 'none',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text mr-2 p-button-lg',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.handleDeleteProduct(this.clientInfo.codigo_cliente ?? '');
      },
    });
  }

  handleDeleteProduct(clientCode: string) {
    this.clientService.delete(clientCode).subscribe((response) => {
      if (response.error) return;

      this.deleteEvent.emit();
    });
  }
}
