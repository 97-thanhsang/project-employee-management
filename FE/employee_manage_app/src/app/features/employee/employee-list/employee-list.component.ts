import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeStore } from '@core/store/employee.store';
import { Employee, Designation } from '@core/models';

/**
 * EmployeeListComponent
 * Smart Component - chịu trách nhiệm gọi Store và hiển thị danh sách
 *
 * Features:
 * - Load danh sách nhân viên từ Store
 * - Hiển thị loading spinner
 * - Hiển thị error message
 * - Action buttons (Edit, Delete)
 * - Responsive design (Bootstrap 5)
 * - Display designation name instead of ID
 *
 * Change Detection: OnPush (performance optimization)
 */
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  store = inject(EmployeeStore);

  ngOnInit(): void {
    // Load danh sách nhân viên khi component init
    this.store.loadEmployees();
    // Load master data để có designations
    this.store.loadMasterData();
  }

  /**
   * Xóa nhân viên (với confirmation)
   * @param employeeId ID của nhân viên cần xóa
   */
  onDeleteEmployee(employeeId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      this.store.deleteEmployee(employeeId);
    }
  }

  /**
   * Select nhân viên (để hiển thị chi tiết hoặc edit)
   * @param employee Employee cần select
   */
  onSelectEmployee(employee: Employee): void {
    this.store.selectEmployee(employee);
  }

  /**
   * Get designation name from ID
   * Helper method để tìm designation name based on designationId
   * @param designationId Designation ID
   * @returns Designation name hoặc 'N/A'
   */
  getDesignationName(designationId: number): string {
    const designation = this.store.designations().find(d => d.designationId === designationId);
    return designation ? designation.designationName : 'N/A';
  }

  /**
   * Get department name from ID
   * Helper method để tìm department name based on departmentId
   * @param departmentId Department ID
   * @returns Department name hoặc 'N/A'
   */
  getDepartmentName(departmentId: number): string {
    const department = this.store.departments().find(d => d.departmentId === departmentId);
    return department ? department.departmentName : 'N/A';
  }
}
