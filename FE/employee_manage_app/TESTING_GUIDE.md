/**
 * Test file for Employee Service & Store
 * Hướng dẫn sử dụng:
 * 1. Đảm bảo backend API đang chạy tại http://localhost:5000
 * 2. Chạy app: ng serve
 * 3. Mở DevTools console và test các function
 */

// ============= Example Usage in Console =============

/*
// 1. Inject EmployeeStore vào một component
import { EmployeeStore } from '@core/store/employee.store';

// 2. Test loadEmployees
store.loadEmployees();
console.log(store.isLoading()); // true
console.log(store.employees()); // []

// Sau 1-2 giây (API response)
setTimeout(() => {
  console.log(store.isLoading()); // false
  console.log(store.employees()); // [Employee[], ...]
}, 2000);

// 3. Test addEmployee
store.addEmployee({
  name: 'John Doe',
  contactNo: '0123456789',
  email: 'john@example.com',
  city: 'Ha Noi',
  state: 'HN',
  pincode: '100000',
  address: 'Pham Hung',
  designationId: 1,
  password: 'Password@123'
});

// 4. Test updateEmployee
store.updateEmployee(1, {
  employeeId: 1,
  name: 'Jane Doe',
  contactNo: '0987654321',
  email: 'jane@example.com',
  city: 'Ho Chi Minh',
  state: 'HCM',
  pincode: '700000',
  address: 'Nguyen Hue',
  designationId: 2
});

// 5. Test deleteEmployee
store.deleteEmployee(1);

// 6. Test selectEmployee
const emp = store.employees()[0];
store.selectEmployee(emp);
console.log(store.selectedEmployee()); // Employee object

// 7. Test clearError
store.clearError();

// 8. Test resetState
store.resetState();
console.log(store.employees()); // []
console.log(store.isLoading()); // false
console.log(store.error()); // null
*/

// ============= Component Example =============

/*
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeStore } from '@core/store/employee.store';
import { Employee } from '@core/models';

@Component({
  selector: 'app-employee-test',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h1>Employee List</h1>

      <!-- Loading State -->
      <div *ngIf="store.isLoading()">
        <p>Loading employees...</p>
      </div>

      <!-- Error State -->
      <div *ngIf="store.isError()" class="error">
        <p>{{ store.error() }}</p>
        <button (click)="store.clearError()">Dismiss</button>
      </div>

      <!-- Empty State -->
      <div *ngIf="!store.hasEmployees() && !store.isLoading()">
        <p>No employees found</p>
      </div>

      <!-- List State -->
      <table *ngIf="store.hasEmployees()">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let emp of store.employees()">
            <td>{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ emp.contactNo }}</td>
            <td>
              <button (click)="selectEmployee(emp)">View</button>
              <button (click)="deleteEmployee(emp.employeeId)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Selected Employee Details -->
      <div *ngIf="store.selectedEmployee()" class="details">
        <h2>{{ store.selectedEmployee()?.name }}</h2>
        <p>Email: {{ store.selectedEmployee()?.email }}</p>
        <p>Contact: {{ store.selectedEmployee()?.contactNo }}</p>
        <button (click)="store.deselectEmployee()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .error {
      color: red;
      padding: 10px;
      margin: 10px 0;
      background: #fee;
    }
    .details {
      margin: 20px 0;
      padding: 10px;
      border: 1px solid #ccc;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background: #f0f0f0;
    }
    button {
      margin: 0 5px;
      padding: 5px 10px;
      cursor: pointer;
    }
  `]
})
export class EmployeeTestComponent implements OnInit {
  store = inject(EmployeeStore);

  ngOnInit(): void {
    this.store.loadEmployees();
  }

  selectEmployee(emp: Employee): void {
    this.store.selectEmployee(emp);
  }

  deleteEmployee(empId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.store.deleteEmployee(empId);
    }
  }
}
*/
