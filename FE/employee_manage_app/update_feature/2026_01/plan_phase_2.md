# Phase 2: Designation Management

**Status:** � In Progress
**Goal:** Implement full CRUD for Designations with Department relationship.

## Actions

### 1. State Management (Store)
- [x] Create `DesignationStore` in `features/employee-manage/store/designation.store.ts`.
- [x] Implement State Interface (`DesignationState`).
- [x] Implement Signals: `designations`, `loading`, `error`, `isCreating`, `isUpdating`, `isDeleting`.
- [x] Implement Actions: `loadDesignations`, `addDesignation`, `updateDesignation`, `deleteDesignation`.
- [x] Use `mapToAppError`.

### 2. UI Components
- [x] **Designation List**:
    - [x] Create `features/designation/designation-list`.
    - [x] Display table (show Department Name using pipe/store).
    - [x] Implement Delete action.
- [x] **Designation Form**:
    - [x] Create `ui/designation/designation-form`.
    - [x] Implement Reactive Form (`name`, `departmentId`).
    - [x] Dropdown for Department (load optional Master Data from `DepartmentStore` or `EmployeeStore` if reused).

### 3. Routing
- [x] Add routes to `employee-manage.routes.ts`:
    - `designations`: List
    - `designations/add`: Create
    - `designations/:id/edit`: Update

## Progress Log
- **[Date]**: Phase initialized.
- **2026-01-11**: Implemented Designation Store, List, Form with Department integration. Verified build.
