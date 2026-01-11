import { Injectable, inject, computed } from '@angular/core';
import { DesignationStore } from '../store/designation/designation.store';
import { DepartmentStore } from '../store/department/department.store';
import { CreateDesignationRequest, Designation } from '../models';

@Injectable({
    providedIn: 'root'
})
export class DesignationFacade {
    private readonly store = inject(DesignationStore);
    private readonly deptStore = inject(DepartmentStore);

    // ViewModel for Lists/Forms
    readonly viewModel = computed(() => ({
        designations: this.store.designations(),
        isLoading: this.store.isLoading(),
        error: this.store.error(),
        selectedDesignation: this.store.selectedDesignation(),
        departments: this.deptStore.departments()
    }));

    loadDesignations(): void {
        this.store.loadDesignations();
    }

    loadMasterData(): void {
        if (this.deptStore.departments().length === 0) {
            this.deptStore.loadDepartments();
        }
    }

    loadDesignationById(id: number): void {
        this.store.loadDesignationById(id);
    }

    createDesignation(payload: CreateDesignationRequest, onSuccess: () => void): void {
        this.store.addDesignation(payload, onSuccess);
    }

    updateDesignation(designationId: number, payload: CreateDesignationRequest, onSuccess: () => void): void {
        this.store.updateDesignation(designationId, payload, onSuccess);
    }

    deleteDesignation(id: number): void {
        this.store.deleteDesignation(id);
    }

    selectDesignation(designation: Designation | null): void {
        if (designation) {
            this.store.selectDesignation(designation);
        } else {
            this.store.deselectDesignation();
        }
    }
}
