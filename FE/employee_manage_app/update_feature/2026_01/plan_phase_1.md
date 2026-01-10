# Phase 1: Department Management

**Status:** 🟢 Completed
**Goal:** Implement full CRUD for Departments with standard architecture.

## Actions

### 1. State Management (Store)
- [x] Create `DepartmentStore` in `features/employee-manage/store/department.store.ts`.
- [x] Implement State Interface (`DepartmentState`).
- [x] Implement Signals: `departments`, `loading`, `error`, `isCreating`, `isUpdating`, `isDeleting`.
- [x] Implement Actions: `loadDepartments`, `addDepartment`, `updateDepartment`, `deleteDepartment`.
- [x] Use `mapToAppError` for error handling.

### 2. UI Components
- [x] **Department List**:
    - [x] Create `features/department/department-list/department-list.component.ts|html`.
    - [x] Display table with `nz-table`.
    - [x] Implement Delete with strict loading state.
    - [x] Add "Add New" button navigating to form.
- [x] **Department Form**:
    - [x] Create `ui/department/department-form/department-form.component.ts|html`.
    - [x] Implement Reactive Form (`name`, `isActive`).
    - [x] Handle `isCreating`/`isUpdating` states for Submit button.
    - [x] Integrate `DepartmentStore` for actions.

### 3. Routing
- [x] Add routes to `employee-manage.routes.ts`:
    - `departments`: List
    - `departments/add`: Create
    - `departments/:id/edit`: Update

## Progress Log
- **[Date]**: Phase initialized.
- **2026-01-11**: Implement Department Management (Store, List, Form) successfully. Verified build.
