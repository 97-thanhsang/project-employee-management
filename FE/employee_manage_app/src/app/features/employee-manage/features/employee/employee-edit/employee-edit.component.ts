import { Component, OnInit, inject, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeFacade } from '@features/employee-manage/data-access/facades/employee.facade';
import { EmployeeFormComponent } from '../../../ui/employee/employee-form/employee-form.component';
import { CreateEmployeeRequest, UpdateEmployeeRequest } from '@features/employee-manage/data-access/models';

@Component({
    selector: 'app-employee-edit',
    standalone: true,
    imports: [CommonModule, EmployeeFormComponent],
    template: `
    <app-employee-form
      [employee]="facade.formViewModel().selectedEmployee"
      [departments]="facade.formViewModel().departments"
      [designations]="facade.formViewModel().designations"
      [isLoading]="facade.formViewModel().isLoading"
      [isEditMode]="isEditMode()"
      [error]="facade.formViewModel().error"
      (save)="onSave($event)"
      (cancelEdit)="onCancel()">
    </app-employee-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEditComponent implements OnInit {
    facade = inject(EmployeeFacade);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isEditMode = signal(false);
    employeeId: number | null = null;

    // We can access ViewModel via facade.formViewModel()
    // Template needs: employee, departments, designations, isLoading, isEditMode, error
    // In template: [employee]="facade.formViewModel().selectedEmployee"

    ngOnInit(): void {
        this.facade.loadMasterData();

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode.set(true);
                this.employeeId = parseInt(id, 10);
                this.facade.loadEmployeeById(this.employeeId);
            } else {
                this.isEditMode.set(false);
                this.facade.selectEmployee(null);
            }
        });
    }

    onSave(payload: CreateEmployeeRequest | UpdateEmployeeRequest): void {
        const onSuccess = () => {
            this.router.navigate(['/employee-manage/employees']);
        };

        if (this.isEditMode() && this.employeeId) {
            this.facade.updateEmployee(this.employeeId, payload as UpdateEmployeeRequest, onSuccess);
        } else {
            this.facade.createEmployee(payload as CreateEmployeeRequest, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/employees']);
    }
}
