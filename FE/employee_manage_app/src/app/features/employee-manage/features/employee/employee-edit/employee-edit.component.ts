import { Component, OnInit, inject, ChangeDetectionStrategy, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeStore } from '@features/employee-manage/data-access/store/employee/employee.store';
import { EmployeeFormComponent } from '../../../ui/employee/employee-form/employee-form.component';
import { CreateEmployeeRequest, UpdateEmployeeRequest, Employee } from '@features/employee-manage/data-access/models';
import { DepartmentStore } from '@features/employee-manage/data-access/store/department/department.store';
import { DesignationStore } from '@features/employee-manage/data-access/store/designation/designation.store';

@Component({
    selector: 'app-employee-edit',
    standalone: true,
    imports: [CommonModule, EmployeeFormComponent],
    template: `
    <app-employee-form
      [employee]="store.selectedEmployee()"
      [departments]="deptStore.departments()"
      [designations]="desigStore.designations()"
      [isLoading]="store.isLoading()"
      [isEditMode]="isEditMode()"
      (save)="onSave($event)"
      (cancelEdit)="onCancel()">
    </app-employee-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeEditComponent implements OnInit {
    store = inject(EmployeeStore);
    deptStore = inject(DepartmentStore);
    desigStore = inject(DesignationStore);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isEditMode = signal(false);
    employeeId: number | null = null;

    ngOnInit(): void {
        // Load master data via their respective stores
        this.deptStore.loadDepartments();
        this.desigStore.loadDesignations();

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode.set(true);
                this.employeeId = parseInt(id, 10);
                this.store.loadEmployeeById(this.employeeId);
            } else {
                this.isEditMode.set(false);
                this.store.deselectEmployee();
            }
        });
    }

    onSave(payload: CreateEmployeeRequest | UpdateEmployeeRequest): void {
        if (this.isEditMode() && this.employeeId) {
            this.store.updateEmployee(this.employeeId, payload as UpdateEmployeeRequest, () => {
                this.router.navigate(['/employee-manage/employees']);
            });
        } else {
            this.store.addEmployee(payload as CreateEmployeeRequest, () => {
                this.router.navigate(['/employee-manage/employees']);
            });
        }
    }
    onCancel(): void {
        console.log('EmployeeEditComponent: Cancel signal received, navigating...');
        // debugger;
        this.router.navigate(['/employee-manage/employees']).then(success => {
            console.log('Navigation success:', success);
        }).catch(err => {
            console.error('Navigation error:', err);
        });
    }
}
