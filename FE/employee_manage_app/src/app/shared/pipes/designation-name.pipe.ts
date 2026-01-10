import { Pipe, PipeTransform } from '@angular/core';
import { Designation } from '@features/employee-manage/data-access/models';

/**
 * DesignationNamePipe
 *
 * Pure pipe to get designation name from ID.
 * Pure pipes are only executed when their input values change,
 * making them very efficient for repeated use.
 *
 * Usage in template:
 * {{ employee.designationId | designationName: store.designations() }}
 *
 * Example:
 * {{ 1 | designationName: designations }}  →  "Senior Developer"
 * {{ 999 | designationName: designations }} →  "N/A"
 */
@Pipe({
  name: 'designationName',
  standalone: true,
  pure: true // Mark as pure for performance optimization
})
export class DesignationNamePipe implements PipeTransform {
  /**
   * Transform designation ID to designation name
   * @param designationId ID of the designation
   * @param designations Array of designations
   * @returns Designation name or 'N/A' if not found
   */
  transform(designationId: number | null | undefined, designations: Designation[] | null | undefined): string {
    // Handle null/undefined inputs
    if (!designationId || !designations || designations.length === 0) {
      return 'N/A';
    }

    // Find designation by ID
    const designation = designations.find(d => d.designationId === designationId);

    // Return name or N/A
    return designation ? designation.designationName : 'N/A';
  }
}
