import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '@features/employee-manage/data-access/models';
import { EmployeeFacade } from '@features/employee-manage/data-access/facades/employee.facade';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import Swal from 'sweetalert2';
import { EmployeeTableComponent } from '../../../ui/employee/employee-table/employee-table.component';

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
    NzIconModule,
    NzTagModule,
    NzButtonModule,
    NzCardModule,
    NzAlertModule,
    NzDividerModule,
    NzSpinModule,
    NzEmptyModule,
    EmployeeTableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  facade = inject(EmployeeFacade);
  router = inject(Router);

  ngOnInit(): void {
    // Facade orchestrates loading employees and master data
    this.facade.loadEmployees(1, 10);
    this.facade.loadMasterData();
  }

  onEdit(id: number): void {
    this.router.navigate(['/employee-manage/employees', id, 'edit']);
  }

  onDelete(event: { id: number; name: string }): void {
    this.onDeleteEmployee(event.id, event.name);
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
        this.facade.deleteEmployee(employeeId);
      }
    });
  }

  /**
   * Select nhân viên (để hiển thị chi tiết hoặc edit)
   * @param employee Employee cần select
   */
  onSelectEmployee(employee: Employee): void {
    this.facade.selectEmployee(employee);
  }

  /**
   * Get designation name from ID
   * Helper method để tìm designation name based on designationId
   * @param designationId Designation ID
   * @returns Designation name hoặc 'N/A'
   */
  getDesignationName(designationId: number): string {
    const designation = this.facade.designations().find(d => d.designationId === designationId);
    return designation ? designation.designationName : 'N/A';
  }

  getDepartmentName(departmentId: number): string {
    const department = this.facade.departments().find(d => d.departmentId === departmentId);
    return department ? department.departmentName : 'N/A';
  }
}
