import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { EmployeeStore } from '../../../store/employee.store';
import { CreateEmployeeRequest, UpdateEmployeeRequest } from '../../../models';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  // Inject dependencies
  store = inject(EmployeeStore);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);

  // Form & Mode
  form!: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;

  // Track submit state
  isSubmitting = false;

  ngOnInit(): void {
    // Initialize form
    this.initializeForm();

    // Load master data (departments, designations)
    this.store.loadMasterData();

    // Check if edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = parseInt(id, 10);
        this.loadEmployeeForEdit(this.employeeId);
      }
    });
  }

  /**
   * Initialize reactive form with validators
   */
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
      password: ['', [Validators.required, Validators.minLength(6)]], // Required for create, optional for update,
      createDate: [''],
      modifiedDate: ['']
    });
  }

  /**
   * Load existing employee data for edit mode
   * @param employeeId Employee ID
   */
  private loadEmployeeForEdit(employeeId: number): void {
    this.store.loadEmployeeById(employeeId);

    // After employee is loaded, patch form with the data
    // Use a small timeout to ensure the signal has updated
    setTimeout(() => {
      const selectedEmployee = this.store.selectedEmployee();
      if (selectedEmployee) {
        this.form.patchValue({
          employeeId: selectedEmployee.employeeId,
          name: selectedEmployee.name,
          email: selectedEmployee.email,
          contactNo: selectedEmployee.contactNo,
          address: selectedEmployee.address,
          city: selectedEmployee.city,
          state: selectedEmployee.state,
          pincode: selectedEmployee.pincode,
          designationId: selectedEmployee.designationId,
          createDate: selectedEmployee.createDate,
          modifiedDate: selectedEmployee.modifiedDate
        });
      }
    }, 500);
  }

  /**
   * Submit form (Create or Update)
   */
  onSubmit(): void {
    if (!this.form.valid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    const formValue = this.form.value;
    const currentDate = new Date().toISOString(); // ISO format: 2024-01-10T12:30:45.123Z

    if (this.isEditMode && this.employeeId) {
      const selectedEmployee = this.store.selectedEmployee();
      // Update mode (password optional)
      const updatePayload: UpdateEmployeeRequest = {
        employeeId: this.employeeId,
        name: formValue.name,
        email: formValue.email,
        contactNo: formValue.contactNo,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        pincode: formValue.pincode,
        designationId: formValue.designationId,
        createDate: formValue.createDate,
        modifiedDate: currentDate // Set to current date when updating
      };

      // Only include password if provided
      if (formValue.password) {
        updatePayload.password = formValue.password;
      }

      this.store.updateEmployee(this.employeeId, updatePayload);
    } else {
      // Create mode (password required)
      const createPayload: CreateEmployeeRequest = {
        employeeId: 0, // Backend sẽ gán ID
        name: formValue.name,
        email: formValue.email,
        contactNo: formValue.contactNo,
        address: formValue.address,
        city: formValue.city,
        state: formValue.state,
        pincode: formValue.pincode,
        designationId: formValue.designationId,
        password: formValue.password,
        createDate: currentDate, // Set to current date when creating
        modifiedDate: currentDate  // Set to current date when creating
      };

      this.store.addEmployee(createPayload);
    }

    // Reset submitting state and navigate back
    setTimeout(() => {
      this.isSubmitting = false;
      this.router.navigate(['/employees']);
    }, 1000);
  }

  /**
   * Go back to employee list
   */
  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  /**
   * Helper to check if form control has error
   * @param controlName Form control name
   * @param errorType Error type (required, email, minLength, etc.)
   * @returns boolean
   */
  hasError(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.hasError(errorType) && (control.dirty || control.touched));
  }

  /**
   * Helper to get form control
   * @param controlName Form control name
   * @returns Form control
   */
  getControl(controlName: string) {
    return this.form.get(controlName);
  }
}
