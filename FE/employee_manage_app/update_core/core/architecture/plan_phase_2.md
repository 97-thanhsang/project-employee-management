# Phase 2: Component Decoupling (Smart/Dumb)

**Goal:** Achieve separation of concerns by removing State Logic from UI Components.

## Checklist
- [ ] **Employee Module Refactor**
    - [ ] **Modify** `EmployeeFormComponent`:
        - [ ] Remove `EmployeeStore` injection.
        - [ ] Add `@Input() employee: Employee`.
        - [ ] Add `@Input() isSaving: boolean`.
        - [ ] Add `@Output() save: EventEmitter`.
    - [ ] **Create** `EmployeeFormContainer` (`features/employee-manage/features/employee-form-container`):
        - [ ] Inject `EmployeeStore`.
        - [ ] Subscribe to Store Signals.
        - [ ] Render `app-employee-form`.
    - [ ] **Update Routes**: Point to `EmployeeFormContainer`.

- [ ] **Designation Module Refactor**
    - [ ] Apply same pattern to `DesignationFormComponent`.

---

# 🇻🇳 Phase 2: Tách Biệt Component (Smart/Dumb) (Tiếng Việt)

**Mục tiêu:** Đạt được sự phân tách mối quan tâm bằng cách loại bỏ Logic Trạng Thái (State Logic) khỏi UI Components.

## Danh sách kiểm tra (Checklist)
- [ ] **Refactor Module Employee**
    - [ ] **Sửa đổi** `EmployeeFormComponent`:
        - [ ] Xóa inject `EmployeeStore`.
        - [ ] Thêm `@Input() employee: Employee`.
        - [ ] Thêm `@Input() isSaving: boolean`.
        - [ ] Thêm `@Output() save: EventEmitter`.
    - [ ] **Tạo** `EmployeeFormContainer` (`features/employee-manage/features/employee-form-container`):
        - [ ] Inject `EmployeeStore`.
        - [ ] Subscribe vào Store Signals.
        - [ ] Render `app-employee-form`.
    - [ ] **Cập nhật Routes**: Trỏ đến `EmployeeFormContainer`.

- [ ] **Refactor Module Designation**
    - [ ] Áp dụng mô hình tương tự cho `DesignationFormComponent`.
