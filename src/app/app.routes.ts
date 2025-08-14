import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabmenu/principal',
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
    path: 'credencial-editar',
    loadComponent: () => import('./screen/credencial/credencial-editar/credencial-editar.page').then( m => m.CredencialEditarPage)
  },
  {
    path: 'credencial-detalhar',
    loadComponent: () => import('./screen/credencial-detalhar/credencial-detalhar.page').then( m => m.CredencialDetalharPage)
  },
  {
    path: 'tabmenu',
    // loadComponent: () => import('./component/tabmenu/tabmenu.page').then( m => m.TabmenuPage)
    loadChildren: () => import("./component/tabmenu/tabmenu.routes").then(module => module.tabmenuRoutes),
  },
];
