import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '@core/models/api-response.model';
import { Department } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = `${environment.apiUrl}/DepartmentMaster`;

  constructor(private http: HttpClient) { }

  /**
   * Get all departments
   * @returns Observable<ApiResponse<Department[]>>
   */
  getAllDepartments(): Observable<ApiResponse<Department[]>> {
    return this.http.get<ApiResponse<Department[]>>(this.apiUrl);
  }

  /**
   * Get department by ID
   * @param id Department ID
   * @returns Observable<ApiResponse<Department>>
   */
  getDepartmentById(id: number): Observable<ApiResponse<Department>> {
    return this.http.get<ApiResponse<Department>>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create new department
   * @param department Department data
   * @returns Observable<ApiResponse<Department>>
   */
  createDepartment(department: Department): Observable<ApiResponse<Department>> {
    return this.http.post<ApiResponse<Department>>(this.apiUrl, department);
  }

  /**
   * Update existing department
   * @param id Department ID
   * @param department Updated department data
   * @returns Observable<ApiResponse<Department>>
   */
  updateDepartment(id: number, department: Department): Observable<ApiResponse<Department>> {
    return this.http.put<ApiResponse<Department>>(`${this.apiUrl}/${id}`, department);
  }

  /**
   * Delete department
   * @param id Department ID
   * @returns Observable<ApiResponse<void>>
   */
  deleteDepartment(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
