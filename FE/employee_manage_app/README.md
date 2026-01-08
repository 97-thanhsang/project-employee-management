# Employee Management System - Frontend

Angular 17+ Standalone Components with Signal-based State Management.

## 📚 Documentation

**Start here:** [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)

### Quick Links
- **[PHASE_1_FINAL_SUMMARY.md](./PHASE_1_FINAL_SUMMARY.md)** - Project completion status
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick start & API reference
- **[PHASE_1_IMPLEMENTATION.md](./PHASE_1_IMPLEMENTATION.md)** - Complete implementation guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing examples & instructions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Angular CLI 17+
- Backend API running at `http://localhost:5000`

### Installation & Running
```bash
npm install
ng serve --port 4201
```

Navigate to `http://localhost:4201/`

## 🏗️ Architecture

### Layered Design
```
UI Components (Standalone)
    ↓ injects
EmployeeStore (Signal-based State)
    ↓ calls
EmployeeService (HTTP/API Layer)
    ↓
Backend API (.NET 8.0)
```

### Key Features
- ✅ Signal-based state management (no RxJS)
- ✅ Type-safe (0% `any` usage)
- ✅ OnPush change detection ready
- ✅ Clean architecture & separation of concerns
- ✅ Production-ready code

## 🎯 Phase 1: Core (COMPLETE ✅)

### Completed
- [x] Setup Interceptor (Auth)
- [x] Setup Base Models (7 interfaces)
- [x] EmployeeService (5 CRUD methods)
- [x] EmployeeStore (8 actions, 7 signals)

### File Structure
```
src/app/core/
├── models/
│   ├── api-response.model.ts
│   ├── employee.model.ts
│   ├── department.model.ts
│   ├── designation.model.ts
│   └── index.ts
├── services/
│   └── employee.service.ts
└── store/
    └── employee.store.ts
```

## 💡 Usage Example

```typescript
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeStore } from '@core/store/employee.store';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="store.isLoading()">Loading...</div>
    <div *ngIf="store.isError()">{{ store.error() }}</div>
    <table *ngIf="store.hasEmployees()">
      <tr *ngFor="let emp of store.employees()">
        <td>{{ emp.name }}</td>
      </tr>
    </table>
  `
})
export class EmployeesComponent implements OnInit {
  store = inject(EmployeeStore);

  ngOnInit() {
    this.store.loadEmployees();
  }
}
```

## 📖 Store API

### Read Signals
```typescript
store.employees()           // Employee[]
store.isLoading()          // boolean
store.error()              // string | null
store.selectedEmployee()   // Employee | null
```

### Actions
```typescript
store.loadEmployees()
store.addEmployee(payload)
store.updateEmployee(id, payload)
store.deleteEmployee(id)
store.selectEmployee(emp)
```

## 🔄 Development Workflow

### Common Tasks
```bash
# Start development server
ng serve --port 4201

# Build for production
ng build --configuration production

# Run tests
ng test

# Run linting
ng lint
```

## 📚 Resources

- **[Angular Documentation](https://angular.io)**
- **[Angular Signals Guide](https://angular.io/guide/signals)**
- **[Backend API Documentation](../../BE/Employee.api/backend_api_summary.md)**

## 🐛 Troubleshooting

See [QUICK_REFERENCE.md - Common Issues](./QUICK_REFERENCE.md#-common-issues)

## 📝 Phase 2 (Upcoming)

Next: Build UI Components
- EmployeeListComponent
- EmployeeDetailComponent
- EmployeeFormComponent
- DepartmentStore & Service
- DesignationStore & Service

## 📄 Further Help

To get more help on the Angular CLI, use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
