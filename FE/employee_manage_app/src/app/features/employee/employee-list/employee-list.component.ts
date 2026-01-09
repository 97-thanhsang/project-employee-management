import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmployeeStore } from '@core/store/employee.store';
import { Employee } from '@core/models';

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
}
