# ⚡ QUICK START - Chạy BE & FE (5 phút)

## 🎯 Mục Tiêu
Chạy cả Backend (.NET) và Frontend (Angular) giao tiếp với nhau trên localhost

---

## 📋 Yêu Cầu Chuẩn Bị

- ✅ SQL Server đang chạy
- ✅ Database `employeeManagerDb` tồn tại
- ✅ Node.js + npm cài đặt
- ✅ .NET 8 SDK cài đặt
- ✅ FE environment.ts đã cập nhật port → 5110 ✅

---

## 🚀 Chạy Dự Án (3 bước)

### **Bước 1️⃣ : Mở Terminal 1 - Chạy Backend**

```bash
cd "e:\SOURCE\project-employee-management\BE\Employee.api\Employee.api"
dotnet run
```

**Chờ thấy:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5110
```

✅ **Backend chạy thành công!**

---

### **Bước 2️⃣ : Mở Terminal 2 - Chạy Frontend**

```bash
cd "e:\SOURCE\project-employee-management\FE\employee_manage_app"
npm start
```

**Chờ thấy:**
```
✔ Browser application bundle generation complete
✔ Local:   http://localhost:4200/
```

✅ **Frontend chạy thành công!**

---

### **Bước 3️⃣ : Mở Browser & Test**

1. **Mở:** `http://localhost:4200`
2. **Xem:** Danh sách nhân viên từ database
3. **Test:**
   - ✅ Tạo nhân viên → Toast "Nhân viên đã được tạo thành công!"
   - ✅ Sửa nhân viên → Toast "Nhân viên đã được cập nhật thành công!"
   - ✅ Xóa nhân viên → SweetAlert2 dialog + Toast thành công

---

## 🔍 Kiểm Tra Nhanh

| Link | Mục Đích |
|------|---------|
| `http://localhost:4200` | ✅ Ứng dụng Frontend |
| `http://localhost:5110/swagger` | ✅ API Documentation |
| `F12 → Network` | ✅ Xem HTTP requests |

---

## ❌ Nếu Có Lỗi?

### **Lỗi: Cannot connect to database**
```
→ Kiểm tra SQL Server đang chạy
→ Kiểm tra appsettings.json có đúng connection string
```

### **Lỗi: CORS error**
```
→ BE đã config CORS ✅
→ Refresh FE (Ctrl+Shift+R)
```

### **Lỗi: Port 5110 hoặc 4200 bị chiếm dụng**
```powershell
# Kiểm tra
netstat -ano | findstr 5110
netstat -ano | findstr 4200

# Kill process
taskkill /PID <PID> /F
```

---

## 📚 Xem Chi Tiết

👉 **Hướng dẫn đầy đủ:** [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)

---

## ✨ Kết Quả Cuối Cùng

```
✅ Backend (.NET) chạy trên http://localhost:5110
✅ Frontend (Angular) chạy trên http://localhost:4200
✅ FE gọi API từ BE thành công
✅ Database giao tiếp OK
✅ CRUD operations hoạt động toàn bộ
✅ Toast notifications & SweetAlert2 hiển thị
✅ Role-based access control (Admin only)
```

**Ready to go! 🚀**
