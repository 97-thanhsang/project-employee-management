# Project Architecture & Guidelines

This document defines the architectural standards for the `employee-manage-app`.

## 1. High-Level Structure

*   **`core/`**: Singletons, global services, interceptors, and guards. Loaded once.
*   **`shared/`**: Reusable components (Dumb), pipes, and directives. Can be imported by Features.
*   **`features/`**: Business logic and pages (Smart Components).

## 2. Dependency Rules

To prevent coupling and circular dependencies, strictly follow these import rules:

| Layer | Can Import From | CANNOT Import From |
| :--- | :--- | :--- |
| **`libs/ui` (Shared UI)** | `core/models`, `Angular` | `features`, `data-access`, `store` |
| **`data-access` (Services/Stores)** | `core`, `shared/utils` | `ui` (Components), `features` |
| **`features`** | `core`, `shared`, `data-access` | Other Sibling Features (usually) |

## 3. Component Types

### 🧠 Smart Components (Containers)
*   **Role**: Orchestrate data and logic.
*   **Location**: `features/<feature>/ui/` (Top level pages).
*   **Capabilities**:
    *   Inject Facades or Stores.
    *   Inject Services.
    *   Pass data to Dumb Components via `[input]`.
    *   Handle events from Dumb Components via `(output)`.

### 🎨 Dumb Components (Presentational)
*   **Role**: Display UI and capture user interaction.
*   **Location**: `shared/ui/` or `features/<feature>/ui/components/`.
*   **Capabilities**:
    *   **NO** Service/Store injections.
    *   Receive data strictly via `@Input()`.
    *   Emit events strictly via `@Output()`.
    *   Focus on HTML/CSS and basic interaction logic.

## 4. State Management (Facade Pattern)
*   Components should NOT access Stores (Signals/NgRx) directly.
*   Components MUST inject a specific **Facade** (e.g., `EmployeeFacade`).
*   Facades expose:
    *   `readonly viewModel`: Signal containing UI state.
    *   Methods: `load()`, `create()`, etc.
