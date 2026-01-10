import { Routes } from '@angular/router';

export const EMPLOYEE_FEATURES_ROUTES: Routes = [
    {
        path: 'overview',
        loadComponent: () => import('./overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'employees',
        loadComponent: () => import('./employee-list/employee-list.component').then(m => m.EmployeeListComponent)
    },
    {
        path: 'departments',
        loadComponent: () => import('./department-list/department-list.component').then(m => m.DepartmentListComponent)
    },
    {
        path: 'departments/add',
        loadComponent: () => import('./department-form/department-form.component').then(m => m.DepartmentFormComponent)
    },
    {
        path: 'departments/:id/edit',
        loadComponent: () => import('./department-form/department-form.component').then(m => m.DepartmentFormComponent)
    }
];
