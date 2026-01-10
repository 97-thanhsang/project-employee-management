# Phase 2: Designation Management

**Status:** 🔴 Not Started
**Goal:** Implement full CRUD for Designations with Department relationship.

## Actions

### 1. State Management (Store)
- [ ] Create `DesignationStore` in `features/employee-manage/store/designation.store.ts`.
- [ ] Implement State Interface (`DesignationState`).
- [ ] Implement Signals: `designations`, `loading`, `error`, `isCreating`, `isUpdating`, `isDeleting`.
- [ ] Implement Actions: `loadDesignations`, `addDesignation`, `updateDesignation`, `deleteDesignation`.
- [ ] Use `mapToAppError`.

### 2. UI Components
- [ ] **Designation List**:
    - [ ] Create `features/designation/designation-list`.
    - [ ] Display table (show Department Name using pipe/store).
    - [ ] Implement Delete action.
- [ ] **Designation Form**:
    - [ ] Create `ui/designation/designation-form`.
    - [ ] Implement Reactive Form (`name`, `departmentId`).
    - [ ] Dropdown for Department (load optional Master Data from `DepartmentStore` or `EmployeeStore` if reused).

### 3. Routing
- [ ] Add routes to `employee-manage.routes.ts`:
    - `designations`: List
    - `designations/add`: Create
    - `designations/:id/edit`: Update

## Progress Log
- **[Date]**: Phase initialized.
