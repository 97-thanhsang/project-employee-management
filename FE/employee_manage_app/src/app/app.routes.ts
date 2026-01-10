import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./core/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'employee-manage',
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./features/employee-manage/features/dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
          {
            path: 'employees',
            children: [
              {
                path: '',
                loadComponent: () => import('./features/employee-manage/features/employee-list/employee-list.component').then(m => m.EmployeeListComponent)
              },
              {
                path: 'add',
                loadComponent: () => import('./features/employee-manage/ui/employee/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
              },
              {
                path: ':id/edit',
                loadComponent: () => import('./features/employee-manage/ui/employee/employee-form/employee-form.component').then(m => m.EmployeeFormComponent)
              }
            ]
          },
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
