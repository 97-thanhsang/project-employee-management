import { Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './features/employee/employee-form/employee-form.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'employees',
    children: [
      {
        path: '',
        component: EmployeeListComponent
      },
      {
        path: 'add',
        component: EmployeeFormComponent
      },
      {
        path: ':id/edit',
        component: EmployeeFormComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
