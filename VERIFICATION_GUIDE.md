# 🔧 Verification & Troubleshooting Guide

## 🎯 Kiểm Tra Kết Nối BE-FE

### **1. Kiểm Tra Network Configuration**

#### **FE API URL**
```typescript
// File: src/environments/environment.ts
export const environment = {
  apiUrl: 'http://localhost:5110/api',  // ← Phải là 5110
  production: false
};
```

#### **BE CORS Policy**
```csharp
// File: Program.cs
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")  // ← FE origin
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
```

#### **BE Listen Ports**
```json
// File: Properties/launchSettings.json
{
  "profiles": {
    "http": {
      "applicationUrl": "http://localhost:5110",  // ← HTTP port
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

✅ **Kiểm tra:** Tất cả đã config chính xác

---

### **2. Kiểm Tra Database Connection**

#### **Connection String**
```json
// File: appsettings.json
"ConnectionStrings": {
  "empCon": "Server=DELL\\SQLEXPRESS;Database=employeeManagerDb;Trusted_Connection=True;TrustServerCertificate=True"
}
```

#### **Test Connection**

```sql
-- Mở SQL Server Management Studio
-- Kết nối tới: DELL\SQLEXPRESS
-- Chạy:

USE employeeManagerDb;
SELECT COUNT(*) as EmployeeCount FROM Employees;
SELECT * FROM Designations;
SELECT * FROM Departments;
```

**Kết quả mong muốn:**
- ✅ employeeManagerDb tồn tại
- ✅ Tables: Employees, Departments, Designations
- ✅ Có dữ liệu sample

---

### **3. Kiểm Tra Backend Đang Chạy**

#### **Cách 1: Swagger UI**
```
Mở: http://localhost:5110/swagger/index.html
Xem: Danh sách tất cả endpoints
```

#### **Cách 2: PowerShell Test**
```powershell
# Test HTTP GET
Invoke-RestMethod -Uri "http://localhost:5110/api/EmployeeMaster" -Method Get

# Kết quả: Array of employees từ database
```

#### **Cách 3: Browser Console**
```javascript
// Mở F12 → Console
fetch('http://localhost:5110/api/EmployeeMaster')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(e => console.error(e))

// Xem response
```

---

### **4. Kiểm Tra Frontend Đang Chạy**

#### **Browser Test**
```
Mở: http://localhost:4200
Xem: Employee management page
Click: Danh sách nhân viên
Verify: Dữ liệu từ BE hiển thị
```

#### **Console Logs**
```javascript
// Mở F12 → Console
// Kiểm tra:
// 1. Không có CORS errors
// 2. Không có 404 errors
// 3. HTTP requests là 200 OK
```

---

### **5. Kiểm Tra HTTP Requests**

#### **Network Tab (F12)**

**GET Danh sách:**
```
Request URL: http://localhost:5110/api/EmployeeMaster?pageNumber=1&pageSize=10
Method: GET
Status: 200 ✅
Response: {success: true, data: [...], message: "..."}
```

**POST Tạo:**
```
Request URL: http://localhost:5110/api/EmployeeMaster
Method: POST
Status: 201 ✅
Body: {name, email, phone, departmentId, designationId, dateOfJoining, password}
Response: {success: true, data: {employeeId, ...}, message: "..."}
```

**PUT Cập nhật:**
```
Request URL: http://localhost:5110/api/EmployeeMaster/5
Method: PUT
Status: 200 ✅
Body: {name, email, phone, departmentId, designationId, dateOfJoining}
Response: {success: true, data: {...}, message: "..."}
```

**DELETE Xóa:**
```
Request URL: http://localhost:5110/api/EmployeeMaster/5
Method: DELETE
Status: 200 ✅
Response: {success: true, data: null, message: "..."}
```

---

## ❌ Troubleshooting - Xử Lý Lỗi

### **Lỗi 1: CORS Error**

```
Access to XMLHttpRequest at 'http://localhost:5110/api/EmployeeMaster'
from origin 'http://localhost:4200' has been blocked by CORS policy
```

**Nguyên nhân:** BE không allow FE origin hoặc BE chưa start

**Giải pháp:**
1. Kiểm tra BE chạy trên port 5110: `http://localhost:5110/swagger`
2. Kiểm tra Program.cs CORS config có `http://localhost:4200`
3. Restart BE: `dotnet run`
4. Refresh FE: `Ctrl+Shift+R`

---

### **Lỗi 2: Failed to Fetch**

```
Uncaught (in promise) TypeError: Failed to fetch
```

**Nguyên nhân:** Không thể kết nối tới BE

**Giải pháp:**
1. Kiểm tra BE chạy: `http://localhost:5110/swagger`
2. Kiểm tra port 5110 không bị chiếm dụng
3. Kiểm tra firewall không block port 5110
4. Kiểm tra environment.ts có đúng URL

---

### **Lỗi 3: 404 Not Found**

```
http://localhost:5110/api/EmployeeMaster returns 404
```

**Nguyên nhân:** Controller không đúng hoặc route không tìm thấy

**Giải pháp:**
1. Kiểm tra EmployeeMasterController route: `[Route("api/[controller]")]`
2. Kiểm tra method có `[HttpGet]` decorator
3. Kiểm tra BE compile không có lỗi
4. Restart BE: `Ctrl+C` rồi `dotnet run`

---

### **Lỗi 4: Database Connection Error**

```
SqlException: Login failed for user 'DELL\User'
OR
A network-related or instance-specific error occurred
```

**Nguyên nhân:** SQL Server không chạy hoặc connection string sai

**Giải pháp:**
1. Kiểm tra SQL Server đang chạy
2. Kiểm tra connection string trong appsettings.json:
   ```json
   "Server=DELL\\SQLEXPRESS;Database=employeeManagerDb;Trusted_Connection=True;"
   ```
3. Kiểm tra database tồn tại: SQL Server Management Studio → Connect → employeeManagerDb
4. Kiểm tra instance name chính xác (SQLEXPRESS)

---

### **Lỗi 5: Toast Notification Không Hiển Thị**

**Nguyên nhân:** ToastrService chưa config hoặc CSS không load

**Giải pháp:**
1. Kiểm tra app.config.ts có `provideToastr()`
2. Kiểm tra `@angular/animations` installed: `npm list @angular/animations`
3. Kiểm tra Browser console không có JavaScript errors
4. Hard refresh: `Ctrl+Shift+R`

---

### **Lỗi 6: SweetAlert2 Dialog Không Hiển Thị**

**Nguyên nhân:** sweetalert2 package chưa cài đặt

**Giải pháp:**
1. Kiểm tra sweetalert2 installed: `npm list sweetalert2`
2. Nếu không có: `npm install sweetalert2 --save`
3. Kiểm tra import trong component: `import Swal from 'sweetalert2'`

---

## ✅ Pre-Launch Verification Checklist

- [ ] **Backend**
  - [ ] SQL Server đang chạy
  - [ ] Database employeeManagerDb tồn tại
  - [ ] appsettings.json có đúng connection string
  - [ ] Program.cs có CORS policy cho http://localhost:4200
  - [ ] Program.cs compile không có lỗi

- [ ] **Frontend**
  - [ ] environment.ts có apiUrl: http://localhost:5110/api
  - [ ] @angular/animations installed
  - [ ] ngx-toastr installed
  - [ ] sweetalert2 installed
  - [ ] EmployeeService use đúng apiUrl
  - [ ] app.config.ts có provideToastr()

- [ ] **Network**
  - [ ] Port 4200 available (FE)
  - [ ] Port 5110 available (BE)
  - [ ] Firewall không block ports
  - [ ] No VPN/Proxy issues

- [ ] **Database**
  - [ ] Tables tồn tại: Employees, Departments, Designations
  - [ ] Foreign keys configured
  - [ ] Sample data tồn tại (nếu cần)

---

## 🚀 Launch & Verify

```bash
# Terminal 1: Backend
cd "e:\SOURCE\project-employee-management\BE\Employee.api\Employee.api"
dotnet run
# ✅ Wait for: "Now listening on: http://localhost:5110"

# Terminal 2: Frontend
cd "e:\SOURCE\project-employee-management\FE\employee_manage_app"
npm start
# ✅ Wait for: "Local: http://localhost:4200"

# Browser
# ✅ Open: http://localhost:4200
# ✅ See employee list
# ✅ Test CRUD operations
# ✅ Check Network tab for requests
```

---

## 📊 Expected API Responses

### **GET /api/EmployeeMaster**
```json
{
  "success": true,
  "statusCode": 200,
  "data": [
    {
      "employeeId": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "departmentId": 1,
      "designationId": 1,
      "dateOfJoining": "2024-01-01",
      "salary": 50000
    }
  ],
  "message": "Employees retrieved successfully"
}
```

### **POST /api/EmployeeMaster**
```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "employeeId": 5,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "0987654321",
    "departmentId": 2,
    "designationId": 2,
    "dateOfJoining": "2024-01-15"
  },
  "message": "Employee created successfully"
}
```

### **PUT /api/EmployeeMaster/{id}**
```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "employeeId": 5,
    "name": "Jane Smith Updated",
    "email": "jane.updated@example.com",
    "phone": "0987654321",
    "departmentId": 2,
    "designationId": 3,
    "dateOfJoining": "2024-01-15"
  },
  "message": "Employee updated successfully"
}
```

### **DELETE /api/EmployeeMaster/{id}**
```json
{
  "success": true,
  "statusCode": 200,
  "data": null,
  "message": "Employee deleted successfully"
}
```

---

## 📞 Support

Nếu vẫn có lỗi:
1. 📖 Xem BE console logs
2. 📖 Xem FE console logs (F12)
3. 📖 Xem Network tab requests
4. 📖 Check INTEGRATION_GUIDE.md

**Good luck! 🚀**
