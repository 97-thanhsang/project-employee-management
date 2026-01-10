import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentStore } from '@features/employee-manage/data-access/store/department/department.store';
import { DepartmentFormComponent } from '../../../ui/department/department-form/department-form.component';
import { CreateDepartmentRequest } from '@features/employee-manage/data-access/models';

@Component({
    selector: 'app-department-edit',
    standalone: true,
    imports: [CommonModule, DepartmentFormComponent],
    template: `
    <app-department-form
      [department]="store.selectedDepartment()"
      [isLoading]="store.isLoading()"
      [error]="store.error()"
      [isEditMode]="isEditMode"
      (save)="onSave($event)"
      (cancel)="onCancel()">
    </app-department-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentEditComponent implements OnInit {
    store = inject(DepartmentStore);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isEditMode = false;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.store.loadDepartmentById(parseInt(id, 10));
            } else {
                this.isEditMode = false;
                this.store.selectDepartment(null); // Clear selection for add mode
            }
        });
    }

    onSave(payload: CreateDepartmentRequest): void {
        const id = this.store.selectedDepartment()?.departmentId;
        const onSuccess = () => this.router.navigate(['/employee-manage/departments']);

        if (this.isEditMode && id) {
            this.store.updateDepartment(id, payload, onSuccess);
        } else {
            this.store.addDepartment(payload, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/departments']);
    }
}
