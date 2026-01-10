import { Injectable, NgZone } from '@angular/core';
import {
  signal,
  WritableSignal,
  computed,
  effect,
  Injector,
  runInInjectionContext
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { DesignationService } from '../services/designation.service';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest, Department, Designation } from '../models';
import { AppError } from '@core/models/app-error.model';
import { mapToAppError } from '@core/utils/error.utils';

/**
 * State Interface
 * Định nghĩa toàn bộ state liên quan đến Employee
 */
interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: AppError | null;
  selectedEmployee: Employee | null;
  totalCount: number; // Cho pagination
  departments: Department[];
  designations: Designation[];
  masterDataLoading: boolean;
}

/**
 * EmployeeStore
 * State Management Layer sử dụng Angular Signals
 *
 * Kiến trúc:
 * 1. State signals (private WritableSignal) - Internal state
 * 2. Derived signals (public readonly) - Expose cho UI components
 * 3. Methods - Actions để update state qua service calls
 * 4. Side effects (effect) - Xử lý side effects tự động
 *
 * Lợi ích:
 * - Fine-grained reactivity (chỉ update thành phần cần thiết)
 * - Type-safe (no `any`)
 * - Không cần RxJS Observable subscription (dễ cleanup)
 * - Performance tốt (OnPush CD strategy)
 *
 * @Injectable: Giúp Angular DI inject vào các component
 */
@Injectable({
  providedIn: 'root'
})
export class EmployeeStore {
  // ============= INTERNAL STATE SIGNALS (PRIVATE) =============

  /** Danh sách nhân viên */
  private employeesSignal: WritableSignal<Employee[]> = signal([]);

  /** Loading state */
  private loadingSignal: WritableSignal<boolean> = signal(false);

  /** Error message */
  private errorSignal: WritableSignal<AppError | null> = signal(null);

  /** Nhân viên được chọn (chi tiết) */
  private selectedEmployeeSignal: WritableSignal<Employee | null> = signal(null);

  /** Tổng số nhân viên (cho pagination) */
  private totalCountSignal: WritableSignal<number> = signal(0);

  /** Danh sách phòng ban */
  private departmentsSignal: WritableSignal<Department[]> = signal([]);

  /** Danh sách chức danh */
  private designationsSignal: WritableSignal<Designation[]> = signal([]);

  /** Master data loading state */
  private masterDataLoadingSignal: WritableSignal<boolean> = signal(false);

  /** Creating state */
  private isCreatingSignal: WritableSignal<boolean> = signal(false);

  /** Updating state */
  private isUpdatingSignal: WritableSignal<boolean> = signal(false);

  /** Deleting state */
  private isDeletingSignal: WritableSignal<boolean> = signal(false);

  // ============= DERIVED/COMPUTED SIGNALS (PUBLIC READ-ONLY) =============

  /**
   * Expose read-only employees list
   * Computed signal này tự động update khi employeesSignal thay đổi
   */
  readonly employees = computed(() => this.employeesSignal());

  /**
   * Expose read-only loading state
   */
  readonly isLoading = computed(() =>
    this.loadingSignal() ||
    this.isCreatingSignal() ||
    this.isUpdatingSignal() ||
    this.isDeletingSignal()
  );

  /**
   * Expose read-only creating state
   */
  readonly isCreating = computed(() => this.isCreatingSignal());

  /**
   * Expose read-only updating state
   */
  readonly isUpdating = computed(() => this.isUpdatingSignal());

  /**
   * Expose read-only deleting state
   */
  readonly isDeleting = computed(() => this.isDeletingSignal());

  /**
   * Expose read-only error
   */
  readonly error = computed(() => this.errorSignal());

  /**
   * Expose read-only selected employee
   */
  readonly selectedEmployee = computed(() => this.selectedEmployeeSignal());

  /**
   * Expose read-only total count
   */
  readonly totalCount = computed(() => this.totalCountSignal());

  /**
   * Expose read-only departments
   */
  readonly departments = computed(() => this.departmentsSignal());

  /**
   * Expose read-only designations
   */
  readonly designations = computed(() => this.designationsSignal());

  /**
   * Expose master data loading state
   */
  readonly isMasterDataLoading = computed(() => this.masterDataLoadingSignal());

  /**
   * Computed signal để check xem có employee nào không
   */
  readonly hasEmployees = computed(() => this.employeesSignal().length > 0);

  /**
   * Computed signal để check xem có loading hoặc error không
   */
  readonly isError = computed(() => this.errorSignal() !== null);

  /**
   * Department options for dropdown (id, name)
   */
  readonly departmentOptions = computed(() =>
    this.departmentsSignal().map(dept => ({
      id: dept.departmentId,
      name: dept.departmentName
    }))
  );

  /**
   * Designation options for dropdown (id, name)
   */
  readonly designationOptions = computed(() =>
    this.designationsSignal().map(des => ({
      id: des.designationId,
      name: des.designationName
    }))
  );

  // ============= CONSTRUCTOR & INJECTOR CONTEXT =============

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private designationService: DesignationService,
    private toastrService: ToastrService,
    private injector: Injector,
    private ngZone: NgZone
  ) {
    // Có thể init effects ở đây nếu cần
  }

  // ============= ACTIONS / METHODS =============

  /**
   * Load Master Data (Departments + Designations) in parallel
   *
   * Luồng xử lý:
   * 1. Set masterDataLoading = true
   * 2. Use forkJoin to call both APIs in parallel
   * 3. If success -> update departments & designations signals
   * 4. If error -> update error signal
   * 5. Set masterDataLoading = false
   */
  loadMasterData(): void {
    this.masterDataLoadingSignal.set(true);
    this.errorSignal.set(null);

    forkJoin({
      departments: this.departmentService.getAllDepartments(),
      designations: this.designationService.getAllDesignations()
    }).subscribe({
      next: (result) => {
        // Success: update state
        this.ngZone.run(() => {
          this.departmentsSignal.set(result.departments.data || []);
          this.designationsSignal.set(result.designations.data || []);
          this.masterDataLoadingSignal.set(false);
        });
      },

      error: (err) => {
        // Error: update error signal
        this.ngZone.run(() => {
          this.errorSignal.set(mapToAppError(err, 'Failed to load master data'));
          this.masterDataLoadingSignal.set(false);
        });
      }
    });
  }

  /**
   * Load danh sách nhân viên từ API
   *
   * Luồng xử lý:
   * 1. Set loading = true
   * 2. Call API qua EmployeeService
   * 3. Nếu success -> update employees signal
   * 4. Nếu error -> update error signal
   * 5. Set loading = false
   *
   * @param filter Tìm kiếm theo name
   * @param sortBy Trường sort
   * @param sortOrder Hướng sort
   * @param pageNumber Số trang
   * @param pageSize Số item/trang
   */
  loadEmployees(
    filter?: string,
    sortBy: string = 'name',
    sortOrder: string = 'asc',
    pageNumber: number = 1,
    pageSize: number = 10
  ): void {
    // Set loading state
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    // Gọi API (không subscribe ở đây, dùng effect hoặc subscription trong component)
    // Nhưng để keep this simple, chúng ta có thể subscribe ở đây cho demo
    this.employeeService
      .getAllEmployees(filter, sortBy, sortOrder, pageNumber, pageSize)
      .subscribe({
        next: (response) => {
          // Success: update state
          this.ngZone.run(() => {
            this.employeesSignal.set(response.data || []);
            this.totalCountSignal.set(response.data?.length || 0);
            this.loadingSignal.set(false);
          });
        },

        error: (err) => {
          // Error: update error signal
          this.ngZone.run(() => {
            this.errorSignal.set(mapToAppError(err, 'Failed to load employees'));
            this.loadingSignal.set(false);
          });
        }
      });
  }

  /**
   * Lấy thông tin chi tiết nhân viên
   *
   * @param employeeId ID của nhân viên
   */
  loadEmployeeById(employeeId: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.employeeService.getEmployeeById(employeeId).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.selectedEmployeeSignal.set(response.data);
          this.loadingSignal.set(false);
        });
      },

      error: (err) => {
        this.ngZone.run(() => {
          this.errorSignal.set(mapToAppError(err, 'Failed to load employee'));
          this.loadingSignal.set(false);
        });
      }
    });
  }

  /**
   * Thêm nhân viên mới
   *
   * @param payload CreateEmployeeRequest
   * @param onSuccess Callback khi thành công
   */
  addEmployee(payload: CreateEmployeeRequest, onSuccess?: () => void): void {
    this.isCreatingSignal.set(true);
    this.errorSignal.set(null);

    this.employeeService.createEmployee(payload).subscribe({
      next: (response) => {
        // Thêm nhân viên mới vào danh sách
        const currentEmployees = this.employeesSignal();
        this.employeesSignal.set([...currentEmployees, response.data]);
        this.totalCountSignal.set(currentEmployees.length + 1);
        this.isCreatingSignal.set(false);

        // Show success toast
        this.toastrService.success('Nhân viên đã được tạo thành công!', 'Thành công');

        // Execute callback
        if (onSuccess) onSuccess();
      },

      error: (err) => {
        const errorObj = mapToAppError(err, 'Không thể tạo nhân viên');
        this.errorSignal.set(errorObj);
        this.isCreatingSignal.set(false);

        // Show error toast
        this.toastrService.error(errorObj.message, 'Lỗi');
      }
    });
  }

  /**
   * Cập nhật thông tin nhân viên
   *
   * @param employeeId ID của nhân viên
   * @param payload UpdateEmployeeRequest
   * @param onSuccess Callback khi thành công
   */
  updateEmployee(employeeId: number, payload: UpdateEmployeeRequest, onSuccess?: () => void): void {
    this.isUpdatingSignal.set(true);
    this.errorSignal.set(null);

    this.employeeService.updateEmployee(employeeId, payload).subscribe({
      next: (response) => {
        // Update nhân viên trong danh sách
        const currentEmployees = this.employeesSignal();
        const updatedEmployees = currentEmployees.map(emp =>
          emp.employeeId === employeeId ? response.data : emp
        );
        this.employeesSignal.set(updatedEmployees);

        // Nếu là selected employee, update nó
        const selected = this.selectedEmployeeSignal();
        if (selected && selected.employeeId === employeeId) {
          this.selectedEmployeeSignal.set(response.data);
        }

        this.isUpdatingSignal.set(false);

        // Show success toast
        this.toastrService.success('Nhân viên đã được cập nhật thành công!', 'Thành công');

        // Execute callback
        if (onSuccess) onSuccess();
      },

      error: (err) => {
        const errorObj = mapToAppError(err, 'Không thể cập nhật nhân viên');
        this.errorSignal.set(errorObj);
        this.isUpdatingSignal.set(false);

        // Show error toast
        this.toastrService.error(errorObj.message, 'Lỗi');
      }
    });
  }

  /**
   * Xóa nhân viên
   *
   * @param employeeId ID của nhân viên cần xóa
   */
  deleteEmployee(employeeId: number): void {
    this.isDeletingSignal.set(true);
    this.errorSignal.set(null);

    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        // Remove nhân viên khỏi danh sách
        const currentEmployees = this.employeesSignal();
        const filteredEmployees = currentEmployees.filter(emp => emp.employeeId !== employeeId);
        this.employeesSignal.set(filteredEmployees);
        this.totalCountSignal.set(filteredEmployees.length);

        // Nếu là selected employee, clear nó
        const selected = this.selectedEmployeeSignal();
        if (selected && selected.employeeId === employeeId) {
          this.selectedEmployeeSignal.set(null);
        }

        this.isDeletingSignal.set(false);

        // Show success toast
        this.toastrService.success('Nhân viên đã được xóa thành công!', 'Thành công');
      },

      error: (err) => {
        const errorObj = mapToAppError(err, 'Không thể xóa nhân viên');
        this.errorSignal.set(errorObj);
        this.isDeletingSignal.set(false);

        // Show error toast
        this.toastrService.error(errorObj.message, 'Lỗi');
      }
    });
  }

  /**
   * Clear error message
   * Hữu ích để clear toast/snackbar error sau một thời gian
   */
  clearError(): void {
    this.errorSignal.set(null);
  }

  /**
   * Reset toàn bộ state
   * Dùng khi logout hoặc switch user
   */
  resetState(): void {
    this.employeesSignal.set([]);
    this.loadingSignal.set(false);
    this.errorSignal.set(null);
    this.selectedEmployeeSignal.set(null);
    this.totalCountSignal.set(0);
  }

  /**
   * Select nhân viên (set selectedEmployee)
   * Hữu ích khi click row trong table
   */
  selectEmployee(employee: Employee): void {
    this.selectedEmployeeSignal.set(employee);
  }

  /**
   * Deselect nhân viên
   */
  deselectEmployee(): void {
    this.selectedEmployeeSignal.set(null);
  }


}
