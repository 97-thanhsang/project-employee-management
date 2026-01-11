import { Component, OnInit, inject, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateDesignationRequest, Department, Designation } from '@features/employee-manage/data-access/models';
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
export class DesignationFormComponent implements OnInit, OnChanges {
    @Input() designation: Designation | null = null;
    @Input() departments: Department[] = [];
    @Input() isLoading = false;
    @Input() isEditMode = false;
    @Input() error: any = null;

    @Output() save = new EventEmitter<CreateDesignationRequest>();
    @Output() cancel = new EventEmitter<void>();

    formBuilder = inject(FormBuilder);
    form!: FormGroup;

    ngOnInit(): void {
        this.initializeForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['designation'] && this.designation) {
            this.patchForm(this.designation);
        }
    }

    private initializeForm(): void {
        this.form = this.formBuilder.group({
            designationName: ['', [Validators.required, Validators.minLength(2)]],
            departmentId: [null, [Validators.required]]
        });
    }

    private patchForm(des: Designation): void {
        if (!this.form) return;
        this.form.patchValue({
            designationName: des.designationName,
            departmentId: des.departmentId
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
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

        this.save.emit(payload);
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
