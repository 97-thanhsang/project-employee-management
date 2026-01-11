# 🏛️ Architecture Excellence Upgrade Plan

**Goal:** Elevate `employee-manage-app` to **Excellent Enterprise Architecture** standard.
**Reference:** `architecture_excellence.md`

This plan focuses exclusively on structural improvements: **Resilience**, **Isolation**, **Abstraction**, and **Boundaries**.

---

## 🛡️ Phase 1: Resilience Foundation
**Objective:** Centralize side-effects (Errors, Loading, Auth) to remove boilerplate from Stores/Components.
**Status:** � Completed

### Tasks
1. [x] **Global HttpInterceptor** (`core/interceptors/api.interceptor.ts`)
    - [x] Auto-attach Bearer Token.
    - [x] Global Error Handling (401/403/500).
    - [x] Global Loading Indicator (NProgress/Spinner).
2. [x] **Error Handling Standardization**
    - [x] Ensure `AppError` is consistently used across all Services/Stores.

---

## 🧩 Phase 2: Component Decoupling (Smart/Dumb)
**Objective:** Isolate UI from Data Logic. Components must become "Dumb" (Pure UI), managed by "Smart" Containers.
**Status:** 🟢 Completed

### Tasks
1. [x] **Refactor Employee Module**
    - [x] Convert `EmployeeFormComponent` to Dumb (Inputs/Outputs only, no Store injection).
    - [x] Create `EmployeeFromContainer` (Smart) to connect Store <-> Form.
2. [x] **Refactor Designation Module**
    - [x] Convert `DesignationFormComponent` to Dumb.
    - [x] Create `DesignationFormContainer` (Smart).

---

## 🎭 Phase 3: Abstraction Layer (Facade Pattern)
**Objective:** Hide State Management complexity from the UI Layer.
**Status:** 🔴 Not Started

### Tasks
1. [ ] **Design Facade Interface**
    - [ ] Define `EmployeeFacade` abstract class/interface.
2. [ ] **Implement Facades**
    - [ ] Create `EmployeeFacade` service (injects `EmployeeStore`).
    - [ ] Create `DesignationFacade` service.
3. [ ] **Migrate Containers**
    - [ ] Update Containers to inject `Facade` instead of `Store`.

---

## 🧱 Phase 4: Boundary Enforcement
**Objective:** Enforce strict dependency rules to prevent spaghetti code.
**Status:** 🔴 Not Started

### Tasks
1. [ ] **Dependency Rule Config**
    - [ ] Setup ESLint rules (if possible) or Documentation.
    - [ ] Rule: `ui` cannot import `features`.
    - [ ] Rule: `data-access` cannot import `ui`.
2. [ ] **Audit & Fix**
    - [ ] Scan codebase for violations.
    - [ ] Fix circular dependencies.

---

## 📅 Roadmap Execution
| Phase | Priority | Est. Effort |
| :--- | :--- | :--- |
| **Phase 1** | 🔥 Critical | 2 Days |
| **Phase 2** | 🔥 Critical | 3 Days |
| **Phase 3** | High | 2 Days |
| **Phase 4** | Medium | 1 Day |

---

# 🇻🇳 Kế Hoạch Nâng Cấp Kiến Trúc (Tiếng Việt)

**Mục tiêu:** Nâng tầm `employee-manage-app` lên chuẩn **Excellent Enterprise Architecture**.
**Tài liệu tham khảo:** `architecture_excellence.md`

Kế hoạch này tập trung hoàn toàn vào việc cải thiện cấu trúc: **Sự kiên cường (Resilience)**, **Sự cô lập (Isolation)**, **Tính trừu tượng (Abstraction)**, và **Ranh giới (Boundaries)**.

---

## 🛡️ Phase 1: Nền Tảng Kiên Cường (Resilience Foundation)
**Mục tiêu:** Tập trung hóa các tác vụ phụ (Lỗi, Loading, Auth) để loại bỏ code lặp lại (boilerplate) trong Stores/Components.
**Trạng thái:** � Hoàn thành

### Nhiệm vụ
1. [x] **Global HttpInterceptor** (`core/interceptors/api.interceptor.ts`)
    - [x] Tự động đính kèm Bearer Token.
    - [x] Xử lý lỗi toàn cục (401/403/500).
    - [x] Chỉ thị tải trang toàn cục (NProgress/Spinner).
2. [x] **Chuẩn hóa Xử Lý Lỗi**
    - [x] Đảm bảo `AppError` được sử dụng đồng nhất trên tất cả Services/Stores.

---

## 🧩 Phase 2: Tách Biệt Component (Smart/Dumb)
**Mục tiêu:** Cô lập UI khỏi Logic Dữ Liệu. Components phải trở thành "Dumb" (Chỉ thuần UI), được quản lý bởi "Smart" Containers.
**Trạng thái:** 🟢 Hoàn thành

### Nhiệm vụ
1. [x] **Refactor Module Employee**
    - [x] Chuyển đổi `EmployeeFormComponent` thành Dumb (Chỉ Inputs/Outputs, không inject Store).
    - [x] Tạo `EmployeeFromContainer` (Smart) để kết nối Store <-> Form.
2. [x] **Refactor Module Designation**
    - [x] Chuyển đổi `DesignationFormComponent` thành Dumb.
    - [x] Tạo `DesignationFormContainer` (Smart).

---

## 🎭 Phase 3: Lớp Trừu Tượng (Facade Pattern)
**Mục tiêu:** Ẩn sự phức tạp của Quản lý Trạng thái (Signals/NgRx) khỏi Lớp Tính Năng (Feature Layer).
**Trạng thái:** 🔴 Chưa bắt đầu

### Nhiệm vụ
1. [ ] **Thiết kế Interface Facade**
    - [ ] Định nghĩa class/interface trừu tượng `EmployeeFacade`.
2. [ ] **Triển khai Facades**
    - [ ] Tạo service `EmployeeFacade` (inject `EmployeeStore`).
    - [ ] Tạo service `DesignationFacade`.
3. [ ] **Di chuyển Containers**
    - [ ] Cập nhật Containers để inject `Facade` thay vì `Store`.

---

## 🧱 Phase 4: Thực Thi Ranh Giới (Boundary Enforcement)
**Mục tiêu:** Thực thi các quy tắc phụ thuộc nghiêm ngặt để ngăn chặn code rối (spaghetti code).
**Trạng thái:** 🔴 Chưa bắt đầu

### Nhiệm vụ
1. [ ] **Cấu hình Quy Tắc Phụ Thuộc**
    - [ ] Thiết lập quy tắc ESLint (nếu có thể) hoặc Tài liệu hóa.
    - [ ] Quy tắc: `ui` không được import `features`.
    - [ ] Quy tắc: `data-access` không được import `ui`.
2. [ ] **Kiểm Tra & Sửa Lỗi**
    - [ ] Quét codebase để tìm vi phạm.
    - [ ] Sửa các phụ thuộc vòng (circular dependencies).

---

## 📅 Lộ Trình Thực Hiện
| Giai đoạn | Mức độ ưu tiên | Ước tính công sức |
| :--- | :--- | :--- |
| **Phase 1** | 🔥 Rất Quan Trọng | 2 Ngày |
| **Phase 2** | 🔥 Rất Quan Trọng | 3 Ngày |
| **Phase 3** | Cao | 2 Ngày |
| **Phase 4** | Trung bình | 1 Ngày |