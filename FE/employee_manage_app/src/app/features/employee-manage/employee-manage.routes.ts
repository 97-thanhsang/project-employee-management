import { Routes } from '@angular/router';
import { EMPLOYEE_FEATURES_ROUTES } from './features/employee-features.routes';
import { EMPLOYEE_UI_ROUTES } from './ui/employee-ui.routes';

export const EMPLOYEE_MANAGE_ROUTES: Routes = [
    // UI routes first to ensure priority over generic feature routes
    ...EMPLOYEE_UI_ROUTES,
    ...EMPLOYEE_FEATURES_ROUTES,
    {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
    }
];
