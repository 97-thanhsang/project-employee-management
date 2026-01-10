# Phase 3: Abstraction Layer (Facade Pattern)

**Goal:** Hide state management implementation details (Signals/NgRx) from the Feature Layer.

## Checklist
- [ ] **Create EmployeeFacade**
    - [ ] Path: `features/employee-manage/facades/employee.facade.ts`.
    - [ ] Expose `viewModel$` (combining Employees, Loading, Errors).
    - [ ] Expose methods: `load()`, `create()`, `update()`, `delete()`.
- [ ] **Refactor Feature Containers**
    - [ ] `EmployeeListContainer`: Inject `EmployeeFacade` instead of `EmployeeStore`.
    - [ ] `EmployeeFormContainer`: Inject `EmployeeFacade`.
- [ ] **Repeat for Designation**
    - [ ] Create `DesignationFacade`.

---

# 🇻🇳 Phase 3: Lớp Trừu Tượng (Facade Pattern) (Tiếng Việt)

**Mục tiêu:** Ẩn chi tiết triển khai quản lý trạng thái (Signals/NgRx) khỏi Lớp Tính Năng (Feature Layer).

## Danh sách kiểm tra (Checklist)
- [ ] **Tạo EmployeeFacade**
    - [ ] Đường dẫn: `features/employee-manage/facades/employee.facade.ts`.
    - [ ] Public `viewModel$` (kết hợp Employees, Loading, Errors).
    - [ ] Public các methods: `load()`, `create()`, `update()`, `delete()`.
- [ ] **Refactor Feature Containers**
    - [ ] `EmployeeListContainer`: Inject `EmployeeFacade` thay vì `EmployeeStore`.
    - [ ] `EmployeeFormContainer`: Inject `EmployeeFacade`.
- [ ] **Lặp lại cho Designation**
    - [ ] Tạo `DesignationFacade`.
