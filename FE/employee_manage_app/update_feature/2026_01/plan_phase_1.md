# Phase 1: Department Management

**Status:** 🔴 Not Started
**Goal:** Implement full CRUD for Departments with standard architecture.

## Actions

### 1. State Management (Store)
- [ ] Create `DepartmentStore` in `features/employee-manage/store/department.store.ts`.
- [ ] Implement State Interface (`DepartmentState`).
- [ ] Implement Signals: `departments`, `loading`, `error`, `isCreating`, `isUpdating`, `isDeleting`.
- [ ] Implement Actions: `loadDepartments`, `addDepartment`, `updateDepartment`, `deleteDepartment`.
- [ ] Use `mapToAppError` for error handling.

### 2. UI Components
- [ ] **Department List**:
    - [ ] Create `features/department/department-list/department-list.component.ts|html`.
    - [ ] Display table with `nz-table`.
    - [ ] Implement Delete with strict loading state.
    - [ ] Add "Add New" button navigating to form.
- [ ] **Department Form**:
    - [ ] Create `ui/department/department-form/department-form.component.ts|html`.
    - [ ] Implement Reactive Form (`name`, `isActive`).
    - [ ] Handle `isCreating`/`isUpdating` states for Submit button.
    - [ ] Integrate `DepartmentStore` for actions.

### 3. Routing
- [ ] Add routes to `employee-manage.routes.ts`:
    - `departments`: List
    - `departments/add`: Create
    - `departments/:id/edit`: Update

## Progress Log
- **[Date]**: Phase initialized.
