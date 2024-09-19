import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './core/layout/content-layout/content-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/clients/page/clients/clients.component').then(
            (m) => m.ProductPageComponent
          ),
      },
    ],
  },
  // {
  //   path: 'client/:code',
  //   loadComponent: () =>
  //     import(
  //       './features/products/page/product-edit/product-edit.component'
  //     ).then((m) => m.ProductEditComponent),
  // },
];
