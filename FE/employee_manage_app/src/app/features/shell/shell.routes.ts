import { Routes } from '@angular/router';
import { MainLayoutComponent } from '@core/layout/main-layout/main-layout.component';
import { authGuard } from '@core/guards/auth.guard';

export const SHELL_ROUTES: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('@core/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'employee-manage',
                loadChildren: () => import('../employee-manage/employee-manage.routes').then(m => m.EMPLOYEE_MANAGE_ROUTES)
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    }
];
