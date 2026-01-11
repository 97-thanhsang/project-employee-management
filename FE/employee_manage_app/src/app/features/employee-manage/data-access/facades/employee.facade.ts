import { Injectable, inject, computed, signal } from '@angular/core';
import { EmployeeStore } from '../store/employee/employee.store';
import { DepartmentStore } from '../store/department/department.store';
import { DesignationStore } from '../store/designation/designation.store';
import { CreateEmployeeRequest, UpdateEmployeeRequest, Employee } from '../models';

@Injectable({
    providedIn: 'root'
})
export class EmployeeFacade {
    private readonly store = inject(EmployeeStore);
    private readonly deptStore = inject(DepartmentStore);
    private readonly desigStore = inject(DesignationStore);

    // Local View State (since Store doesn't expose these currently)
    private readonly _pageIndex = signal(1);
    private readonly _pageSize = signal(10);
    private readonly _searchTerm = signal('');

    // ViewModel for Lists
    readonly listViewModel = computed(() => ({
        employees: this.store.employees(),
        totalRequest: this.store.totalCount(), // Corrected from totalRequest
        pageIndex: this._pageIndex(),
        pageSize: this._pageSize(),
        isLoading: this.store.isLoading(),
        error: this.store.error()
    }));

    // ViewModel for Forms (Edit/Add)
    readonly formViewModel = computed(() => ({
        selectedEmployee: this.store.selectedEmployee(),
        departments: this.deptStore.departments(),
        designations: this.desigStore.designations(),
        isLoading: this.store.isLoading(),
        error: this.store.error()
    }));

    // Exposed Signals for List Helpers
    readonly departments = this.deptStore.departments;
    readonly designations = this.desigStore.designations;

    // Actions
    loadEmployees(pageIndex: number, pageSize: number): void {
        this._pageIndex.set(pageIndex);
        this._pageSize.set(pageSize);
        this.store.loadEmployees(this._searchTerm(), 'name', 'asc', pageIndex, pageSize);
    }

    loadMasterData(): void {
        if (this.deptStore.departments().length === 0) {
            this.deptStore.loadDepartments();
        }
        if (this.desigStore.designations().length === 0) {
            this.desigStore.loadDesignations();
        }
    }

    loadEmployeeById(id: number): void {
        this.store.loadEmployeeById(id);
    }

    /**
     * Selects an employee to view details (e.g. from list)
     */
    selectEmployee(employee: Employee | null): void {
        if (employee) {
            this.store.selectEmployee(employee);
        } else {
            this.store.deselectEmployee();
        }
    }

    createEmployee(payload: CreateEmployeeRequest, onSuccess: () => void): void {
        this.store.addEmployee(payload, onSuccess);
    }

    updateEmployee(id: number, payload: UpdateEmployeeRequest, onSuccess: () => void): void {
        this.store.updateEmployee(id, payload, onSuccess);
    }

    deleteEmployee(id: number): void {
        this.store.deleteEmployee(id);
    }

    search(term: string): void {
        this._searchTerm.set(term);
        this._pageIndex.set(1); // Reset to first page
        this.store.loadEmployees(term, 'name', 'asc', 1, this._pageSize());
    }

    clearError(): void {
        this.store.clearError();
    }
}
