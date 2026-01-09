Phase 2: The UI Skeleton (Tuần này)
[x] Layout chính (Sidebar, Header, Content Area).

[ ] Xử lý Logout & Hiển thị thông tin User trên Header.

Act as the Senior Angular Architect. We are continuing to **Phase 2: UI Implementation**.

**Current Context:**
We have successfully implemented:
1.  `EmployeeService` (Pure API calls).
2.  `EmployeeStore` (Signal-based State Management).
3.  Models (`Employee`, `ApiResponse`).

**COMPLETED TASKS (PHASE 2):**

**✅ Task 1: Environment Configuration (Refactor)**
* ✅ Created file: `src/environments/environment.ts`
* ✅ Created file: `src/environments/environment.prod.ts`
* ✅ Refactored `EmployeeService` to use `environment.apiUrl`
* ✅ Added paths to `tsconfig.json` and `tsconfig.app.json`

**✅ Task 2: Create EmployeeListComponent (Smart Component)**
* ✅ Created `src/app/features/employee/employee-list/employee-list.component.ts`
* ✅ Created `src/app/features/employee/employee-list/employee-list.component.html`
* ✅ Created `src/app/features/employee/employee-list/employee-list.component.scss`
* ✅ Full UI with Bootstrap 5 styling
* ✅ Loading state, Error state, Empty state, Data table
* ✅ Using @if and @for control flow syntax
* ✅ OnPush change detection strategy

**✅ Task 3: Update Routing**
* ✅ Updated `app.routes.ts` with employees route
* ✅ Added default redirect to /employees

**TASK STATUS: ALL COMPLETE ✅**

**Task 2: Create `EmployeeListComponent` (Smart Component)**
* File: `src/app/features/employee/employee-list/employee-list.component.ts` (and `.html`).
* **Logic:**
    * Inject `EmployeeStore`.
    * Call `store.loadEmployees()` in `ngOnInit`.
    * Use `store.employees()`, `store.isLoading()`, `store.error()` signals.
* **UI (Bootstrap 5):**
    * Header: Title "Employees" + Button "Add New" (RouterLink to `/employee/add`).
    * Loading State: Show a Spinner when `isLoading()` is true.
    * Error State: Show an Alert when `error()` is present.
    * Data Table: Display columns (Name, Email, Phone, Designation, Actions).
    * Actions Column: Buttons for "Edit" and "Delete".
* **Performance:** Use `@if` and `@for` (Control Flow syntax) instead of `*ngIf`/`*ngFor`.

**Task 3: Update Routing**
* Update `app.routes.ts` to include the route: `{ path: 'employees', component: EmployeeListComponent }`.

Please generate clean, strictly typed code.
