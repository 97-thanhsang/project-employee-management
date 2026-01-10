import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { DepartmentStore } from '@features/employee-manage/store/department.store';
import { CreateDepartmentRequest } from '@features/employee-manage/models';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
    selector: 'app-department-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzCardModule,
        NzSpinModule,
        NzAlertModule,
        NzIconModule,
        NzCheckboxModule
    ],
    templateUrl: './department-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentFormComponent implements OnInit {
    store = inject(DepartmentStore);
    formBuilder = inject(FormBuilder);
    router = inject(Router);
    route = inject(ActivatedRoute);

    form!: FormGroup;
    isEditMode = false;
    departmentId: number | null = null;

    ngOnInit(): void {
        this.initializeForm();

        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.departmentId = parseInt(id, 10);
                this.loadDepartmentForEdit(this.departmentId);
            }
        });
    }

    private initializeForm(): void {
        this.form = this.formBuilder.group({
            departmentName: ['', [Validators.required, Validators.minLength(2)]],
            isActive: [true]
        });
    }

    private loadDepartmentForEdit(id: number): void {
        this.store.loadDepartmentById(id);

        // Timeout to wait for signal update (simple approach)
        setTimeout(() => {
            const selected = this.store.selectedDepartment();
            if (selected) {
                this.form.patchValue({
                    departmentName: selected.departmentName,
                    isActive: selected.isActive
                });
            }
        }, 500);
    }

    onSubmit(): void {
        if (!this.form.valid || this.store.isCreating() || this.store.isUpdating()) {
            return;
        }

        const formValue = this.form.value;
        const payload: CreateDepartmentRequest = {
            departmentName: formValue.departmentName,
            isActive: formValue.isActive
        };

        const onSuccess = () => {
            this.router.navigate(['/employee-manage/departments']);
        };

        if (this.isEditMode && this.departmentId) {
            this.store.updateDepartment(this.departmentId, payload, onSuccess);
        } else {
            this.store.addDepartment(payload, onSuccess);
        }
    }

    onCancel(): void {
        this.router.navigate(['/employee-manage/departments']);
    }
}
