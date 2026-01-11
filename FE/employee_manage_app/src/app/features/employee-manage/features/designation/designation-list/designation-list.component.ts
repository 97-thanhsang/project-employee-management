import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Designation } from '@features/employee-manage/data-access/models';
import { DesignationFacade } from '@features/employee-manage/data-access/facades/designation.facade';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DesignationTableComponent } from '../../../ui/designation/designation-table/designation-table.component';

@Component({
    selector: 'app-designation-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        NzButtonModule,
        NzIconModule,
        NzCardModule,
        NzAlertModule,
        NzEmptyModule,
        DesignationTableComponent
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
    facade = inject(DesignationFacade);
    router = inject(Router);

    ngOnInit(): void {
        this.facade.loadDesignations();
        this.facade.loadMasterData();
    }

    onEdit(id: number): void {
        this.router.navigate(['/employee-manage/designations', id, 'edit']);
    }

    onDelete(event: { id: number; name: string }): void {
        this.onDeleteDesignation(event.id, event.name);
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
                this.facade.deleteDesignation(id);
            }
        });
    }

    onSelectDesignation(designation: Designation): void {
        this.facade.selectDesignation(designation);
    }
}
