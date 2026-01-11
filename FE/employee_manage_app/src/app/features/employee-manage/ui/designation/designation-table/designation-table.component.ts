import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Designation, Department, DesignationViewModel } from '@features/employee-manage/data-access/models';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { HasRoleDirective } from '@shared/directives/has-role.directive';

@Component({
    selector: 'app-designation-table',
    standalone: true,
    imports: [
        CommonModule,
        NzTableModule,
        NzButtonModule,
        NzIconModule,
        NzSpaceModule,
        NzTooltipModule,
        HasRoleDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './designation-table.component.html',
    styles: [`
    :host {
      display: block;
    }
    .fw-semibold {
        font-weight: 600;
    }
  `]
})
export class DesignationTableComponent {
    @Input() designations: DesignationViewModel[] = [];
    @Input() departments: Department[] = [];
    @Input() isLoading = false;

    @Output() delete = new EventEmitter<{ id: number; name: string }>();
    @Output() edit = new EventEmitter<number>();

    onDelete(id: number, name: string): void {
        this.delete.emit({ id, name });
    }

    onEdit(id: number): void {
        this.edit.emit(id);
    }
}
