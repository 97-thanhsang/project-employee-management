# Phase 1: Resilience Foundation

**Goal:** Centralize error handling, authentication injection, and loading states to ensure system reliability and reduce code duplication.

## Checklist
- [x] **Create Global Interceptor** `core/interceptors/api.interceptor.ts`
    - [x] Function-based Interceptor (Angular 15+ standard).
    - [x] Logic: Clone request -> Add Bearer Token.
    - [x] Logic: `catchError` -> Handle 401 (Logout), 403 (Forbidden), 500 (Server Error).
    - [x] Logic: `finalize` -> Stop Loading Spinner.
- [x] **Register Interceptor**
    - [x] specific in `app.config.ts`.
- [x] **Cleanup Services**
    - [x] Remove manual Token Header injection from `EmployeeService`, `DepartmentService`, `AuthService`.

---

# 🇻🇳 Phase 1: Nền Tảng Kiên Cường (Tiếng Việt)

**Mục tiêu:** Tập trung hóa xử lý lỗi, inject xác thực (authentication), và trạng thái tải (loading states) để đảm bảo độ tin cậy của hệ thống và giảm thiểu lặp code.

## Danh sách kiểm tra (Checklist)
- [x] **Tạo Global Interceptor** `core/interceptors/api.interceptor.ts`
    - [x] Interceptor dạng hàm (Chuẩn Angular 15+).
    - [x] Logic: Clone request -> Thêm Bearer Token.
    - [x] Logic: `catchError` -> Xử lý 401 (Đăng xuất), 403 (Cấm truy cập), 500 (Lỗi Server).
    - [x] Logic: `finalize` -> Tắt Spinner Loading.
- [x] **Đăng ký Interceptor**
    - [x] Cụ thể trong `app.config.ts`.
- [x] **Dọn dẹp Services**
    - [x] Xóa việc inject Token Header thủ công khỏi `EmployeeService`, `DepartmentService`, `AuthService`.
