Phase 4: Refactor & Optimize (Giai đoạn Tech Lead)
[ ] Audit Bundle Size.

[ ] Viết Unit Test cho Service.

[ ] Review lại Architecture xem có "Code Smell" không.

Act as a Senior Angular Architect. We are moving to **Phase 4: Optimization, Security & UX**.

**Current Context:**
* We have a working Employee Management System (CRUD completed).
* Architecture: Signals Store, Standalone Components, Clean Architecture.
* Issues: No delete confirmation, no user feedback (toasts), no permission checks.

**YOUR TASKS (PHASE 4):**

**Task 1: Global Error & Success Handling (Toastr)**
* Install `ngx-toastr` setup (assume `npm install` is done).
* Update `app.config.ts` to include `provideToastr()`.
* **Refactor `EmployeeStore`:**
    * Inject `ToastrService`.
    * Show "Success" toast on `addEmployee`, `updateEmployee`, `deleteEmployee` success.
    * Show "Error" toast on API failures.

**Task 2: Safety Delete (SweetAlert2)**
* Refactor `onDelete` in `EmployeeListComponent`.
* Use `SweetAlert2` (assume installed) or a simple `confirm('Are you sure?')` check before calling `store.deleteEmployee(id)`.
    * *Preference:* Use `Swal.fire({...})` for a professional look.

**Task 3: Authorization (Structural Directive)**
* Create a directive: `src/app/shared/directives/has-role.directive.ts`.
* Logic:
    * Input: `appHasRole: string[]` (e.g., `['Admin']`).
    * Logic: Get `user` from `AuthService` (or decode token). If user.role matches input, verify permissions.
    * Uses `TemplateRef` and `ViewContainerRef` to show/hide the element.
* Apply this directive in `EmployeeListComponent`:
    * Only show "Edit" and "Delete" buttons if the user has `'Admin'` role.

**Task 4: Optimization (Pure Pipe)**
* Create `DesignationNamePipe` (`src/app/shared/pipes/designation-name.pipe.ts`).
* Logic: Input `id`, takes `designations` array as argument, returns name.
* Use this pipe in `employee-list.component.html` instead of function calls.

Please provide clean, strictly typed code.
