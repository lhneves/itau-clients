import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroUserCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgIconComponent],
  templateUrl: './app.component.html',
  viewProviders: [
    provideIcons({
      heroUserCircle,
    }),
  ],
})
export class AppComponent {
  title = 'itau-clients';
}
