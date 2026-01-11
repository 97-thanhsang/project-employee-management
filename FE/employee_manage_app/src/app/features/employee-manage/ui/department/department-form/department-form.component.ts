import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, CreateDepartmentRequest } from '@features/employee-manage/data-access/models';
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
export class DepartmentFormComponent implements OnInit, OnChanges {
    @Input() department: Department | null = null;
    @Input() isLoading = false;
    @Input() error: any = null;
    @Input() isEditMode = false;
    @Output() save = new EventEmitter<CreateDepartmentRequest>();
    @Output() cancel = new EventEmitter<void>();

    formBuilder = inject(FormBuilder);
    form!: FormGroup;

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['department'] && this.form) {
            if (this.department) {
                this.form.patchValue({
                    departmentName: this.department.departmentName,
                    isActive: this.department.isActive
                });
            } else {
                this.form.reset({ isActive: true });
            }
        }
    }

    private initializeForm(): void {
        this.form = this.formBuilder.group({
            departmentName: ['', [Validators.required, Validators.minLength(2)]],
            isActive: [true]
        });
    }

    onSubmit(): void {
        if (this.form.valid && !this.isLoading) {
            this.save.emit(this.form.value);
        }
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
