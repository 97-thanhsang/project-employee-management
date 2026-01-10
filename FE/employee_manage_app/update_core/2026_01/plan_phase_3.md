# Phase 3: State Refinement

**Status:** 🟢 Completed
**Goal:** Enhance data integrity and responsiveness.

## Actions

### 1. Granular Loading State
- [x] Add `isCreating`, `isUpdating`, `isDeleting` signals to `EmployeeStore`.
- [x] Update UI to use specific loading states (e.g., loading spinner on "Save" button only, not blocking whole form).

### 2. Data Integrity Strategy
- [x] Review `addEmployee` and `updateEmployee` in Store.
- [x] Decision: Keep optimistic/local update OR switch to "Invalidate & Refetch" pattern. (Chosen: Local Update with Immutable Spread)
- [x] Implement chosen strategy.

## Progress Log
- **[Date]**: Phase initialized.
- **2026-01-11**: Implemented granular loading states (`isCreating`, `isUpdating`, `isDeleting`) and updated UI to use them. Phase completed.
