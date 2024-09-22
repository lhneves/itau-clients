import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NgIconComponent } from '@ng-icons/core';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { IClient } from '../../models/clients.model';

import { MessageService } from 'primeng/api';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-client-register-form',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ReactiveFormsModule,
    NgIf,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './client-register-form.component.html',
  styleUrl: './client-register-form.component.css',
})
export class ClientRegisterFormComponent {
  @Output() createEvent = new EventEmitter();

  visible = false;
  errorMessage = '';

  clientService = inject(ClientService);
  messageService = inject(MessageService);

  riskOptions = [
    { label: 'baixo', value: 'baixo' },
    { label: 'médio', value: 'médio' },
    { label: 'alto', value: 'alto' },
  ];

  registerForm = new FormGroup({
    codigo_cliente: new FormControl<string | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nome: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    risco: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onCreate() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    const { codigo_cliente, nome, risco } = this.registerForm.value;

    if (!codigo_cliente || !nome || !risco) return;

    const client: IClient = { codigo_cliente, risco, nome };
    this.clientService.create(client).subscribe({
      next: () => {
        this.registerForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Criado',
          detail: 'Cliente criado com sucesso!',
        });
        this.visible = false;
        this.createEvent.emit();
      },
      error: (error) => {
        if (String(error.error).includes('duplicate')) {
          this.errorMessage = 'Código de cliente já utilizado.';
        }
      },
    });
  }
}
