# 🔗 Hướng Dẫn Giao Tiếp BE-FE (Development Mode)

## 📋 Kiểm Tra Sơ Bộ

### ✅ Cấu Hình Hiện Tại

| Component | Cấu Hình | Trạng Thái |
|-----------|---------|-----------|
| **FE Port** | `http://localhost:4200` | ✅ Sẵn sàng |
| **BE Port** | `http://localhost:5110` | ✅ Sẵn sàng |
| **FE API URL** | `http://localhost:5110/api` | ✅ **ĐÃ CẬP NHẬT** |
| **CORS Policy** | `http://localhost:4200` | ✅ Đã config |
| **JWT Auth** | Key đã setup | ✅ Ready |
| **Database** | `Server=DELL\\SQLEXPRESS;Database=employeeManagerDb` | ✅ Cơ bản |

---

## 🚀 Các Bước Chạy Dự Án

### **Bước 1: Chuẩn Bị Database**
```bash
# 1. Kiểm tra SQL Server đã running
# 2. Restore database từ file: database/employeeManagerDb.sql
# 3. Hoặc chạy migrations nếu có
```

**Lệnh kiểm tra kết nối:**
```sql
-- Chạy trên SQL Server Management Studio
SELECT @@SERVERNAME AS 'Server Name';
SELECT DB_NAME() AS 'Current Database';
```

---

### **Bước 2: Chạy Backend (.NET API)**

**Terminal 1 (Backend):**
```bash
cd "e:\SOURCE\project-employee-management\BE\Employee.api\Employee.api"
dotnet run
```

**Output mong muốn:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5110
      Now listening on: https://localhost:7211
```

**Verify API đang chạy:**
- Mở browser: `http://localhost:5110/swagger/index.html`
- Xem Swagger UI với tất cả endpoints

---

### **Bước 3: Chạy Frontend (Angular)**

**Terminal 2 (Frontend):**
```bash
cd "e:\SOURCE\project-employee-management\FE\employee_manage_app"
npm start
```

**Output mong muốn:**
```
✔ Browser application bundle generation complete
✔ Local:   http://localhost:4200/
```

**Verify FE đang chạy:**
- Mở browser: `http://localhost:4200`
- Xem ứng dụng Employee Management

---

## ✅ Kiểm Tra Giao Tiếp BE-FE

### **Test 1: Danh Sách Nhân Viên**
```
1. Mở FE: http://localhost:4200
2. Vào trang "Danh sách nhân viên"
3. Xem Console (F12) → Network tab
4. Kiểm tra request:
   - URL: http://localhost:5110/api/EmployeeMaster
   - Method: GET
   - Status: 200 ✅
```

### **Test 2: Tạo Nhân Viên**
```
1. Click "Thêm nhân viên"
2. Điền form, click "Tạo"
3. Xem Console → Network tab:
   - URL: http://localhost:5110/api/EmployeeMaster
   - Method: POST
   - Status: 201 ✅
4. Xem toast notification: "Nhân viên đã được tạo thành công!"
```

### **Test 3: Cập Nhật Nhân Viên**
```
1. Click nút "Sửa" trên nhân viên
2. Thay đổi thông tin, click "Cập nhật"
3. Xem Console → Network tab:
   - URL: http://localhost:5110/api/EmployeeMaster/{id}
   - Method: PUT
   - Status: 200 ✅
4. Xem toast: "Nhân viên đã được cập nhật thành công!"
```

### **Test 4: Xóa Nhân Viên**
```
1. Click nút "Xóa" trên nhân viên
2. Confirm trên SweetAlert2 dialog
3. Xem Console → Network tab:
   - URL: http://localhost:5110/api/EmployeeMaster/{id}
   - Method: DELETE
   - Status: 200 ✅
4. Xem toast: "Nhân viên đã được xóa thành công!"
```

---

## 🔍 Các Endpoint API Chính

### **EmployeeMaster Controller**

| Endpoint | Method | Mô Tả | Query Params |
|----------|--------|-------|--------------|
| `/api/EmployeeMaster` | GET | Lấy danh sách | filter, sortBy, sortOrder, pageNumber, pageSize |
| `/api/EmployeeMaster/{id}` | GET | Lấy chi tiết | - |
| `/api/EmployeeMaster` | POST | Tạo mới | - |
| `/api/EmployeeMaster/{id}` | PUT | Cập nhật | - |
| `/api/EmployeeMaster/{id}` | DELETE | Xóa | - |

### **DepartmentMaster Controller**
```
GET /api/DepartmentMaster - Lấy tất cả
GET /api/DepartmentMaster/{id} - Lấy chi tiết
```

### **DesignationMaster Controller**
```
GET /api/DesignationMaster - Lấy tất cả
GET /api/DesignationMaster/{id} - Lấy chi tiết
```

---

## 🛠️ Xử Lý Lỗi Phổ Biến

### **Lỗi 1: CORS Error**
```
Error: Access to XMLHttpRequest at 'http://localhost:5110/api/EmployeeMaster'
from origin 'http://localhost:4200' has been blocked by CORS policy
```

**Giải pháp:**
- BE đã config CORS cho `http://localhost:4200` ✅
- Kiểm tra BE có chạy trên port 5110 không
- Hard refresh FE (Ctrl+Shift+R)

### **Lỗi 2: Cannot GET /api/EmployeeMaster**
```
Status: 404
```

**Giải pháp:**
- Kiểm tra BE có chạy không: `http://localhost:5110/swagger`
- Kiểm tra database connection
- Xem BE console logs

### **Lỗi 3: Database Connection Error**
```
SqlException: Login failed for user 'Domain\User'
```

**Giải pháp:**
- Kiểm tra SQL Server đang chạy
- Verify connection string trong `appsettings.json`:
  ```json
  "empCon": "Server=DELL\\SQLEXPRESS;Database=employeeManagerDb;Trusted_Connection=True;"
  ```
- Kiểm tra database `employeeManagerDb` tồn tại

### **Lỗi 4: Network Error - Cannot reach localhost:5110**
```
net::ERR_CONNECTION_REFUSED
```

**Giải pháp:**
- Kiểm tra BE đã start: `dotnet run`
- Kiểm tra port 5110 không bị chiếm dụng:
  ```powershell
  netstat -ano | findstr 5110
  ```
- Restart BE và FE

---

## 📁 Cấu Trúc API Communication

```
┌─────────────────────────────────────────────────────────────┐
│                    Angular Frontend                          │
│              (http://localhost:4200)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ EmployeeListComponent                                │  │
│  │ - Inject: EmployeeStore                              │  │
│  │ - Call: store.loadEmployees()                        │  │
│  └─────────────┬────────────────────────────────────────┘  │
│                │                                            │
│  ┌─────────────▼────────────────────────────────────────┐  │
│  │ EmployeeStore (State Management)                     │  │
│  │ - Signal: employees, loading, error                  │  │
│  │ - Inject: EmployeeService                            │  │
│  │ - Call: employeeService.getAllEmployees()            │  │
│  └─────────────┬────────────────────────────────────────┘  │
│                │                                            │
│  ┌─────────────▼────────────────────────────────────────┐  │
│  │ EmployeeService (HTTP Client)                        │  │
│  │ - Inject: HttpClient                                 │  │
│  │ - Base URL: http://localhost:5110/api                │  │
│  │ - Call: http.get('/EmployeeMaster', {params})        │  │
│  └─────────────┬────────────────────────────────────────┘  │
└────────────────┼────────────────────────────────────────────┘
                 │ HTTP Request
                 │ GET http://localhost:5110/api/EmployeeMaster
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              .NET Core Backend API                          │
│          (http://localhost:5110)                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ EmployeeMasterController                            │  │
│  │ Route: [Route("api/[controller]")]                   │  │
│  │ - [HttpGet] GetAll(QueryParameters)                  │  │
│  │ - [HttpGet("{id}")] GetById(int id)                  │  │
│  │ - [HttpPost] Create(CreateEmployeeRequest)           │  │
│  │ - [HttpPut("{id}")] Update(int id, ...)              │  │
│  │ - [HttpDelete("{id}")] Delete(int id)                │  │
│  └─────────────┬────────────────────────────────────────┘  │
│                │                                            │
│  ┌─────────────▼────────────────────────────────────────┐  │
│  │ EmployeeDbContext (Entity Framework)                 │  │
│  │ - Connection: Server=DELL\SQLEXPRESS                 │  │
│  │ - Database: employeeManagerDb                        │  │
│  └─────────────┬────────────────────────────────────────┘  │
│                │                                            │
│  ┌─────────────▼────────────────────────────────────────┐  │
│  │ SQL Server (SQLEXPRESS)                              │  │
│  │ - Database: employeeManagerDb                        │  │
│  │ - Tables: Employees, Departments, Designations       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                 ▲ HTTP Response
                 │ 200 OK + JSON data
                 │
```

---

## 📊 Summary - Giao Tiếp BE-FE

### **Frontend (Angular 21)**
- ✅ Service-based architecture
- ✅ Signal-based state management
- ✅ Standalone components
- ✅ HttpClient for API calls
- ✅ Environment configuration (dev/prod)
- ✅ Toast notifications
- ✅ Error handling

### **Backend (.NET 8)**
- ✅ RESTful API with controllers
- ✅ CORS configured for FE
- ✅ Entity Framework ORM
- ✅ JWT Authentication setup
- ✅ Fluent Validation
- ✅ Swagger/OpenAPI documentation
- ✅ Structured error responses

### **Database (SQL Server)**
- ✅ employeeManagerDb database
- ✅ Tables: Employees, Departments, Designations
- ✅ Relationships configured
- ✅ Connection string in appsettings

---

## 🎯 Checklists Cuối Cùng

### ✅ Pre-Launch Checklist

- [ ] SQL Server đang chạy
- [ ] Database `employeeManagerDb` tồn tại
- [ ] FE environment.ts có `apiUrl: http://localhost:5110/api`
- [ ] BE Program.cs có CORS policy cho `http://localhost:4200`
- [ ] BE appsettings có kết nối DB chính xác
- [ ] Ports không bị chiếm dụng (4200, 5110)

### 🚀 Launch Steps

1. **Terminal 1:** `cd BE && dotnet run`
2. **Terminal 2:** `cd FE && npm start`
3. **Browser:** Mở `http://localhost:4200`
4. **Test:** Tạo/sửa/xóa nhân viên, kiểm tra toasts

### ✅ Verification Checklist

- [ ] BE Swagger mở được: `http://localhost:5110/swagger`
- [ ] FE load được: `http://localhost:4200`
- [ ] Danh sách nhân viên hiển thị (từ DB)
- [ ] Tạo nhân viên mới → Success toast
- [ ] Sửa nhân viên → Success toast
- [ ] Xóa nhân viên → SweetAlert2 + Success toast
- [ ] Network requests thành công (200 status)

---

## 📞 Support

Nếu có lỗi:
1. Kiểm tra BE console logs
2. Kiểm tra FE console logs (F12)
3. Kiểm tra Network tab (F12)
4. Verify connection strings & ports

**Ready to go! 🚀**
