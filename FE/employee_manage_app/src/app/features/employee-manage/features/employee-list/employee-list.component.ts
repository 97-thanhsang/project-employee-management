import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeStore } from '@features/employee-manage/store/employee.store';
import { Employee, Designation } from '@features/employee-manage/models';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { DesignationNamePipe } from '@shared/pipes';

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
  imports: [
    CommonModule,
    RouterLink,
    HasRoleDirective,
    DesignationNamePipe,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NzButtonModule,
    NzCardModule,
    NzAlertModule,
    NzDividerModule,
    NzSpinModule,
    NzEmptyModule,
    NzTooltipModule,
    NzSpaceModule
  ],
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
   * Xóa nhân viên (với SweetAlert2 confirmation)
   * @param employeeId ID của nhân viên cần xóa
   * @param employeeName Tên nhân viên (for confirmation)
   */
  onDeleteEmployee(employeeId: number, employeeName: string): void {
    Swal.fire({
      title: 'Xóa nhân viên?',
      text: `Bạn có chắc chắn muốn xóa "${employeeName}"? Hành động này không thể hoàn tác.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Có, xóa',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.store.deleteEmployee(employeeId);
      }
    });
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
