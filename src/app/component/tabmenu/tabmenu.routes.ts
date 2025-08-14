import { Routes } from '@angular/router';
import { TabmenuPage } from './tabmenu.page';

export const tabmenuRoutes: Routes = [
    {
        path: '',
        component: TabmenuPage,
        children: [
            {
                path: 'principal',
                loadComponent: () => import('../../screen/principal/principal.page').then(m => m.PrincipalPage)
            }
        ]
    },
];
