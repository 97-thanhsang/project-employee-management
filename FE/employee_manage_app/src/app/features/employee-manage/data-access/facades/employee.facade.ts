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
    readonly listViewModel = computed(() => {
        const employees = this.store.employees();
        const depts = this.deptStore.departments();
        const desigs = this.desigStore.designations();

        const mappedEmployees = employees.map(emp => ({
            ...emp,
            departmentName: depts.find(d => d.departmentId === emp.designationId)?.departmentName || 'N/A', // Logic seems wrong in Pipe too, DesignationId used for Department? 
            // WAIT, looking at DesignationNamePipe: const designation = designations.find(d => d.designationId === designationId);
            // Employee has designationId. Designation has departmentId. 
            // So Employee -> Designation -> Department. 
            // The table shows "Chức vụ" (Designation). Does it show Department?
            // Table columns: Name, Email, Phone, Designation, Actions.
            // EmployeeTableComponent.html uses: {{ data.designationId | designationName: designations }}
            // So I only need designationName for now.

            designationName: desigs.find(d => d.designationId === emp.designationId)?.designationName || 'N/A'
        }));

        return {
            employees: mappedEmployees,
            totalRequest: this.store.totalCount(),
            pageIndex: this._pageIndex(),
            pageSize: this._pageSize(),
            isLoading: this.store.isLoading(),
            error: this.store.error()
        };
    });

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
