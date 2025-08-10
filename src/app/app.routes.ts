import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'credencial-cadastrar',
    pathMatch: 'full',
  },
  {
    path: 'credencial-cadastrar',
    loadComponent: () => import('./screen/credencial/credencial-cadastrar/credencial-cadastrar.page').then( m => m.CredencialCadastrarPage)
  },
  {
    path: 'plataforma',
    loadComponent: () => import('./component/modal/plataforma/plataforma.page').then( m => m.PlataformaPage)
  },
];
