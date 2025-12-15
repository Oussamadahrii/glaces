import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./Icecream/Icecream').then(m => m.Icecream)
  },
  {
    path: 'empty/:name',
    loadComponent: () =>
      import('./empty-flavour/empty-flavour').then(m => m.EmptyFlavour)
  }
];
