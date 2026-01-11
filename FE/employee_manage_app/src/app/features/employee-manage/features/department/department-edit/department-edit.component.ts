import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentFacade } from '@features/employee-manage/data-access/facades/department.facade';
import { DepartmentFormComponent } from '../../../ui/department/department-form/department-form.component';
import { CreateDepartmentRequest } from '@features/employee-manage/data-access/models';

@Component({
    selector: 'app-department-edit',
    standalone: true,
    imports: [CommonModule, DepartmentFormComponent],
    template: `
    <app-department-form
      [department]="facade.viewModel().selectedDepartment"
      [isLoading]="facade.viewModel().isLoading"
      [error]="facade.viewModel().error"
      [isEditMode]="isEditMode"
      (save)="onSave($event)"
      (cancel)="onCancel()">
    </app-department-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentEditComponent implements OnInit {
    facade = inject(DepartmentFacade);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isEditMode = false;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.facade.loadDepartmentById(parseInt(id, 10));
            } else {
                this.isEditMode = false;
                this.facade.selectDepartment(null); // Clear selection for add mode
            }
        });
    }

    onSave(payload: CreateDepartmentRequest): void {
        const id = this.facade.viewModel().selectedDepartment?.departmentId;
        const onSuccess = () => this.router.navigate(['/employee-manage/departments']);

        if (this.isEditMode && id) {
            this.facade.updateDepartment(id, payload, onSuccess);
        } else {
            this.facade.createDepartment(payload, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/departments']);
    }
}
