import { Routes } from '@angular/router';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';

export const routes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent
  },
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  }
];
