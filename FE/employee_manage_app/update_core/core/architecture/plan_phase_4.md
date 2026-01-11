# Phase 4: Boundary Enforcement

**Goal:** Prevent architecture erosion by enforcing strict dependency rules.

## Checklist
- [x] **Audit Imports**
    - [x] Check `ui` folders: Ensure NO imports from `features` or `store`.
    - [x] Check `data-access` (Store/Services): Ensure NO imports from `ui`.
- [x] **Refactor Violations**
    - [x] Move shared interfaces/models to `models` or `shared` if accessed by both levels.
- [x] **Document Rules**
    - [x] Add `ARCHITECTURE.md` rulebook to root.

---

# 🇻🇳 Phase 4: Thực Thi Ranh Giới (Tiếng Việt)

**Mục tiêu:** Ngăn chặn sự xói mòn kiến trúc bằng cách thực thi các quy tắc phụ thuộc nghiêm ngặt.

## Danh sách kiểm tra (Checklist)
- [x] **Kiểm Tra Imports**
    - [x] Kiểm tra thư mục `ui`: Đảm bảo KHÔNG import từ `features` hoặc `store`.
    - [x] Kiểm tra `data-access` (Store/Services): Đảm bảo KHÔNG import từ `ui`.
- [x] **Sửa Lỗi Vi Phạm**
    - [x] Di chuyển các interfaces/models dùng chung sang `models` hoặc `shared` nếu được truy cập bởi cả hai cấp độ.
- [x] **Tài Liệu Hóa Quy Tắc**
    - [x] Thêm hướng dẫn `ARCHITECTURE.md` vào thư mục gốc.
