# Phân Tích Kỹ Thuật Dự Án (Technical Audit)

> [!NOTE]
> Phân tích dựa trên vai trò [Senior Angular Architect] và tiêu chí từ `MentorAngular.md`.

## 1. Tổng Quan Kiến Trúc (Architecture Overview)

### Điểm Mạnh (Strengths) ✅
- **Cập nhật Công Nghệ:** Sử dụng Angular 19+ (dựa trên dependencies `@angular/core: ^21.0.0` - *lưu ý: version này có vẻ bất thường, có thể là nightly build hoặc custom, nhưng giả định là latest*).
- **State Management Hiện Đại:** Áp dụng **Angular Signals** cho reactive state management trong `EmployeeStore`. Đây là approach chuẩn cho Angular hiện đại, thay thế dần BehaviorSubject/NgRx cho application state đơn giản đến trung bình.
- **Standalone Components:** Các component như `EmployeeListComponent`, `EmployeeFormComponent` đều là `standalone: true`, giúp giảm boilerplate của NgModules và cải thiện tree-shaking.
- **Change Detection Strategy:** Sử dụng `OnPush` (`ChangeDetectionStrategy.OnPush`) ở các component chính. Điều này rất tốt cho performance.
- **Modular Structure:** Cấu trúc thư mục chia theo feature (`features/employee-manage`) và core/shared (`core`, `shared`).
- **Lazy Loading:** `loadChildren` và `loadComponent` được sử dụng trong routing (`app.routes.ts`, `shell.routes.ts`), tối ưu bundle size.

### Điểm Cần Cải Thiện (Areas for Improvement) ⚠️
- **Service trong Store:** `EmployeeStore` đang trực tiếp gọi `EmployeeService` và subscribe (`.subscribe()`).
    - *Risk:* Khó test isolation, Side effects bị trộn lẫn trong state logic.
    - *Recommendation:* Cân nhắc sử dụng `rxMethod` (nếu dùng NgRx SignalStore) hoặc tách logic side-effect ra khỏi store nếu project scale lớn. Tuy nhiên với scale hiện tại, approach này chấp nhận được nhưng cần quản lý subscription kỹ (mặc dù `HttpClient` tự complete, nhưng manuel subscription trong store vẫn là điểm trừ nhỏ về architectural purity).
- **State Mutation:** `addEmployee` đang mutate mảng locally (`[...currentEmployees, response.data]`).
    - *Risk:* Nếu backend trả về data đã được process khác với frontend gửi lên, UI có thể desync nếu không reload.
    - *Recommendation:* Với các action critical, có thể cân nhắc reload list hoặc đảm bảo response từ BE là source of truth duy nhất.
- **Hard-coded Paths:** Import path đôi khi dùng relative sâu (`../../../../`) thay vì alias path (`@core`, `@shared`) đã define trong `tsconfig.json`.

## 2. Chi Tiết Thực Thi (Implementation Details)

### State Management (`EmployeeStore`)
- **Signal-based:** Rất tốt. Sử dụng `WritableSignal` cho internal state và `computed` cho public state -> đảm bảo Encapsulation.
- **Dependency Injection:** `providedIn: 'root'` -> Singleton service. Phù hợp cho global/feature state.
- **Parallel Loading:** `forkJoin` cho master data là practice tốt.

### Component Design
- **Smart/Dumb Pattern:** `EmployeeListComponent` đóng vai trò Smart Component (tương tác store).
- **Form Handling:** Sử dụng Reactive Forms (`FormGroup`, `FormBuilder`) là chuẩn mực.
- **Zoneless Readiness:** Việc dùng Signal là bước đệm tốt để tiến tới Zoneless Angular.

### UI/UX Libraries
- **Tech Stack:** Ant Design (`ng-zorro-antd`) + Bootstrap 5.
- **Hybrid Approach:** Cần cẩn trọng conflict CSS giữa Bootstrap và Ant Design. Ant Design có css system riêng, việc override bằng Bootstrap utilities cần test kỹ trên các trình duyệt/thiết bị.

## 3. Đánh Giá Theo Tiêu Chí Mentor (Mentor Criteria Evaluation)

| Tiêu Chí | Đánh Giá | Nhận Xét |
| :--- | :--- | :--- |
| **Scalability** | **Medium** | Cấu trúc feature-based tốt. Store hiện tại scale tốt cho feature này. Cần quy hoạch rõ hơn nếu thêm nhiều domain (Order, Auth, Inventory...). |
| **Maintainability** | **High** | Code rõ ràng, typing (TypeScript) đầy đủ. Sử dụng Signals giúp giảm complexity so với RxJS streams phức tạp. |
| **Performance** | **High** | OnPush strategy, Lazy Loading, Signals. |
| **Testability** | **Medium** | Logic trong Store có thể unit test được. Tuy nhiên việc subscribe trực tiếp trong method cần mock service kỹ. |

## 4. Đề Xuất (Recommendations)

1.  **Refactor Imports:** Quét toàn bộ project và thay thế relative paths (`../../../`) bằng alias paths (`@features/`, `@core/`, `@shared/`) để code cleaner và dễ refactor folder structure sau này.
2.  **Strict Typing:** Kiểm tra `tsconfig.json`, đảm bảo `strict: true`. Trong `EmployeeStore` đã thấy khai báo type `Employee`, `Department`... tốt.
3.  **Error Handling:** Hiện tại `errorSignal` lưu string. Cân nhắc lưu object lỗi chuẩn hóa để handle UI tốt hơn (ví dụ: field-level validation errors từ BE).
4.  **Loading State Granularity:** Store có `loadingSignal` chung. Có thể cần tách `isCreating`, `isUpdating`, `isDeleting` nếu UI cần hiển thị loading riêng biệt cho từng action (ví dụ: button spinner).

---

> [!TIP]
> **Câu hỏi cho em:** Em có định hướng mở rộng dự án này sang dạng Monorepo (Nx) sau này không? Nếu có, cấu trúc hiện tại cần điều chỉnh một chút về "Library Boundaries".
