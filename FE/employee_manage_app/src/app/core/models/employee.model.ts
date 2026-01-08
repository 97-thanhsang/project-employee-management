/**
 * Employee Model
 * Khớp với Backend DTO từ Employee.cs
 */
export interface Employee {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  altContactNo?: string;
  designationId: number;
  createDate: string;
  modifiedDate: string;
}

/**
 * Employee Create Request (không có ID, timestamp)
 */
export interface CreateEmployeeRequest {
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  altContactNo?: string;
  designationId: number;
  password: string; // Bắt buộc khi tạo mới
}

/**
 * Employee Update Request (password là tùy chọn)
 */
export interface UpdateEmployeeRequest {
  employeeId: number;
  name: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  altContactNo?: string;
  designationId: number;
  password?: string; // Tùy chọn khi cập nhật
}
