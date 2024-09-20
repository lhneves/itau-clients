import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

import { IClient } from '../../models/clients.model';

@Component({
  selector: 'app-client-search',
  standalone: true,
  imports: [FormsModule, InputNumberModule, DropdownModule, ButtonModule],
  templateUrl: './client-search.component.html',
  styleUrl: './client-search.component.css',
})
export class ClientSearchComponent {
  clientCode!: number;
  risk: string = '';

  @Output() searchEvent = new EventEmitter<Partial<IClient>>();

  riskOptions = [
    { label: 'todos', value: 'todos' },
    { label: 'baixo', value: 'baixo' },
    { label: 'medio', value: 'médio' },
    { label: 'alto', value: 'alto' },
  ];

  submitSearch() {
    this.searchEvent.emit({
      codigo_cliente: this.clientCode,
      risco: this.risk,
    });
  }
}
