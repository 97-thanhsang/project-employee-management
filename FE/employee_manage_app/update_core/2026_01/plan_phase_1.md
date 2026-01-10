# Phase 1: Foundation & Hygiene

**Status:** 🔴 Not Started
**Goal:** Clean up codebase structure and enforce strict typing.

## Actions

### 1. Refactor Imports
- [ ] Scan project for relative imports deeper than 2 levels (`../../`).
- [ ] Replace with Alias Paths:
    - [ ] `@core/*`
    - [ ] `@features/*`
    - [ ] `@shared/*`
- [ ] Verify application builds without errors.

### 2. Strict Typing
- [ ] Verify `strict: true` in `tsconfig.json`.
- [ ] Run `ng build` to catch any strict type errors.
- [ ] Fix identified type errors (no implicit any, strict null checks).

## Progress Log
- **[Date]**: Phase initialized.
