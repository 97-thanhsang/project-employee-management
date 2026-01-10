# Phase 4: Boundary Enforcement

**Goal:** Prevent architecture erosion by enforcing strict dependency rules.

## Checklist
- [ ] **Audit Imports**
    - [ ] Check `ui` folders: Ensure NO imports from `features` or `store`.
    - [ ] Check `data-access` (Store/Services): Ensure NO imports from `ui`.
- [ ] **Refactor Violations**
    - [ ] Move shared interfaces/models to `models` or `shared` if accessed by both levels.
- [ ] **Document Rules**
    - [ ] Add `ARCHITECTURE.md` rulebook to root.

---

# 🇻🇳 Phase 4: Thực Thi Ranh Giới (Tiếng Việt)

**Mục tiêu:** Ngăn chặn sự xói mòn kiến trúc bằng cách thực thi các quy tắc phụ thuộc nghiêm ngặt.

## Danh sách kiểm tra (Checklist)
- [ ] **Kiểm Tra Imports**
    - [ ] Kiểm tra thư mục `ui`: Đảm bảo KHÔNG import từ `features` hoặc `store`.
    - [ ] Kiểm tra `data-access` (Store/Services): Đảm bảo KHÔNG import từ `ui`.
- [ ] **Sửa Lỗi Vi Phạm**
    - [ ] Di chuyển các interfaces/models dùng chung sang `models` hoặc `shared` nếu được truy cập bởi cả hai cấp độ.
- [ ] **Tài Liệu Hóa Quy Tắc**
    - [ ] Thêm hướng dẫn `ARCHITECTURE.md` vào thư mục gốc.
