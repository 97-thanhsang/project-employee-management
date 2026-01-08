# Phase 1 - Implementation Guide

## ✅ Hoàn thành

Tất cả các task trong Phase 1 đã được hoàn thành thành công:

### 1. ✅ Setup Interceptor (Auth)
- Đã setup JWT Bearer Token interceptor
- Tự động inject token vào mọi HTTP request

### 2. ✅ Setup Base Models
Đã tạo các model/interface type-safe cho backend contract:
- `ApiResponse<T>` - Generic wrapper cho tất cả API response
- `Employee` & `CreateEmployeeRequest` & `UpdateEmployeeRequest`
- `Department` & `CreateDepartmentRequest`
- `Designation` & `CreateDesignationRequest`

**File:**
- `src/app/core/models/api-response.model.ts`
- `src/app/core/models/employee.model.ts`
- `src/app/core/models/department.model.ts`
- `src/app/core/models/designation.model.ts`
- `src/app/core/models/index.ts` (barrel export)

### 3. ✅ EmployeeService (Infrastructure Layer)
Tạo service để gọi API backend với các methods:
- `getAllEmployees()` - Lấy danh sách với filter, sort, pagination
- `getEmployeeById()` - Lấy chi tiết
- `createEmployee()` - Tạo mới
- `updateEmployee()` - Cập nhật
- `deleteEmployee()` - Xóa

**Key Points:**
- Chỉ có API calls, không xử lý state
- Trả về `Observable<ApiResponse<T>>`
- Không có side effects
- Type-safe (no `any`)

**File:** `src/app/core/services/employee.service.ts`

### 4. ✅ EmployeeStore (State Management Layer)
Tạo Store sử dụng Angular Signals để quản lý state:

#### State Structure
```typescript
interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  selectedEmployee: Employee | null;
  totalCount: number;
}
```

#### Public Signals (Read-Only)
Components sử dụng các signals này:
- `employees` - Danh sách nhân viên
- `isLoading` - Loading state
- `error` - Error message
- `selectedEmployee` - Nhân viên được chọn
- `totalCount` - Tổng số nhân viên
- `hasEmployees` - Check xem có employee không
- `isError` - Check xem có error không

#### Actions (Methods)
Store cung cấp các method để update state:
- `loadEmployees()` - Load danh sách
- `loadEmployeeById()` - Load chi tiết
- `addEmployee()` - Tạo mới
- `updateEmployee()` - Cập nhật
- `deleteEmployee()` - Xóa
- `selectEmployee()` - Select nhân viên
- `deselectEmployee()` - Deselect
- `clearError()` - Xóa error
- `resetState()` - Reset toàn bộ state

**Key Points:**
- Signal-based (WritableSignal, computed)
- Optimized reactivity - chỉ update thành phần cần thiết
- Automatic cleanup (không cần unsubscribe)
- Type-safe

**File:** `src/app/core/store/employee.store.ts`

---

## 📦 Cấu trúc Thư Mục

```
src/app/
├── core/
│   ├── models/
│   │   ├── api-response.model.ts
│   │   ├── employee.model.ts
│   │   ├── department.model.ts
│   │   ├── designation.model.ts
│   │   └── index.ts (barrel export)
│   ├── services/
│   │   └── employee.service.ts
│   └── store/
│       └── employee.store.ts
```

---

## 🎯 Cách Sử Dụng trong Components

### 1. Import Store
```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeStore } from '@core/store/employee.store';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="store.isLoading()">
      <p>Loading...</p>
    </div>

    <div *ngIf="store.isError()">
      <p class="error">{{ store.error() }}</p>
    </div>

    <table *ngIf="store.hasEmployees()">
      <tr *ngFor="let emp of store.employees()">
        <td>{{ emp.name }}</td>
        <td>{{ emp.email }}</td>
      </tr>
    </table>
  `
})
export class EmployeeListComponent implements OnInit {
  store = inject(EmployeeStore);

  ngOnInit() {
    // Load danh sách nhân viên
    this.store.loadEmployees();
  }
}
```

### 2. Gọi Actions từ Component
```typescript
// Load danh sách
this.store.loadEmployees(
  'John',        // filter
  'name',        // sortBy
  'asc',         // sortOrder
  1,             // pageNumber
  10             // pageSize
);

// Tạo mới
this.store.addEmployee({
  name: 'John Doe',
  email: 'john@example.com',
  contactNo: '1234567890',
  city: 'Ha Noi',
  state: 'HN',
  pincode: '100000',
  address: '123 Street',
  designationId: 1,
  password: 'SecurePassword123'
});

// Cập nhật
this.store.updateEmployee(1, {
  employeeId: 1,
  name: 'Jane Doe',
  email: 'jane@example.com',
  contactNo: '1234567890',
  city: 'Ho Chi Minh',
  state: 'HCM',
  pincode: '700000',
  address: '456 Street',
  designationId: 2
});

// Xóa
this.store.deleteEmployee(1);

// Select nhân viên
this.store.selectEmployee(employee);
```

### 3. Read Signals (Reactive Updates)
```typescript
// Signals tự động track dependencies
// Khi data thay đổi, component tự động re-render (với OnPush CD)

// Read danh sách
const employees = this.store.employees(); // Employee[]

// Read loading state
if (this.store.isLoading()) {
  // Render loading spinner
}

// Read error
if (this.store.error()) {
  // Render error message
}

// Read selected
const selected = this.store.selectedEmployee(); // Employee | null
```

---

## ⚙️ Configuration

### API Base URL
Hiện tại `API_BASE_URL` được set trong `employee.service.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

**TODO:** Di chuyển sang environment file:
```typescript
// environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:5000/api'
};
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      Angular Component                        │
│  (EmployeeListComponent, EmployeeFormComponent, etc.)        │
│                                                               │
│  Signals:                    Actions:                        │
│  - store.employees()         - store.loadEmployees()         │
│  - store.isLoading()         - store.addEmployee()           │
│  - store.error()             - store.updateEmployee()        │
│  - store.selectedEmployee()  - store.deleteEmployee()        │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    │ (Inject EmployeeStore)
                    ▼
┌──────────────────────────────────────────────────────────────┐
│                    EmployeeStore                              │
│                  (State Management)                           │
│                                                               │
│  Internal Signals:                                           │
│  - employeesSignal: WritableSignal<Employee[]>              │
│  - loadingSignal: WritableSignal<boolean>                   │
│  - errorSignal: WritableSignal<string | null>               │
│  - selectedEmployeeSignal: WritableSignal<Employee | null>  │
│  - totalCountSignal: WritableSignal<number>                 │
│                                                               │
│  Computed Signals:                                           │
│  - employees = computed(() => this.employeesSignal())       │
│  - isLoading = computed(() => this.loadingSignal())         │
│  - error = computed(() => this.errorSignal())               │
│  - etc...                                                     │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    │ (Inject EmployeeService)
                    ▼
┌──────────────────────────────────────────────────────────────┐
│                   EmployeeService                             │
│                 (Infrastructure Layer)                        │
│                                                               │
│  API Calls:                                                  │
│  - getAllEmployees(): Observable<ApiResponse<Employee[]>>   │
│  - getEmployeeById(): Observable<ApiResponse<Employee>>     │
│  - createEmployee(): Observable<ApiResponse<Employee>>      │
│  - updateEmployee(): Observable<ApiResponse<Employee>>      │
│  - deleteEmployee(): Observable<ApiResponse<null>>          │
└───────────────────┬──────────────────────────────────────────┘
                    │
                    │ (HttpClient)
                    ▼
┌──────────────────────────────────────────────────────────────┐
│                    Backend API                                │
│            (ASP.NET Core 8 - .NET)                           │
│                                                               │
│  Endpoints:                                                  │
│  - POST   /api/Auth/login                                   │
│  - GET    /api/EmployeeMaster                               │
│  - GET    /api/EmployeeMaster/{id}                          │
│  - POST   /api/EmployeeMaster                               │
│  - PUT    /api/EmployeeMaster/{id}                          │
│  - DELETE /api/EmployeeMaster/{id}                          │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Best Practices Được Áp Dụng

### 1. **Strict Typing**
- ✅ No `any` type
- ✅ All interfaces defined explicitly
- ✅ Generic types used properly

### 2. **Layered Architecture**
- ✅ Infrastructure Layer (EmployeeService) - API calls
- ✅ State Layer (EmployeeStore) - State management
- ✅ UI Layer (Components) - Presentation logic

### 3. **Reactive Programming**
- ✅ Angular Signals for state (WritableSignal, computed)
- ✅ No RxJS BehaviorSubject for state
- ✅ Fine-grained reactivity

### 4. **Performance**
- ✅ OnPush change detection strategy recommended
- ✅ Signals reduce unnecessary re-renders
- ✅ Automatic dependency tracking

### 5. **Error Handling**
- ✅ Error state in store
- ✅ Error message display in UI
- ✅ Clear error method for cleanup

### 6. **DI & Dependency Injection**
- ✅ @Injectable providedIn: 'root'
- ✅ Type-safe dependency injection
- ✅ Angular's built-in DI system

---

## 📝 Next Steps (Phase 2)

1. **Build UI Components**
   - EmployeeListComponent
   - EmployeeDetailComponent
   - EmployeeFormComponent (Create/Update)

2. **Add More Features**
   - DepartmentStore & DepartmentService
   - DesignationStore & DesignationService
   - AuthStore & AuthService

3. **Implement Advanced Features**
   - Route Guards (with auth)
   - Pagination in UI
   - Search/Filter UI
   - Form validation

4. **Improve Configuration**
   - Move API_BASE_URL to environment
   - Add interceptor for JWT
   - Add HTTP error handling

---

## 📚 References

- [Angular Signals Documentation](https://angular.io/guide/signals)
- [Angular Dependency Injection](https://angular.io/guide/dependency-injection)
- [Angular HttpClient](https://angular.io/guide/http)
- [Backend API Documentation](../../BE/Employee.api/backend_api_summary.md)
