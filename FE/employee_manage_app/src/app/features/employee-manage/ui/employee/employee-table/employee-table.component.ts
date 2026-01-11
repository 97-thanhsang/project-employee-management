import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, Designation } from '@features/employee-manage/data-access/models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { HasRoleDirective } from '@shared/directives/has-role.directive';
import { DesignationNamePipe } from '@shared/pipes';

@Component({
    selector: 'app-employee-table',
    standalone: true,
    imports: [
        CommonModule,
        NzTableModule,
        NzTagModule,
        NzButtonModule,
        NzIconModule,
        NzSpaceModule,
        NzTooltipModule,
        HasRoleDirective,
        DesignationNamePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-table.component.html',
    styles: [`
    :host {
      display: block;
    }
    .fw-semibold {
        font-weight: 600;
    }
  `]
})
export class EmployeeTableComponent {
    @Input() employees: Employee[] = [];
    @Input() isLoading = false;
    @Input() totalCount = 0;
    @Input() designations: Designation[] = [];

    @Output() delete = new EventEmitter<{ id: number; name: string }>();
    @Output() edit = new EventEmitter<number>();

    onDelete(id: number, name: string): void {
        this.delete.emit({ id, name });
    }

    onEdit(id: number): void {
        this.edit.emit(id);
    }
}
