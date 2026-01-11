import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // Add Router
import Swal from 'sweetalert2';
import { DepartmentStore } from '@features/employee-manage/data-access/store/department/department.store';
import { Department } from '@features/employee-manage/data-access/models';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DepartmentTableComponent } from '../../../ui/department/department-table/department-table.component';

@Component({
    selector: 'app-department-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        NzButtonModule,
        NzIconModule,
        NzCardModule,
        NzAlertModule,
        NzEmptyModule,
        DepartmentTableComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './department-list.component.html',
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class DepartmentListComponent implements OnInit {
    store = inject(DepartmentStore);
    router = inject(Router);

    ngOnInit(): void {
        this.store.loadDepartments();
    }

    onEdit(id: number): void {
        this.router.navigate(['/employee-manage/departments', id, 'edit']);
    }

    onDelete(event: { id: number; name: string }): void {
        this.onDeleteDepartment(event.id, event.name);
    }

    onDeleteDepartment(id: number, name: string): void {
        Swal.fire({
            title: 'Xóa phòng ban?',
            text: `Bạn có chắc chắn muốn xóa phòng ban "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Có, xóa',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        }).then((result: any) => {
            if (result.isConfirmed) {
                this.store.deleteDepartment(id);
            }
        });
    }

    onSelectDepartment(department: Department): void {
        this.store.selectDepartment(department);
    }
}
