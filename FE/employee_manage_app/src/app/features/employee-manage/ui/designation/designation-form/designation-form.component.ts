import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DesignationStore } from '@features/employee-manage/store/designation.store';
import { DepartmentStore } from '@features/employee-manage/store/department.store';
import { CreateDesignationRequest } from '@features/employee-manage/models';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-designation-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzCardModule,
        NzSelectModule,
        NzSpinModule,
        NzAlertModule,
        NzIconModule
    ],
    templateUrl: './designation-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignationFormComponent implements OnInit {
    store = inject(DesignationStore);
    departmentStore = inject(DepartmentStore);
    formBuilder = inject(FormBuilder);
    router = inject(Router);
    route = inject(ActivatedRoute);

    form!: FormGroup;
    isEditMode = false;
    designationId: number | null = null;

    ngOnInit(): void {
        this.initializeForm();

        // Load departments for the dropdown
        if (this.departmentStore.departments().length === 0) {
            this.departmentStore.loadDepartments();
        }

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.designationId = parseInt(id, 10);
                this.loadDesignationForEdit(this.designationId);
            }
        });
    }

    private initializeForm(): void {
        this.form = this.formBuilder.group({
            designationName: ['', [Validators.required, Validators.minLength(2)]],
            departmentId: [null, [Validators.required]]
        });
    }

    private loadDesignationForEdit(id: number): void {
        this.store.loadDesignationById(id);

        // Timeout to wait for signal update (simple approach)
        setTimeout(() => {
            const selected = this.store.selectedDesignation();
            if (selected) {
                this.form.patchValue({
                    designationName: selected.designationName,
                    departmentId: selected.departmentId
                });
            }
        }, 500);
    }

    onSubmit(): void {
        if (!this.form.valid || this.store.isCreating() || this.store.isUpdating()) {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
            return;
        }

        const formValue = this.form.value;
        const payload: CreateDesignationRequest = {
            designationName: formValue.designationName,
            departmentId: formValue.departmentId
        };

        const onSuccess = () => {
            this.router.navigate(['/employee-manage/designations']);
        };

        if (this.isEditMode && this.designationId) {
            this.store.updateDesignation(this.designationId, payload, onSuccess);
        } else {
            this.store.addDesignation(payload, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/designations']);
    }
}
