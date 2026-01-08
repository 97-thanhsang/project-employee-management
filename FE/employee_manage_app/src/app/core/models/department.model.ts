/**
 * Department Model
 * Khớp với Backend DTO từ Department.cs
 */
export interface Department {
  departmentId: number;
  departmentName: string;
  isActive: boolean;
}

/**
 * Department Create/Update Request
 */
export interface CreateDepartmentRequest {
  departmentName: string;
  isActive: boolean;
}
