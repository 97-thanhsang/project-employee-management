Phase 1: The Core (Hôm nay & Ngày mai)
[x] Setup Interceptor (Auth).

[x] Setup Base Models.

[x] Action: Xây dựng EmployeeService (Data Layer).

[x] Action: Xây dựng EmployeeStore (State Layer dùng Signals).


Act as a Senior Angular Architect and Tech Lead. We are building an Enterprise "Employee Management System" using **Angular 17+ (Standalone Components)**.

**Architecture Requirements:**
1.  **Strict Mode:** No `any`. All types must be defined explicitly.
2.  **Architecture:** Layered Architecture (Infrastructure -> State/Facade -> UI).
3.  **State Management:** Use **Angular Signals** (WritableSignal, computed, effect) exclusively. Do NOT use RxJS `BehaviorSubject` for state. Do NOT use NgRx (too complex for now).
4.  **Performance:** Use `OnPush` change detection strategy everywhere.
5.  **Backend Integration:** The backend uses a generic wrapper `ApiResponse<T>`.

**Context - Backend Contract:**

// 1. Base API Response Wrapper
export interface ApiResponse<T> {
  statusCode: number;
  errorCode?: number;
  message?: string;
  data: T;
}

// 2. Employee Model (Matches Backend DTO)
export interface Employee {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  role?: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  altContactNo?: string;
  designationId: number;
  createDate: string; 
  modifiedDate: string; 
}

// 3. API Endpoints
export const API_ENDPOINT = {
  EMPLOYEE: 'http://localhost:5000/api/EmployeeMaster', // Example URL
};

---

**YOUR TASK:**

**Task 1: Create `EmployeeService` (Infrastructure Layer)**
* File: `src/app/core/services/employee.service.ts`
* Use `HttpClient` to perform CRUD operations (Get All, Create, Update, Delete).
* All methods must return `Observable<ApiResponse<T>>`.
* Do not handle state here, just pure API calls.

**Task 2: Create `EmployeeStore` (State Layer)**
* File: `src/app/core/store/employee.store.ts` (Use an `@Injectable` service pattern with Signals).
* **State Interface:**
    ```typescript
    interface EmployeeState {
      employees: Employee[];
      loading: boolean;
      error: string | null;
    }
    ```
* **Requirements:**
    * Expose Read-only Signals for components to use (e.g., `employees()`, `isLoading()`).
    * Implement methods to call `EmployeeService` and update the Signals (e.g., `loadEmployees()`, `addEmployee(data)`).
    * Handle side effects (success/error) properly.

Please provide clean, production-ready code with comments explaining "Why" for complex logic.
