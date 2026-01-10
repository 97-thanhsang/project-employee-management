import { Injectable, NgZone, Injector, computed, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppError } from '@core/models/app-error.model';
import { mapToAppError } from '@core/utils/error.utils';
import { CreateDepartmentRequest, Department } from '../../models';
import { DepartmentService } from '../../services/department/department.service';

/**
 * Department State Interface
 */
interface DepartmentState {
    departments: Department[];
    loading: boolean;
    error: AppError | null;
    selectedDepartment: Department | null;
}

@Injectable({
    providedIn: 'root'
})
export class DepartmentStore {
    // ============= INTERNAL STATE SIGNALS =============
    private departmentsSignal: WritableSignal<Department[]> = signal([]);
    private loadingSignal: WritableSignal<boolean> = signal(false);
    private errorSignal: WritableSignal<AppError | null> = signal(null);
    private selectedDepartmentSignal: WritableSignal<Department | null> = signal(null);

    // Granular Loading States
    private isCreatingSignal: WritableSignal<boolean> = signal(false);
    private isUpdatingSignal: WritableSignal<boolean> = signal(false);
    private isDeletingSignal: WritableSignal<boolean> = signal(false);

    // ============= COMPUTED SIGNALS =============
    readonly departments = computed(() => this.departmentsSignal());
    readonly selectedDepartment = computed(() => this.selectedDepartmentSignal());
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

    // Helper computed
    readonly hasDepartments = computed(() => this.departmentsSignal().length > 0);

    constructor(
        private departmentService: DepartmentService,
        private toastrService: ToastrService,
        private ngZone: NgZone
    ) { }

    // ============= ACTIONS =============

    /**
     * Load all departments
     */
    loadDepartments(): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.departmentService.getAllDepartments().subscribe({
            next: (response) => {
                this.ngZone.run(() => {
                    this.departmentsSignal.set(response.data || []);
                    this.loadingSignal.set(false);
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    this.errorSignal.set(mapToAppError(err, 'Failed to load departments'));
                    this.loadingSignal.set(false);
                });
            }
        });
    }

    /**
     * Get department by ID
     */
    loadDepartmentById(id: number): void {
        this.loadingSignal.set(true);
        this.errorSignal.set(null);

        this.departmentService.getDepartmentById(id).subscribe({
            next: (response) => {
                this.ngZone.run(() => {
                    this.selectedDepartmentSignal.set(response.data);
                    this.loadingSignal.set(false);
                });
            },
            error: (err) => {
                this.ngZone.run(() => {
                    this.errorSignal.set(mapToAppError(err, 'Failed to load department details'));
                    this.loadingSignal.set(false);
                });
            }
        });
    }

    /**
     * Create new department
     */
    addDepartment(department: CreateDepartmentRequest, onSuccess?: () => void): void {
        this.isCreatingSignal.set(true);
        this.errorSignal.set(null);

        // Cast CreateDepartmentRequest to Department because service expects Department interface
        // Ideally service should accept CreateDepartmentRequest, but for now we follow existing structure
        // Assuming 'departmentId' is ignored by backend on create
        const payload = { ...department, departmentId: 0 } as Department;

        this.departmentService.createDepartment(payload).subscribe({
            next: (response) => {
                const current = this.departmentsSignal();
                this.departmentsSignal.set([...current, response.data]);
                this.isCreatingSignal.set(false);
                this.toastrService.success('Phòng ban mới đã được tạo!', 'Thành công');
                if (onSuccess) onSuccess();
            },
            error: (err) => {
                const errorObj = mapToAppError(err, 'Không thể tạo phòng ban');
                this.errorSignal.set(errorObj);
                this.isCreatingSignal.set(false);
                this.toastrService.error(errorObj.message, 'Lỗi');
            }
        });
    }

    /**
     * Update department
     */
    updateDepartment(id: number, department: CreateDepartmentRequest, onSuccess?: () => void): void {
        this.isUpdatingSignal.set(true);
        this.errorSignal.set(null);

        const payload = { ...department, departmentId: id } as Department;

        this.departmentService.updateDepartment(id, payload).subscribe({
            next: (response) => {
                const current = this.departmentsSignal();
                const updated = current.map(d => d.departmentId === id ? response.data : d);
                this.departmentsSignal.set(updated);

                // Update selected if needed
                const selected = this.selectedDepartmentSignal();
                if (selected && selected.departmentId === id) {
                    this.selectedDepartmentSignal.set(response.data);
                }

                this.isUpdatingSignal.set(false);
                this.toastrService.success('Cập nhật phòng ban thành công!', 'Thành công');
                if (onSuccess) onSuccess();
            },
            error: (err) => {
                const errorObj = mapToAppError(err, 'Không thể cập nhật phòng ban');
                this.errorSignal.set(errorObj);
                this.isUpdatingSignal.set(false);
                this.toastrService.error(errorObj.message, 'Lỗi');
            }
        });
    }

    /**
     * Delete department
     */
    deleteDepartment(id: number): void {
        this.isDeletingSignal.set(true);
        this.errorSignal.set(null);

        this.departmentService.deleteDepartment(id).subscribe({
            next: () => {
                const current = this.departmentsSignal();
                const filtered = current.filter(d => d.departmentId !== id);
                this.departmentsSignal.set(filtered);

                const selected = this.selectedDepartmentSignal();
                if (selected && selected.departmentId === id) {
                    this.selectedDepartmentSignal.set(null);
                }

                this.isDeletingSignal.set(false);
                this.toastrService.success('Đã xóa phòng ban!', 'Thành công');
            },
            error: (err) => {
                const errorObj = mapToAppError(err, 'Không thể xóa phòng ban');
                this.errorSignal.set(errorObj);
                this.isDeletingSignal.set(false);
                this.toastrService.error(errorObj.message, 'Lỗi');
            }
        });
    }

    /**
     * Clear errors
     */
    clearError(): void {
        this.errorSignal.set(null);
    }

    /**
     * Select a department
     */
    selectDepartment(department: Department | null): void {
        this.selectedDepartmentSignal.set(department);
    }
}
