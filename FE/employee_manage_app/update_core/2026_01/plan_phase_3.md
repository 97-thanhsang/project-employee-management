# Phase 3: State Refinement

**Status:** 🟢 Completed
**Goal:** Enhance data integrity and responsiveness.

## Actions

### 1. Granular Loading State
- [ ] Add `isCreating`, `isUpdating`, `isDeleting` signals to `EmployeeStore`.
- [ ] Update UI to use specific loading states (e.g., loading spinner on "Save" button only, not blocking whole form).

### 2. Data Integrity Strategy
- [ ] Review `addEmployee` and `updateEmployee` in Store.
- [ ] Decision: Keep optimistic/local update OR switch to "Invalidate & Refetch" pattern.
- [ ] Implement chosen strategy.

## Progress Log
- **[Date]**: Phase initialized.
- **2026-01-11**: Implemented granular loading states (`isCreating`, `isUpdating`, `isDeleting`) and updated UI to use them. Phase completed.
