import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationStore } from '@features/employee-manage/data-access/store/designation/designation.store';
import { DepartmentStore } from '@features/employee-manage/data-access/store/department/department.store';
import { DesignationFormComponent } from '../../../ui/designation/designation-form/designation-form.component';
import { CreateDesignationRequest } from '@features/employee-manage/data-access/models';

@Component({
    selector: 'app-designation-edit',
    standalone: true,
    imports: [CommonModule, DesignationFormComponent],
    template: `
    <app-designation-form
      [designation]="store.selectedDesignation()"
      [departments]="departmentStore.departments()"
      [isLoading]="store.isLoading()"
      [isEditMode]="isEditMode"
      [error]="store.error()"
      (save)="onSave($event)"
      (cancel)="onCancel()">
    </app-designation-form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignationEditComponent implements OnInit {
    store = inject(DesignationStore);
    departmentStore = inject(DepartmentStore);
    route = inject(ActivatedRoute);
    router = inject(Router);

    isEditMode = false;
    designationId: number | null = null;

    ngOnInit(): void {

        // Load departments
        if (this.departmentStore.departments().length === 0) {
            this.departmentStore.loadDepartments();
        }

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.designationId = parseInt(id, 10);
                this.store.loadDesignationById(this.designationId);
            } else {
                this.store.deselectDesignation();
            }
        });
    }

    onSave(payload: CreateDesignationRequest): void {
        const onSuccess = () => {
            this.router.navigate(['/employee-manage/designations']);
        };

        if (this.isEditMode && this.designationId) {
            // Note: Update Logic needs ID but payload usually just has data.
            // DesignationStore.updateDesignation signature: (id, payload, cb)
            this.store.updateDesignation(this.designationId, payload, onSuccess);
        } else {
            this.store.addDesignation(payload, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/designations']);
    }
}
