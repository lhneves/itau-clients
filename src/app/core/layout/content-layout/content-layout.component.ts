import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  imports: [RouterOutlet, HeaderComponent],
})
export class ContentLayoutComponent {}
