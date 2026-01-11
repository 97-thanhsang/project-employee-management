import { Injectable, inject, computed } from '@angular/core';
import { DepartmentStore } from '../store/department/department.store';
import { CreateDepartmentRequest, Department } from '../models';

@Injectable({
    providedIn: 'root'
})
export class DepartmentFacade {
    private readonly store = inject(DepartmentStore);

    // ViewModel for List/Form
    readonly viewModel = computed(() => ({
        departments: this.store.departments(),
        selectedDepartment: this.store.selectedDepartment(),
        isLoading: this.store.isLoading(),
        error: this.store.error(),
        isEditMode: !!this.store.selectedDepartment()
    }));

    // Actions
    loadDepartments(): void {
        this.store.loadDepartments();
    }

    loadDepartmentById(id: number): void {
        this.store.loadDepartmentById(id);
    }

    createDepartment(payload: CreateDepartmentRequest, onSuccess?: () => void): void {
        this.store.addDepartment(payload, onSuccess);
    }

    updateDepartment(id: number, payload: CreateDepartmentRequest, onSuccess?: () => void): void {
        this.store.updateDepartment(id, payload, onSuccess);
    }

    deleteDepartment(id: number): void {
        this.store.deleteDepartment(id);
    }

    selectDepartment(department: Department | null): void {
        if (department) {
            this.store.selectDepartment(department);
        } else {
            this.store.selectDepartment(null);
        }
    }

    clearError(): void {
        this.store.clearError();
    }
}
