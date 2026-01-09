# Phase 2 - EmployeeListComponent Usage Guide

## 🎯 Overview

EmployeeListComponent là smart component chịu trách nhiệm:
- ✅ Load danh sách nhân viên từ Store
- ✅ Hiển thị loading state
- ✅ Hiển thị error state  
- ✅ Hiển thị empty state
- ✅ Hiển thị data table
- ✅ Xử lý delete action

---

## 📊 Component Structure

### TypeScript Component
```typescript
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  store = inject(EmployeeStore);  // Inject Store
  
  ngOnInit() {
    this.store.loadEmployees();   // Load on init
  }
  
  onDeleteEmployee(id: number) {
    if (confirm('Bạn có chắc chắn?')) {
      this.store.deleteEmployee(id);
    }
  }
  
  onSelectEmployee(emp: Employee) {
    this.store.selectEmployee(emp);
  }
}
```

### HTML Template Features

#### 1. Header Section
```html
<h1>Danh Sách Nhân Viên</h1>
<a routerLink="/employees/add" class="btn btn-primary">
  Thêm Mới
</a>
```

#### 2. Loading State
```html
@if (store.isLoading()) {
  <div class="spinner-border">Loading...</div>
}
```

#### 3. Error State
```html
@if (store.error()) {
  <div class="alert alert-danger">
    {{ store.error() }}
    <button (click)="store.clearError()">Dismiss</button>
  </div>
}
```

#### 4. Empty State
```html
@if (!store.hasEmployees() && !store.isLoading()) {
  <div class="alert alert-info">
    Không có dữ liệu. 
    <a routerLink="/employees/add">Thêm nhân viên mới</a>
  </div>
}
```

#### 5. Data Table
```html
@if (store.hasEmployees() && !store.isLoading()) {
  <table>
    @for (emp of store.employees(); track emp.employeeId) {
      <tr>
        <td>{{ emp.name }}</td>
        <td>{{ emp.email }}</td>
        <td>{{ emp.contactNo }}</td>
        <td>
          <!-- Edit Button -->
          <a [routerLink]="['/employees', emp.employeeId, 'edit']">
            Edit
          </a>
          
          <!-- Delete Button -->
          <button (click)="onDeleteEmployee(emp.employeeId)">
            Delete
          </button>
        </td>
      </tr>
    }
  </table>
  
  <!-- Total Count -->
  <small>Total: {{ store.totalCount() }}</small>
}
```

---

## 🔌 How to Use

### Step 1: Import Component
```typescript
import { EmployeeListComponent } from './features/employee/employee-list/employee-list.component';
```

### Step 2: Add to Routes
```typescript
const routes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent
  }
];
```

### Step 3: Navigate
```html
<a routerLink="/employees">View Employees</a>
```

### Step 4: Component Loads
- URL: `/employees`
- EmployeeListComponent initialized
- `ngOnInit()` calls `store.loadEmployees()`
- Data loads automatically

---

## 🎨 UI States

### Loading State
```
┌─────────────────────────────────┐
│                                 │
│        ⟳ Spinner                │
│   Đang tải danh sách nhân viên...│
│                                 │
└─────────────────────────────────┘
```

### Error State
```
┌─────────────────────────────────┐
│  ⚠️  Lỗi!                        │
│  Không thể tải dữ liệu          │
│  [Dismiss]                      │
└─────────────────────────────────┘
```

### Empty State
```
┌─────────────────────────────────┐
│  📭                             │
│  Không có dữ liệu nhân viên      │
│  [Thêm Nhân Viên Đầu Tiên]      │
└─────────────────────────────────┘
```

### Data State
```
┌──────────────────────────────────┐
│ Danh Sách Nhân Viên  [Thêm Mới] │
├──────────────────────────────────┤
│ Tên    │ Email    │ Phone │ ...  │
├────────┼──────────┼───────┤      │
│ John   │ ...      │ ...   │[Edit]│
│ Jane   │ ...      │ ...   │[Edit]│
│ Bob    │ ...      │ ...   │[Edit]│
├────────┴──────────┴───────┘      │
│ Total: 3 nhân viên               │
└──────────────────────────────────┘
```

---

## 📱 Responsive Design

### Desktop (≥992px)
- Full table with all columns
- Buttons side by side
- Optimal spacing

### Tablet (768px - 991px)
- Table slightly condensed
- Buttons stacked if needed
- Readable font size

### Mobile (<768px)
- Reduced font size
- Buttons in single column
- Horizontal scroll for table
- Optimized touch targets

---

## 🎯 Actions

### View List
```typescript
// Automatic on component load
ngOnInit() {
  this.store.loadEmployees();
}
```

### Delete Employee
```typescript
onDeleteEmployee(employeeId: number) {
  if (confirm('Bạn có chắc chắn?')) {
    this.store.deleteEmployee(employeeId);
    // Store automatically updates list
  }
}
```

### Select Employee
```typescript
onSelectEmployee(employee: Employee) {
  this.store.selectEmployee(employee);
  // Can be used for detail view or navigation
}
```

### Clear Error
```typescript
store.clearError()  // Called by dismiss button
```

---

## 🔗 Navigation

### From Employee List

#### Add New
```html
<a routerLink="/employees/add">Add New</a>
<!-- Navigates to EmployeeFormComponent (add mode) -->
```

#### Edit
```html
<a [routerLink]="['/employees', emp.employeeId, 'edit']">
  Edit
</a>
<!-- Navigates to EmployeeFormComponent (edit mode) -->
```

#### Delete
```html
<button (click)="onDeleteEmployee(emp.employeeId)">
  Delete
</button>
<!-- Removes from list via Store -->
```

---

## 🧪 Testing Scenarios

### Scenario 1: Loading
```
1. Navigate to /employees
2. See loading spinner
3. After API response
4. See data table
```

### Scenario 2: Error Handling
```
1. Backend returns error
2. Error alert shown
3. Click "Dismiss"
4. Error cleared
```

### Scenario 3: Empty List
```
1. No employees in database
2. Empty state message shown
3. "Add First Employee" button visible
4. Click button to add
```

### Scenario 4: Delete Employee
```
1. Click Delete button
2. Confirm dialog shown
3. Click OK
4. Employee removed from list
5. List updates automatically
```

### Scenario 5: Edit Employee
```
1. Click Edit button
2. Navigate to edit form
3. Make changes
4. Save
5. Navigate back to list
6. See updated data
```

---

## 🎓 Technical Details

### Control Flow Syntax
```html
<!-- Modern Angular 17+ syntax -->
@if (condition) { ... }    <!-- Instead of *ngIf -->
@for (item of items; track item.id) { ... }  <!-- Instead of *ngFor -->
```

### Change Detection
```typescript
changeDetection: ChangeDetectionStrategy.OnPush
// Only checks when:
// 1. Input properties change
// 2. Events fire
// 3. Signals change (auto detected)
```

### Signals
```typescript
store.employees()           // Get current employees
store.isLoading()          // Get loading state
store.error()              // Get error message
store.hasEmployees()       // Computed helper
```

---

## 🚀 Next Components to Build

### EmployeeFormComponent
```typescript
// Create/Edit employee form
// Handles validation
// Submits to Store
```

### EmployeeDetailComponent
```typescript
// Show single employee details
// With back button
// Maybe edit/delete from here
```

### DepartmentComponent
```typescript
// Similar structure to EmployeeListComponent
// Shows department list
// CRUD operations
```

---

## 📝 Common Customizations

### Change Button Text
```html
<a routerLink="/employees/add" class="btn btn-primary">
  Custom Button Text
</a>
```

### Change Table Columns
```html
@for (emp of store.employees(); track emp.employeeId) {
  <tr>
    <td>{{ emp.name }}</td>
    <td>{{ emp.customField }}</td>
    <!-- Add more columns -->
  </tr>
}
```

### Custom Styling
Edit `employee-list.component.scss`:
```scss
.table {
  // Your custom styles
}

.btn-custom {
  // Custom button styles
}
```

### Custom Empty Message
```html
@if (!store.hasEmployees() && !store.isLoading()) {
  <div class="alert alert-info">
    Your custom message here
  </div>
}
```

---

## 🎯 Summary

**EmployeeListComponent provides:**
- ✅ Full employee list with CRUD
- ✅ All UI states handled
- ✅ Responsive design
- ✅ Bootstrap 5 styling
- ✅ Modern Angular 17+ patterns
- ✅ OnPush optimization
- ✅ Signal-based reactivity

**Ready for use in production!** 🎉

---

**File Location:** `src/app/features/employee/employee-list/`  
**Route:** `/employees`  
**Status:** ✅ Complete  
**Quality:** 🌟 Excellent
