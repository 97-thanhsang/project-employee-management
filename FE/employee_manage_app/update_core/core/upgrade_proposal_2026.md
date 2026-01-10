# 🛡️ Enterprise Angular Upgrade Proposal (2026)

**Mentor Assessment**:
Based on **MentorAngular.md** principles, I have analyzed the current `employee-manage-app` (Angular v21).
While the project has successfully adopted **Signal Stores**, **Strict Typing**, and **Feature Architecture**, there are key distinct areas to elevate it to a true "**Enterprise Grade**" system.

## 📊 Current State Assessment
| Criteria | Status | Notes |
| :--- | :--- | :--- |
| **Architecture** | 🟡 Good | Structure is clean (`core`, `features`, `ui/store` separation). `employee-manage` is slightly large but acceptable for now. |
| **State Management** | 🟢 Excellent | **Signal Store** prevents zoning issues and ensures granularity (`isCreating`...). |
| **Error Handling** | 🟡 Manual | `mapToAppError` is good but repetitive. Lacks **Global Interceptor** for 401/500. |
| **UX/UI** | 🟢 Good | Ant Design + Bootstrap hybrid works well. Toastr integration is solid. |
| **Security** | 🟡 Basic | JWT Store handling exists. Missing **Auto-Refresh Token** strategy & **RBAC** fine-tuning. |
| **Quality Ops** | 🔴 Missing | No **Husky** (Git hooks), **Lint-staged**, or **CI Actions** visible. No active **Unit Tests**. |

---

## 🚀 Proposed Upgrade Roadmap

### Phase 1: Architecture Hardening (The "Invisible" Backbone)
**Goal:** Reduce code repetition and increase system resilience.
1.  **Global HttpInterceptor**:
    -   Auto-attach Bearer Token (don't repeat in Services).
    -   Global Error Catching: Automatically toast "Session Expired" (401) or "Server Error" (500) without modifying every Store.
    -   Global Loading Bar (`ng-zorro-antd/message` or top-bar loader) for all API requests.
2.  **Route Transition UX**:
    -   Implement **Route Resolvers** or Skeleton Loaders so users don't see empty tables while fetching.
    -   Add **Breadcrumbs** dynamically based on Route data.

### Phase 2: Enterprise Standards (The "Project" Layer)
**Goal:** Enforce quality and standardize team workflow.
1.  **Husky & Lint-staged**:
    -   Prevent `git commit` if `eslint` or `prettier` fails.
    -   Standardize Commit Messages (Conventional Commits).
2.  **Environment Configuration**:
    -   Strict separation of `environment.prod.ts` vs `dev`.
    -   Feature Flag support (basic implementation).

### Phase 3: Testing & Optimization (The "Confidence" Layer)
**Goal:** Ensure stability when scaling.
1.  **Unit Testing (Vitest)**:
    -   Write critical tests for `EmployeeStore` (State logic is complex).
    -   Test `DepartmentNamePipe` (Pure logic).
2.  **Performance Audit**:
    -   Verify Bundle Budget.
    -   Audit `defer` block usage (Angular 17+ feature) for Heavy Components.

### Phase 4: Advanced Features (The "Wow" Factor)
1.  **Internationalization (i18n)**:
    -   Setup `ngx-translate` or Angular Native i18n (locales: VI/EN).
2.  **Dark Mode Toggle**:
    -   System-wide Theme Switching (Ant Design + Tailwind/Bootstrap variables).

---

## 💡 Recommendation: Immediate Next Step
I recommend starting with **Phase 1 (Interceptors)** immediately. It cleans up the code significantly.

**Do you agree with this roadmap? Which Phase should we prioritize?**
