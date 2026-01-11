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
  password: string; // Bắt buộc khi tạo mới
  createDate: string;
  modifiedDate: string;

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
  createDate: string;
  modifiedDate: string;

}

/**
 * Employee View Model (For UI Display)
 * Includes computed properties like designationName
 */
export interface EmployeeViewModel extends Employee {
  designationName: string;
}
