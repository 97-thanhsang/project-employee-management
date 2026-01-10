import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { DesignationStore } from '@features/employee-manage/store/designation.store';
import { DepartmentStore } from '@features/employee-manage/store/department.store';
import { DepartmentNamePipe } from '@shared/pipes/department-name.pipe';
import { Designation } from '@features/employee-manage/models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { HasRoleDirective } from '@shared/directives/has-role.directive';

@Component({
    selector: 'app-designation-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        HasRoleDirective,
        DepartmentNamePipe,
        NzTableModule,
        NzButtonModule,
        NzIconModule,
        NzCardModule,
        NzAlertModule,
        NzEmptyModule,
        NzTooltipModule,
        NzSpaceModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './designation-list.component.html',
    styles: [`
    :host {
      display: block;
    }
  `]
})
export class DesignationListComponent implements OnInit {
    store = inject(DesignationStore);
    departmentStore = inject(DepartmentStore);

    ngOnInit(): void {
        this.store.loadDesignations();
        // Ensure departments are loaded for the pipe to resolve names
        if (!this.departmentStore.hasDepartments()) {
            this.departmentStore.loadDepartments();
        }
    }

    onDeleteDesignation(id: number, name: string): void {
        Swal.fire({
            title: 'Xóa chức danh?',
            text: `Bạn có chắc chắn muốn xóa chức danh "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Có, xóa',
            cancelButtonText: 'Hủy',
            reverseButtons: true
        }).then((result: any) => {
            if (result.isConfirmed) {
                this.store.deleteDesignation(id);
            }
        });
    }

    onSelectDesignation(designation: Designation): void {
        this.store.selectDesignation(designation);
    }
}
