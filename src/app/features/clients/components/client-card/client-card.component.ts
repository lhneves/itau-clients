import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NgIconComponent } from '@ng-icons/core';

import { ButtonModule } from 'primeng/button';

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
  ],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss',
})
export class ClientCardComponent {
  @Input() clientInfo!: IClient;
}
