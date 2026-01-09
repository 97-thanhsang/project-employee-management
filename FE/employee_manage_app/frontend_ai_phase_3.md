Phase 3: The Feature Implementation (Tuần sau)
[ ] Implement màn hình "Danh sách nhân viên" (List View).

[ ] Áp dụng Smart/Dumb Component.

[ ] Implement chức năng "Thêm mới/Sửa" (Form View).

Act as a Senior Angular Architect. We are moving to **Phase 3: Master Data & CRUD Forms**.

**Current Context:**
* We have `EmployeeListComponent` showing a list of employees.
* **Problem:** The list shows `designationId` (number) instead of the name.
* We need to build the "Add/Edit Employee" feature.

**YOUR TASKS (PHASE 3):**

**Task 1: Master Data Services**
* Create `DepartmentService` and `DesignationService` in `src/app/core/services/`.
* Endpoints:
    * GET `${environment.apiUrl}/DepartmentMaster`
    * GET `${environment.apiUrl}/DesignationMaster`
* Return type: `Observable<ApiResponse<Department[]>>` / `Observable<ApiResponse<Designation[]>>`.

**Task 2: Upgrade `EmployeeStore` for Master Data**
* Update `src/app/core/store/employee.store.ts`:
    * Add state for `departments: Department[]` and `designations: Designation[]`.
    * Add method `loadMasterData()` to fetch both lists (use `forkJoin` to load in parallel).
    * Add computed signals: `departmentOptions`, `designationOptions`.

**Task 3: Create `EmployeeFormComponent` (Smart Component)**
* File: `src/app/features/employee/employee-form/employee-form.component.ts`.
* **Route:** `/employee/add` (Create) and `/employee/edit/:id` (Edit).
* **Logic:**
    * Use **Reactive Forms** with strict validation (required, email, minLength).
    * Inject `EmployeeStore`. Call `store.loadMasterData()` on init to populate dropdowns.
    * **Mode Check:** Check `ActivatedRoute`. If `id` exists -> Edit Mode (Load data -> Patch Value). If not -> Create Mode.
    * **Submit:** Call `store.addEmployee(form.value)` or `store.updateEmployee(id, form.value)`.
* **UI (Bootstrap 5):**
    * Card layout.
    * Inputs: Name, Email, Phone, Address, City, State, Pincode.
    * Dropdowns: Department (select), Designation (select).
    * Submit Button: "Save" (Disable if invalid or submitting).
    * Back Button: Return to list.

**Task 4: Update `EmployeeListComponent`**
* Update the HTML to display **Designation Name** instead of ID.
    * *Hint:* Create a Helper Pipe or a simple method in Component to find the name from the Store's `designations` signal based on ID.

Please provide clean, strictly typed code following the existing architecture.
