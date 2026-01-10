import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../models';
import { ApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';

/**
 * EmployeeService
 * Infrastructure Layer - Chịu trách nhiệm gọi API backend
 *
 * Nguyên tắc thiết kế:
 * - Không xử lý state ở đây, chỉ call API
 * - Trả về Observable<ApiResponse<T>> để Store xử lý state
 * - Không có side effects, pure API calls
 *
 * @Injectable: Giúp Angular DI inject vào các component/service
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly employeeEndpoint = `${environment.apiUrl}/EmployeeMaster`;

  constructor(private http: HttpClient) { }

  /**
   * Lấy danh sách nhân viên (hỗ trợ filter, sort, page)
   *
   * @param filter Tìm kiếm theo name
   * @param sortBy Trường để sort (mặc định: 'name')
   * @param sortOrder 'asc' hoặc 'desc'
   * @param pageNumber Số trang (mặc định: 1)
   * @param pageSize Số item/trang (mặc định: 10)
   * @returns Observable chứa ApiResponse với mảng Employee
   */
  getAllEmployees(
    filter?: string,
    sortBy: string = 'name',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<ApiResponse<Employee[]>> {
    let params = new HttpParams();

    if (filter) {
      params = params.set('filter', filter);
    }
    params = params
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<Employee[]>>(this.employeeEndpoint, { params });
  }

  /**
   * Lấy thông tin nhân viên theo ID
   *
   * @param employeeId ID của nhân viên
   * @returns Observable chứa ApiResponse với object Employee
   */
  getEmployeeById(employeeId: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(`${this.employeeEndpoint}/${employeeId}`);
  }

  /**
   * Tạo nhân viên mới
   *
   * @param payload CreateEmployeeRequest (bao gồm password)
   * @returns Observable chứa ApiResponse với object Employee vừa được tạo
   */
  createEmployee(payload: CreateEmployeeRequest): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(this.employeeEndpoint, payload);
  }

  /**
   * Cập nhật nhân viên
   *
   * @param employeeId ID của nhân viên cần cập nhật
   * @param payload UpdateEmployeeRequest (password là tùy chọn)
   * @returns Observable chứa ApiResponse với object Employee đã cập nhật
   */
  updateEmployee(employeeId: number, payload: UpdateEmployeeRequest): Observable<ApiResponse<Employee>> {
    return this.http.put<ApiResponse<Employee>>(`${this.employeeEndpoint}/${employeeId}`, payload);
  }

  /**
   * Xóa nhân viên
   *
   * @param employeeId ID của nhân viên cần xóa
   * @returns Observable chứa ApiResponse với message thành công/lỗi
   */
  deleteEmployee(employeeId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.employeeEndpoint}/${employeeId}`);
  }
}
