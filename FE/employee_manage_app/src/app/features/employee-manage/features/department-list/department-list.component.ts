import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartmentStore } from '@features/employee-manage/store/department.store';
import { Department } from '@features/employee-manage/models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { HasRoleDirective } from '@shared/directives/has-role.directive';

@Component({
    selector: 'app-department-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        HasRoleDirective,
        NzTableModule,
        NzButtonModule,
        NzIconModule,
        NzCardModule,
        NzAlertModule,
        NzEmptyModule,
        NzTagModule,
        NzTooltipModule,
        NzSpaceModule
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

    ngOnInit(): void {
        this.store.loadDepartments();
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
