import { Routes } from '@angular/router';
import { SHELL_ROUTES } from './features/shell/shell.routes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent)
  },
  ...SHELL_ROUTES,
  {
    path: '**',
    redirectTo: 'login'
  }
];
