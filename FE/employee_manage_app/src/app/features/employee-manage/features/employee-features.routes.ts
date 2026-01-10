import { Routes } from '@angular/router';

export const EMPLOYEE_FEATURES_ROUTES: Routes = [
    {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'employees',
        loadComponent: () => import('./employee-list/employee-list.component').then(m => m.EmployeeListComponent)
    }
];
