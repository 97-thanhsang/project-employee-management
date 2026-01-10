import { Routes } from '@angular/router';

export const EMPLOYEE_FEATURES_ROUTES: Routes = [
    {
        path: 'overview',
        loadComponent: () => import('../features/overview/overview.component').then(m => m.OverviewComponent)
    },
    {
        path: 'employees',
        children: [
            { path: '', loadComponent: () => import('./employee/employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
            { path: 'add', loadComponent: () => import('./employee/employee-edit/employee-edit.component').then(m => m.EmployeeEditComponent) },
            { path: ':id/edit', loadComponent: () => import('./employee/employee-edit/employee-edit.component').then(m => m.EmployeeEditComponent) }
        ]
    },
    {
        path: 'departments',
        children: [
            { path: '', loadComponent: () => import('./department/department-list/department-list.component').then(m => m.DepartmentListComponent) },
            { path: 'add', loadComponent: () => import('./department/department-edit/department-edit.component').then(m => m.DepartmentEditComponent) },
            { path: ':id/edit', loadComponent: () => import('./department/department-edit/department-edit.component').then(m => m.DepartmentEditComponent) }
        ]
    },
    {
        path: 'designations',
        children: [
            { path: '', loadComponent: () => import('./designation/designation-list/designation-list.component').then(m => m.DesignationListComponent) },
            { path: 'add', loadComponent: () => import('./designation/designation-edit/designation-edit.component').then(m => m.DesignationEditComponent) },
            { path: ':id/edit', loadComponent: () => import('./designation/designation-edit/designation-edit.component').then(m => m.DesignationEditComponent) }
        ]
    }
];
