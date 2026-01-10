# Phase 1: Resilience Foundation

**Goal:** Centralize error handling, authentication injection, and loading states to ensure system reliability and reduce code duplication.

## Checklist
- [ ] **Create Global Interceptor** `core/interceptors/api.interceptor.ts`
    - [ ] Function-based Interceptor (Angular 15+ standard).
    - [ ] Logic: Clone request -> Add Bearer Token.
    - [ ] Logic: `catchError` -> Handle 401 (Logout), 403 (Forbidden), 500 (Server Error).
    - [ ] Logic: `finalize` -> Stop Loading Spinner.
- [ ] **Register Interceptor**
    - [ ] specific in `app.config.ts`.
- [ ] **Cleanup Services**
    - [ ] Remove manual Token Header injection from `EmployeeService`, `DepartmentService`, `AuthService`.

---

# 🇻🇳 Phase 1: Nền Tảng Kiên Cường (Tiếng Việt)

**Mục tiêu:** Tập trung hóa xử lý lỗi, inject xác thực (authentication), và trạng thái tải (loading states) để đảm bảo độ tin cậy của hệ thống và giảm thiểu lặp code.

## Danh sách kiểm tra (Checklist)
- [ ] **Tạo Global Interceptor** `core/interceptors/api.interceptor.ts`
    - [ ] Interceptor dạng hàm (Chuẩn Angular 15+).
    - [ ] Logic: Clone request -> Thêm Bearer Token.
    - [ ] Logic: `catchError` -> Xử lý 401 (Đăng xuất), 403 (Cấm truy cập), 500 (Lỗi Server).
    - [ ] Logic: `finalize` -> Tắt Spinner Loading.
- [ ] **Đăng ký Interceptor**
    - [ ] Cụ thể trong `app.config.ts`.
- [ ] **Dọn dẹp Services**
    - [ ] Xóa việc inject Token Header thủ công khỏi `EmployeeService`, `DepartmentService`, `AuthService`.
