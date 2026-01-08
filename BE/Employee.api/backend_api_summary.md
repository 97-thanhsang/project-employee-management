# Tổng quan API Backend cho FE Team

Đây là tài liệu tổng hợp tất cả thông tin về các API backend đã được xây dựng, nhằm mục đích giúp team Frontend (Angular) có thể hiểu và tích hợp một cách dễ dàng.

## 1. Cấu trúc thư mục chính

-   `/Controllers`: Chứa tất cả các API controllers (endpoint).
-   `/Model`: Chứa các data models (thực thể database) và các request models (DTOs).
-   `/Validators`: Chứa các logic validation cho models sử dụng FluentValidation.
-   `/Helpers`: Chứa các lớp hỗ trợ như phân trang, cấu trúc response chuẩn, hằng số lỗi.

## 2. Mô hình Dữ liệu (Data Models)

### `Department.cs`
```csharp
public class Department
{
    public int departmentId { get; set; } // Primary Key
    public string departmentName { get; set; }
    public bool isActive { get; set; }
}
```

### `Designation.cs`
```csharp
public class Designation
{
    public int designationId { get; set; } // Primary Key
    public int departmentId { get; set; } // Foreign Key to Department
    public string designationName { get; set; }
}
```

### `Employee.cs`
```csharp
public class Employee
{
    public int employeeId { get; set; } // Primary Key
    public string name { get; set; }
    public string contactNo { get; set; }
    public string city { get; set; }
    public string email { get; set; }
    public string state { get; set; }
    public string pincode { get; set; }
    public string altContactNo { get; set; }
    public string address { get; set; }
    public int designationId { get; set; } // Foreign Key to Designation
    public DateTime createDate { get; set; }
    public DateTime modifiedData { get; set; }
    public string password { get; set; } // Hashed password
}
```

### `LoginRequest.cs` (Request Model)
```csharp
public class LoginRequest
{
    public string email { get; set; }
    public string password { get; set; }
}
```

## 3. Cấu trúc Response Chuẩn (`ApiResponse`)

Tất cả các response từ API đều tuân theo cấu trúc `ApiResponse` dưới đây để đảm bảo tính nhất quán.

```csharp
public class ApiResponse
{
    public int StatusCode { get; }      // HTTP Status Code (200, 201, 400, 404, 500...)
    public int? ErrorCode { get; }       // Mã lỗi nội bộ (vd: 40001, 40401)
    public string? Message { get; }      // Thông điệp (thành công hoặc lỗi)
    public object? Data { get; }         // Dữ liệu trả về (có thể là object, list, hoặc null)
}
```

**Ví dụ Response thành công (HTTP 200 OK):**
```json
{
  "statusCode": 200,
  "errorCode": null,
  "message": "Success",
  "data": [
    {
      "departmentId": 1,
      "departmentName": "IT",
      "isActive": true
    }
  ]
}
```

**Ví dụ Response lỗi (HTTP 400 Bad Request):**
```json
{
  "statusCode": 400,
  "errorCode": 40001,
  "message": "One or more validation errors occurred.",
  "data": [
    "'departmentName' must not be empty."
  ]
}
```

## 4. Xác thực & Phân quyền (Authentication)

-   API sử dụng **JWT Bearer Token** để xác thực.
-   Khi đăng nhập thành công, API sẽ trả về một `token`.
-   Bạn cần phải đính kèm `token` này vào header của mỗi request tiếp theo tới các API cần xác thực.
    -   Header: `Authorization`
    -   Value: `Bearer <your_jwt_token>`

## 5. Danh sách API Endpoints

### 5.1. `AuthController`
-   **Base URL:** `/api/Auth`

#### `POST /api/Auth/login`
-   **Mô tả:** Đăng nhập và lấy token.
-   **Request Body:** (`LoginRequest`)
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```
-   **Success Response (200 OK):**
    -   Payload: `ApiResponse` chứa token.
    ```json
    {
      "statusCode": 200,
      "errorCode": null,
      "message": "Login successful.",
      "data": {
        "token": "ey..."
      }
    }
    ```
-   **Error Response:**
    -   `401 Unauthorized`: Sai `email` hoặc `password`.
    -   `400 Bad Request`: Thiếu `email` hoặc `password`.

---

### 5.2. `DepartmentMasterController`
-   **Base URL:** `/api/DepartmentMaster`

#### `GET /api/DepartmentMaster`
-   **Mô tả:** Lấy danh sách các phòng ban với tùy chọn filter, sort, và paging.
-   **Query Parameters:** (`QueryParameters`)
    -   `filter` (string): Lọc theo `departmentName`.
    -   `sortBy` (string): Tên trường muốn sort (vd: `departmentName`).
    -   `sortOrder` (string): `asc` (tăng dần) hoặc `desc` (giảm dần).
    -   `pageNumber` (int): Số trang (mặc định: 1).
    -   `pageSize` (int): Số lượng item mỗi trang (mặc định: 10, max: 50).
-   **Ví dụ:** `/api/DepartmentMaster?filter=IT&sortBy=departmentName&sortOrder=asc&pageNumber=1&pageSize=5`
-   **Success Response (200 OK):** `ApiResponse` với `data` là một mảng các `Department`.

#### `GET /api/DepartmentMaster/{id}`
-   **Mô tả:** Lấy thông tin một phòng ban theo `id`.
-   **Success Response (200 OK):** `ApiResponse` với `data` là một object `Department`.
-   **Error Response (404 Not Found):** Nếu `id` không tồn tại.

#### `POST /api/DepartmentMaster`
-   **Mô tả:** Tạo một phòng ban mới.
-   **Request Body:** (`Department`)
    ```json
    {
      "departmentName": "Human Resources",
      "isActive": true
    }
    ```
-   **Success Response (201 Created):** `ApiResponse` với `data` là object `Department` vừa được tạo.

#### `PUT /api/DepartmentMaster/{id}`
-   **Mô tả:** Cập nhật một phòng ban.
-   **Request Body:** (`Department`)
    ```json
    {
      "departmentId": 1,
      "departmentName": "Information Technology",
      "isActive": true
    }
    ```
-   **Success Response (200 OK):** `ApiResponse` với `data` là object `Department` đã được cập nhật.

#### `DELETE /api/DepartmentMaster/{id}`
-   **Mô tả:** Xóa một phòng ban.
-   **Success Response (200 OK):** `ApiResponse` với `message` thông báo thành công.

---

### 5.3. `DesignationMasterController`
-   **Base URL:** `/api/DesignationMaster`
-   (Tương tự như `DepartmentMasterController` nhưng dành cho `Designation`)
-   `GET /api/DesignationMaster`: Lấy danh sách chức vụ (hỗ trợ filter, sort, page).
-   `GET /api/DesignationMaster/{id}`: Lấy chức vụ theo `id`.
-   `POST /api/DesignationMaster`: Tạo chức vụ mới.
-   `PUT /api/DesignationMaster/{id}`: Cập nhật chức vụ.
-   `DELETE /api/DesignationMaster/{id}`: Xóa chức vụ.

---

### 5.4. `EmployeeMasterController`
-   **Base URL:** `/api/EmployeeMaster`

#### `GET /api/EmployeeMaster`
-   **Mô tả:** Lấy danh sách nhân viên (hỗ trợ filter, sort, page). Filter theo trường `name`.
-   **Query Parameters:** Tương tự `DepartmentMaster`.
-   **Success Response (200 OK):** `ApiResponse` với `data` là một mảng `Employee`. Mật khẩu sẽ không được trả về.

#### `GET /api/EmployeeMaster/{id}`
-   **Mô tả:** Lấy thông tin nhân viên theo `id`.
-   **Success Response (200 OK):** `ApiResponse` với `data` là một object `Employee`.

#### `POST /api/EmployeeMaster`
-   **Mô tả:** Tạo nhân viên mới. Mật khẩu là bắt buộc.
-   **Request Body:** (`Employee`)
-   **Success Response (201 Created):** `ApiResponse` với `data` là object `Employee` vừa tạo.

#### `PUT /api/EmployeeMaster/{id}`
-   **Mô tả:** Cập nhật nhân viên. Mật khẩu là tùy chọn, chỉ cập nhật nếu được cung cấp.
-   **Request Body:** (`Employee`)
-   **Success Response (200 OK):** `ApiResponse` với `data` là object `Employee` đã cập nhật.

#### `DELETE /api/EmployeeMaster/{id}`
-   **Mô tả:** Xóa nhân viên.
-   **Success Response (200 OK):** `ApiResponse` với `message` thông báo thành công.

## 6. Quy tắc Validation

-   **Department**: `departmentName` không được rỗng, tối đa 50 ký tự.
-   **Designation**: `designationName` không được rỗng, tối đa 50 ký tự. `departmentId` không được rỗng.
-   **Login**: `email` phải là định dạng email, `password` không được rỗng.
-   **Employee**:
    -   `name`: không được rỗng, tối đa 50 ký tự.
    -   `contactNo`: phải có 10 ký tự.
    -   `email`: phải là định dạng email.
    -   `pincode`: phải có 6 ký tự.
    -   `password` (khi tạo mới): không được rỗng, tối thiểu 8 ký tự.
    -   `password` (khi cập nhật): nếu được cung cấp, phải tối thiểu 8 ký tự.
    -   Các trường khác như `city`, `state`, `address`, `designationId` là bắt buộc.
