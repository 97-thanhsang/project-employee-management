import { Component, OnInit, inject, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, Department, Designation, CreateEmployeeRequest, UpdateEmployeeRequest } from '@features/employee-manage/data-access/models';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCardModule,
    NzSpinModule,
    NzAlertModule,
    NzIconModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit, OnChanges {
  @Input() employee: Employee | null = null;
  @Input() departments: Department[] = []; // If we need departments
  @Input() designations: Designation[] = [];
  @Input() isLoading = false;
  @Input() isEditMode = false;
  @Input() error: any = null;

  @Output() save = new EventEmitter<CreateEmployeeRequest | UpdateEmployeeRequest>();
  @Output() cancelEdit = new EventEmitter<void>();

  formBuilder = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditMode']) {
      this.updatePasswordValidators();
    }
    if (changes['employee'] && this.employee) {
      this.patchForm(this.employee);
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      designationId: ['', Validators.required],
      password: [''], // Required validation logic is dynamic
      createDate: [''],
      modifiedDate: ['']
    });

    // Dynamic validator for password
    this.updatePasswordValidators();
  }

  private updatePasswordValidators(): void {
    if (!this.form) return;
    const passwordControl = this.form.get('password');
    if (passwordControl) {
      const validators = this.isEditMode
        ? [Validators.minLength(6)]
        : [Validators.required, Validators.minLength(6)];
      passwordControl.setValidators(validators);
      passwordControl.updateValueAndValidity();
    }
  }

  private patchForm(emp: Employee): void {
    if (!this.form) return;
    this.form.patchValue({
      name: emp.name,
      email: emp.email,
      contactNo: emp.contactNo,
      address: emp.address,
      city: emp.city,
      state: emp.state,
      pincode: emp.pincode,
      designationId: emp.designationId,
      createDate: emp.createDate,
      modifiedDate: emp.modifiedDate
    });
    // Don't patch password
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
    const currentDate = new Date().toISOString();

    // Construct Payload
    // Note: The Container handles ID logic. We just pass the data structure.
    // However, to satisfy strict typing we might need to cast or form the object partially.
    // Let's assume the Container knows current ID. We send what form has.

    // Ideally we emit just the Form Value and Container maps it to Request models.
    // But to match previous logic, we can construct the object here.

    const baseData = {
      name: formValue.name,
      email: formValue.email,
      contactNo: formValue.contactNo,
      address: formValue.address,
      city: formValue.city,
      state: formValue.state,
      pincode: formValue.pincode,
      designationId: formValue.designationId,
      password: formValue.password,
      createDate: this.isEditMode ? formValue.createDate : currentDate,
      modifiedDate: currentDate
    };

    if (this.isEditMode) {
      // Update Payload
      const updatePayload: UpdateEmployeeRequest = {
        employeeId: this.employee?.employeeId || 0,
        ...baseData
      };
      // Remove password if empty in update (needs simple checks or container logic). 
      // But interface expects it optional.
      if (!baseData.password) delete updatePayload.password;

      this.save.emit(updatePayload);
    } else {
      // Create Payload
      const createPayload: CreateEmployeeRequest = {
        employeeId: 0,
        ...baseData
      };
      this.save.emit(createPayload);
    }
  }

  handleCancel(): void {
    console.log('EmployeeFormComponent: Cancel clicked, emitting cancelEdit');
    this.cancelEdit.emit();
  }

  // Helpers for template
  hasError(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }
}
