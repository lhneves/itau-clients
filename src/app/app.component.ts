import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroUserCircle } from '@ng-icons/heroicons/outline';
import {
  ionAddCircleOutline,
  ionArrowRedoSharp,
  ionTrashSharp,
} from '@ng-icons/ionicons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIconComponent],
  templateUrl: './app.component.html',
  viewProviders: [
    provideIcons({
      heroUserCircle,
      ionTrashSharp,
      ionArrowRedoSharp,
      ionAddCircleOutline,
    }),
  ],
})
export class AppComponent {
  title = 'itau-clients';
}
