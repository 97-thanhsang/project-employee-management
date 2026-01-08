/**
 * Designation Model
 * Khớp với Backend DTO từ Designation.cs
 */
export interface Designation {
  designationId: number;
  departmentId: number;
  designationName: string;
}

/**
 * Designation Create/Update Request
 */
export interface CreateDesignationRequest {
  departmentId: number;
  designationName: string;
}
