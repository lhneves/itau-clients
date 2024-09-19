import { Component } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [NgIconComponent],
  standalone: true,
})
export class HeaderComponent {}
