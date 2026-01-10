import { Pipe, PipeTransform } from '@angular/core';
import { Department } from '../../features/employee-manage/models';

/**
 * DepartmentNamePipe
 *
 * Pure pipe to get department name from ID.
 * Pure pipes are only executed when their input values change,
 * making them very efficient for repeated use.
 *
 * Usage in template:
 * {{ employee.departmentId | departmentName: store.departments() }}
 *
 * Example:
 * {{ 1 | departmentName: departments }}  →  "IT"
 * {{ 999 | departmentName: departments }} →  "N/A"
 */
@Pipe({
  name: 'departmentName',
  standalone: true,
  pure: true // Mark as pure for performance optimization
})
export class DepartmentNamePipe implements PipeTransform {
  /**
   * Transform department ID to department name
   * @param departmentId ID of the department
   * @param departments Array of departments
   * @returns Department name or 'N/A' if not found
   */
  transform(departmentId: number | null | undefined, departments: Department[] | null | undefined): string {
    // Handle null/undefined inputs
    if (!departmentId || !departments || departments.length === 0) {
      return 'N/A';
    }

    // Find department by ID
    const department = departments.find(d => d.departmentId === departmentId);

    // Return name or N/A
    return department ? department.departmentName : 'N/A';
  }
}
