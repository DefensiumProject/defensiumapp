import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'principal',
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
  {
    path: 'principal',
    loadComponent: () => import('./screen/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'credencial-editar',
    loadComponent: () => import('./screen/credencial/credencial-editar/credencial-editar.page').then( m => m.CredencialEditarPage)
  },
];
