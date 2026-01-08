# Phase 1 - Quick Reference Guide

## 🚀 Quick Start

### 1. Import Models
```typescript
import { Employee, ApiResponse, CreateEmployeeRequest } from '@core/models';
```

### 2. Inject Store
```typescript
import { EmployeeStore } from '@core/store/employee.store';

export class MyComponent {
  store = inject(EmployeeStore);
}
```

### 3. Load Data
```typescript
ngOnInit() {
  this.store.loadEmployees();
}
```

### 4. Use in Template
```html
<div *ngIf="store.isLoading()">Loading...</div>
<div *ngIf="store.error()">{{ store.error() }}</div>
<table>
  <tr *ngFor="let emp of store.employees()">
    <td>{{ emp.name }}</td>
  </tr>
</table>
```

---

## 📖 Store API

### Read Signals
```typescript
store.employees()           // Employee[]
store.isLoading()          // boolean
store.error()              // string | null
store.selectedEmployee()   // Employee | null
store.totalCount()         // number
store.hasEmployees()       // boolean (computed)
store.isError()            // boolean (computed)
```

### Actions
```typescript
// Load
store.loadEmployees(filter?, sortBy?, sortOrder?, pageNum?, pageSize?)
store.loadEmployeeById(id)

// CRUD
store.addEmployee(payload)           // CreateEmployeeRequest
store.updateEmployee(id, payload)    // UpdateEmployeeRequest
store.deleteEmployee(id)

// Selection
store.selectEmployee(employee)
store.deselectEmployee()

// Cleanup
store.clearError()
store.resetState()
```

---

## 🏗️ Architecture Quick View

```
Component Layer (UI)
    ↓ injects
Store Layer (State Management)
    ├─ Signals: employees, isLoading, error...
    ├─ Methods: loadEmployees, addEmployee...
    ↓ calls
Service Layer (API Calls)
    ├─ getAllEmployees()
    ├─ createEmployee()
    ├─ updateEmployee()
    ├─ deleteEmployee()
    ↓ HTTP
Backend API
    /api/EmployeeMaster
```

---

## 🎯 Common Patterns

### Pattern 1: Load & Display List
```typescript
@Component({
  selector: 'app-list',
  template: `
    <div *ngIf="store.isLoading()">...</div>
    <div *ngIf="store.isError()">{{ store.error() }}</div>
    <table>
      <tr *ngFor="let item of store.employees()">
        <td>{{ item.name }}</td>
      </tr>
    </table>
  `
})
export class ListComponent implements OnInit {
  store = inject(EmployeeStore);
  
  ngOnInit() {
    this.store.loadEmployees();
  }
}
```

### Pattern 2: Create Form
```typescript
onSubmit(form: any) {
  this.store.addEmployee({
    name: form.name,
    email: form.email,
    // ... other fields
    password: form.password,
    designationId: form.designationId
  });
}
```

### Pattern 3: Update Form
```typescript
onSubmit(form: any) {
  this.store.updateEmployee(this.employeeId, {
    employeeId: this.employeeId,
    name: form.name,
    email: form.email,
    // ... other fields (password is optional)
    designationId: form.designationId
  });
}
```

### Pattern 4: Delete with Confirmation
```typescript
onDelete(id: number) {
  if (confirm('Delete this employee?')) {
    this.store.deleteEmployee(id);
  }
}
```

### Pattern 5: Show Selected Details
```typescript
onSelectEmployee(emp: Employee) {
  this.store.selectEmployee(emp);
  // Component template shows store.selectedEmployee()
}
```

---

## ⚡ Performance Tips

### ✅ DO
```typescript
// Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// Access signals directly in template
{{ store.employees() }}

// Let zone handle reactivity
store.loadEmployees();
```

### ❌ DON'T
```typescript
// Don't subscribe to signals
store.employees$.subscribe(...)  // ✗ signals are not observables

// Don't call action methods multiple times
ngOnInit() {
  this.store.loadEmployees();
  this.store.loadEmployees();  // ✗ redundant
  this.store.loadEmployees();
}

// Don't manually unsubscribe
// (signals auto cleanup)
```

---

## 🐛 Debugging

### In Console
```javascript
// Inject store in console
store = ng.probe(document.querySelector('app-root')).injector.get(EmployeeStore)

// Read signals
store.employees()
store.isLoading()
store.error()

// Trigger actions
store.loadEmployees()
store.resetState()
```

### In Component
```typescript
ngOnInit() {
  console.log('Loading employees...');
  this.store.loadEmployees();
  
  setTimeout(() => {
    console.log('Employees:', this.store.employees());
    console.log('Loading:', this.store.isLoading());
    console.log('Error:', this.store.error());
  }, 2000);
}
```

---

## 🔧 Common Issues

### Issue 1: "Cannot find module '@core/models'"
**Solution:** Make sure file path alias is configured or use relative path:
```typescript
// Configure in tsconfig.json
"paths": {
  "@core/*": ["src/app/core/*"]
}
```

### Issue 2: "store.employees is not a function"
**Solution:** Call signal as function:
```typescript
// ✓ Correct
this.store.employees()

// ✗ Wrong
this.store.employees
```

### Issue 3: Component not updating when store changes
**Solution:** Make sure using OnPush change detection:
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### Issue 4: API 404 errors
**Solution:** Check backend API is running:
```bash
# Backend should be running at http://localhost:5000
# Check API_BASE_URL in employee.service.ts
```

### Issue 5: CORS errors
**Solution:** Backend has CORS configured for localhost:4200
- If error persists, check backend CORS policy
- Make sure using correct origin URL

---

## 📝 Code Templates

### New Component Using Store
```typescript
import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeStore } from '@core/store/employee.store';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class FeatureComponent implements OnInit {
  store = inject(EmployeeStore);

  ngOnInit() {
    this.store.loadEmployees();
  }
}
```

### New Service Using EmployeeService
```typescript
import { Injectable, inject } from '@angular/core';
import { EmployeeService } from '@core/services/employee.service';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  private employeeService = inject(EmployeeService);

  getEmployees() {
    return this.employeeService.getAllEmployees();
  }
}
```

---

## 📚 File Locations

| Purpose | Path |
|---------|------|
| Models | `src/app/core/models/` |
| Services | `src/app/core/services/` |
| Store | `src/app/core/store/` |
| Components | `src/app/features/` or `src/app/pages/` |
| Shared | `src/app/shared/` |

---

## 🎓 Learning Resources

1. **Signals Documentation**
   - Angular official: https://angular.io/guide/signals

2. **Dependency Injection**
   - DI Guide: https://angular.io/guide/dependency-injection

3. **HttpClient**
   - HTTP Guide: https://angular.io/guide/http

4. **Backend API**
   - API Docs: `BE/Employee.api/backend_api_summary.md`

---

## ✅ Checklist Before Going to Phase 2

- [ ] Understand Signal-based state management
- [ ] Understand Layered Architecture
- [ ] Can read and modify EmployeeStore
- [ ] Can create new component using Store
- [ ] Backend API running and accessible
- [ ] No compilation errors in app

---

**Ready to build UI Components in Phase 2!** 🚀
