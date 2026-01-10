import { Injectable, NgZone, computed, signal, WritableSignal } from '@angular/core';
import { Designation, CreateDesignationRequest } from '../models/designation.model';
import { DesignationService } from '../services/designation.service';
import { ToastrService } from 'ngx-toastr';
import { AppError } from '@core/models/app-error.model';
import { mapToAppError } from '@core/utils/error.utils';

/**
 * Designation State Interface
 */
interface DesignationState {
    designations: Designation[];
    loading: boolean;
    error: AppError | null;
    selectedDesignation: Designation | null;
}

@Injectable({
    providedIn: 'root'
})
export class DesignationStore {
    // ============= INTERNAL STATE SIGNALS =============
    private designationsSignal: WritableSignal<Designation[]> = signal([]);
    private loadingSignal: WritableSignal<boolean> = signal(false);
    private errorSignal: WritableSignal<AppError | null> = signal(null);
    private selectedDesignationSignal: WritableSignal<Designation | null> = signal(null);

    // Granular Loading States
    private isCreatingSignal: WritableSignal<boolean> = signal(false);
    private isUpdatingSignal: WritableSignal<boolean> = signal(false);
    private isDeletingSignal: WritableSignal<boolean> = signal(false);

    // ============= COMPUTED SIGNALS =============
    readonly designations = computed(() => this.designationsSignal());
    readonly selectedDesignation = computed(() => this.selectedDesignationSignal());
    readonly error = computed(() => this.errorSignal());

    readonly isLoading = computed(() =>
        this.loadingSignal() ||
        this.isCreatingSignal() ||
        this.isUpdatingSignal() ||
        this.isDeletingSignal()
    );

    readonly isCreating = computed(() => this.isCreatingSignal());
    readonly isUpdating = computed(() => this.isUpdatingSignal());
    readonly isDeleting = computed(() => this.isDeletingSignal());

    readonly hasDesignations = computed(() => this.designationsSignal().length > 0);

    constructor(
        private designationService: DesignationService,
        private toastrService: ToastrService,
        private ngZone: NgZone
    ) { }

    // ============= ACTIONS =============

    /**
     * Load all designations
     */
    loadDesignations(): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.designationService.getAllDesignations().subscribe({
            next: (response) => {
                this.ngZone.run(() => {
                    this.designationsSignal.set(response.data || []);
                    this.loadingSignal.set(false);
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    this.errorSignal.set(mapToAppError(err, 'Failed to load designations'));
                    this.loadingSignal.set(false);
                });
            }
        });
    }

    /**
     * Get designation by ID
     */
    loadDesignationById(id: number): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.designationService.getDesignationById(id).subscribe({
            next: (response) => {
                this.ngZone.run(() => {
                    this.selectedDesignationSignal.set(response.data);
                    this.loadingSignal.set(false);
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    this.errorSignal.set(mapToAppError(err, 'Failed to load designation details'));
                    this.loadingSignal.set(false);
                });
            }
        });
    }

    /**
     * Create new designation
     */
    addDesignation(designation: CreateDesignationRequest, onSuccess?: () => void): void {
        this.isCreatingSignal.set(true);
        this.errorSignal.set(null);

        // Cast payload for compatibility if needed. The service expects Designation.
        // CreateDesignationRequest matches usually, but 'designationId' might be missing.
        // We assume backend assigns ID.
        const payload = { ...designation, designationId: 0 } as Designation;

        this.designationService.createDesignation(payload).subscribe({
            next: (response) => {
                const current = this.designationsSignal();
                this.designationsSignal.set([...current, response.data]);
                this.isCreatingSignal.set(false);
                this.toastrService.success('Chức danh mới đã được tạo!', 'Thành công');
                if (onSuccess) onSuccess();
            },
            error: (err) => {
                const errorObj = mapToAppError(err, 'Không thể tạo chức danh');
                this.errorSignal.set(errorObj);
                this.isCreatingSignal.set(false);
                this.toastrService.error(errorObj.message, 'Lỗi');
            }
        });
    }

    /**
     * Update designation
     */
    updateDesignation(id: number, designation: CreateDesignationRequest, onSuccess?: () => void): void {
        this.isUpdatingSignal.set(true);
        this.errorSignal.set(null);

        const payload = { ...designation, designationId: id } as Designation;

        this.designationService.updateDesignation(id, payload).subscribe({
            next: (response) => {
                const current = this.designationsSignal();
                const updated = current.map(d => d.designationId === id ? response.data : d);
                this.designationsSignal.set(updated);

                const selected = this.selectedDesignationSignal();
                if (selected && selected.designationId === id) {
                    this.selectedDesignationSignal.set(response.data);
                }

                this.isUpdatingSignal.set(false);
                this.toastrService.success('Cập nhật chức danh thành công!', 'Thành công');
                if (onSuccess) onSuccess();
            },
            error: (err) => {
                const errorObj = mapToAppError(err, 'Không thể cập nhật chức danh');
                this.errorSignal.set(errorObj);
                this.isUpdatingSignal.set(false);
                this.toastrService.error(errorObj.message, 'Lỗi');
            }
        });
    }

    /**
     * Delete designation
     */
    deleteDesignation(id: number): void {
        this.isDeletingSignal.set(true);
        this.errorSignal.set(null);

        this.designationService.deleteDesignation(id).subscribe({
            next: () => {
                const current = this.designationsSignal();
                const filtered = current.filter(d => d.designationId !== id);
                this.designationsSignal.set(filtered);

                const selected = this.selectedDesignationSignal();
                if (selected && selected.designationId === id) {
                    this.selectedDesignationSignal.set(null);
                }

                this.isDeletingSignal.set(false);
                this.toastrService.success('Đã xóa chức danh!', 'Thành công');
            },
            error: (err) => {
                const errorObj = mapToAppError(err, 'Không thể xóa chức danh');
                this.errorSignal.set(errorObj);
                this.isDeletingSignal.set(false);
                this.toastrService.error(errorObj.message, 'Lỗi');
            }
        });
    }

    clearError(): void {
        this.errorSignal.set(null);
    }

    selectDesignation(designation: Designation): void {
        this.selectedDesignationSignal.set(designation);
    }
}
