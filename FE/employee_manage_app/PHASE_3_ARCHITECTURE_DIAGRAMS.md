# Phase 3 Architecture & Data Flow Diagrams

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Angular Application                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  Routing Layer                           │   │
│  │  /employees  /employees/add  /employees/:id/edit        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Component Layer                             │   │
│  │  ┌─────────────────────┬─────────────────────────────┐  │   │
│  │  │ EmployeeListComponent│ EmployeeFormComponent     │  │   │
│  │  │ (Smart)             │ (Smart - Create/Edit)     │  │   │
│  │  └─────────────────────┴─────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              State Management Layer                      │   │
│  │  ┌────────────────────────────────────────────────────┐ │   │
│  │  │          EmployeeStore (Signals)                  │ │   │
│  │  │  ├─ employeesSignal          (WritableSignal)     │ │   │
│  │  │  ├─ departmentsSignal        (WritableSignal)     │ │   │
│  │  │  ├─ designationsSignal       (WritableSignal)     │ │   │
│  │  │  ├─ loadingSignal            (WritableSignal)     │ │   │
│  │  │  ├─ errorSignal              (WritableSignal)     │ │   │
│  │  │  │                                                 │ │   │
│  │  │  ├─ employees                (Computed)           │ │   │
│  │  │  ├─ departments              (Computed)           │ │   │
│  │  │  ├─ designations             (Computed)           │ │   │
│  │  │  ├─ departmentOptions        (Computed)           │ │   │
│  │  │  └─ designationOptions       (Computed)           │ │   │
│  │  │                                                 │ │   │
│  │  │  Methods:                                        │ │   │
│  │  │  ├─ loadEmployees()                              │ │   │
│  │  │  ├─ loadMasterData()         [forkJoin]         │ │   │
│  │  │  ├─ addEmployee()                                │ │   │
│  │  │  ├─ updateEmployee()                             │ │   │
│  │  │  └─ deleteEmployee()                             │ │   │
│  │  └────────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Service Layer (HTTP)                          │   │
│  │  ┌──────────────────┬──────────────────────────────────┐ │   │
│  │  │ EmployeeService  │ DepartmentService               │ │   │
│  │  │                  │ DesignationService              │ │   │
│  │  │ Methods:         │ Methods:                        │ │   │
│  │  │ - get            │ - getAll()                      │ │   │
│  │  │ - getById()      │ - getById()                     │ │   │
│  │  │ - create()       │ - create()                      │ │   │
│  │  │ - update()       │ - update()                      │ │   │
│  │  │ - delete()       │ - delete()                      │ │   │
│  │  └──────────────────┴──────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            HTTP Layer (RxJS Observables)                │   │
│  │  Observable<ApiResponse<T>>                             │   │
│  └──────────────────────────────────────────────────────────┘   │
│                               ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │            Backend API (ASP.NET Core)                    │   │
│  │  http://localhost:5000/api/                             │   │
│  │  ├─ EmployeeMaster                                      │   │
│  │  ├─ DepartmentMaster                                    │   │
│  │  └─ DesignationMaster                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 State Management - Signal Flow

```
┌───────────────────────────────────────────────────────────────┐
│                    EmployeeStore Signals                       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  WritableSignal (Internal State)                             │
│  ├─ employeesSignal          []                              │
│  ├─ departmentsSignal        []                              │
│  ├─ designationsSignal       []                              │
│  ├─ loadingSignal            false                           │
│  ├─ errorSignal              null                            │
│  └─ selectedEmployeeSignal   null                            │
│                                                                │
│         ↓ (Derived Computed)                                  │
│                                                                │
│  Computed Signal (Public Read-only)                          │
│  ├─ employees()              → employeesSignal()             │
│  ├─ departments()            → departmentsSignal()           │
│  ├─ designations()           → designationsSignal()          │
│  ├─ isLoading()              → loadingSignal()               │
│  ├─ error()                  → errorSignal()                 │
│  ├─ selectedEmployee()        → selectedEmployeeSignal()     │
│  ├─ hasEmployees()            → employees.length > 0         │
│  ├─ departmentOptions()       → departments.map()            │
│  └─ designationOptions()      → designations.map()           │
│                                                                │
│         ↓ (Used by Components)                                │
│                                                                │
│  Component Template Binding                                   │
│  @if (store.isLoading())     { Show spinner }               │
│  @if (store.hasEmployees())  { Show table }                 │
│  @for (emp of store.employees(); track emp.id) { ... }      │
│  {{ store.error() }}                                          │
│  @for (opt of store.departmentOptions(); track opt.id) { .. }│
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow: Load Master Data (Parallel)

```
┌──────────────────────────────────────────────────────────────┐
│         EmployeeFormComponent.ngOnInit()                      │
└──────────────────────────────────────────────────────────────┘
                           ↓
                 store.loadMasterData()
                           ↓
         ┌─────────────────┴──────────────────┐
         ↓                                    ↓
    departmentService              designationService
    .getAllDepartments()            .getAllDesignations()
         ↓                                    ↓
    HTTP GET                             HTTP GET
    /DepartmentMaster                   /DesignationMaster
         ↓                                    ↓
    Observable<Response>                Observable<Response>
         └─────────────────┬──────────────────┘
                           ↓
                    forkJoin() - Wait for both
                           ↓
              ┌────────────┴────────────┐
              ↓                         ↓
     departmentsSignal.set()    designationsSignal.set()
              ↓                         ↓
         Computed Update          Computed Update
              ↓                         ↓
        departmentOptions()      designationOptions()
              ↓                         ↓
         Form Dropdowns Auto-populate
```

---

## ✏️ Data Flow: Create Employee

```
┌────────────────────────────────────────────────────────────┐
│        EmployeeFormComponent Template                       │
│  <form (ngSubmit)="onSubmit()">                             │
│    <input formControlName="name">                           │
│    <select formControlName="departmentId">                  │
│    <button type="submit">Create</button>                    │
│  </form>                                                    │
└────────────────────────────────────────────────────────────┘
                           ↓
                   User Clicks Submit
                           ↓
              onSubmit() checks form.valid
                           ↓
         isEditMode = false (Create Mode)
                           ↓
     Create CreateEmployeeRequest object
     {
       name: "John",
       email: "john@example.com",
       contactNo: "9876543210",
       departmentId: 1,
       designationId: 2,
       salary: 50000,
       password: "secure123"
     }
                           ↓
            store.addEmployee(payload)
                           ↓
     employeeService.createEmployee(payload)
                           ↓
          HTTP POST /EmployeeMaster
              Request Body: payload
                           ↓
     Backend processes & validates
                           ↓
        Response: ApiResponse<Employee>
            {
              statusCode: 200,
              data: {
                employeeId: 5,
                name: "John",
                ...
              }
            }
                           ↓
         Store: employeesSignal.set([...employees, newEmployee])
         Store: totalCountSignal update
                           ↓
         Router.navigate(['/employees'])
                           ↓
        EmployeeListComponent reloads with new data
```

---

## ✏️ Data Flow: Update Employee

```
┌────────────────────────────────────────────────────────────┐
│     Route: /employees/5/edit                                │
│  ActivatedRoute.paramMap → id = 5                            │
└────────────────────────────────────────────────────────────┘
                           ↓
            ngOnInit() detects id exists
                           ↓
         isEditMode = true (Edit Mode)
                           ↓
         loadEmployeeForEdit(5)
         store.loadEmployeeById(5)
                           ↓
     HTTP GET /EmployeeMaster/5
                           ↓
     Response: ApiResponse<Employee>
     {
       statusCode: 200,
       data: {
         employeeId: 5,
         name: "John",
         email: "john@example.com",
         ...
       }
     }
                           ↓
     selectedEmployeeSignal.set(data)
                           ↓
     form.patchValue({
       name: "John",
       email: "john@example.com",
       ...
     })
                           ↓
     Form displays with existing data
                           ↓
        User modifies fields & clicks Update
                           ↓
              onSubmit() in Edit Mode
                           ↓
     Create UpdateEmployeeRequest object
     {
       name: "John Updated",
       email: "john.updated@example.com",
       contactNo: "9876543210",
       departmentId: 1,
       designationId: 2,
       salary: 55000,
       password: undefined  // Optional for update
     }
                           ↓
     store.updateEmployee(5, payload)
                           ↓
     HTTP PUT /EmployeeMaster/5
            Request Body: payload
                           ↓
     Backend validates & updates
                           ↓
     Response: ApiResponse<Employee>
     {
       statusCode: 200,
       data: {
         employeeId: 5,
         name: "John Updated",
         ...
       }
     }
                           ↓
     Store: Update specific employee in employeesSignal
     const updated = employees.map(e => 
       e.employeeId === 5 ? updatedData : e
     )
     employeesSignal.set(updated)
                           ↓
     Router.navigate(['/employees'])
                           ↓
     List displays with updated data
```

---

## 📋 Form Validation Flow

```
User Input
   ↓
┌─────────────────────────────────────────┐
│  Reactive Form Validators               │
│  ├─ Validators.required                 │
│  ├─ Validators.email                    │
│  ├─ Validators.minLength(n)             │
│  ├─ Validators.pattern(/regex/)         │
│  └─ Custom validators (optional)        │
└─────────────────────────────────────────┘
   ↓
Form Control Status Update
   ├─ valid: true/false
   ├─ errors: { required: true } or null
   ├─ dirty: true (user changed)
   └─ touched: true (user focused)
   ↓
Template Binding
   ├─ [class.is-invalid]="hasError()"
   ├─ @if (hasError('email', 'email')) { ... }
   ├─ @if (hasError('phone', 'pattern')) { ... }
   └─ [disabled]="!form.valid"
   ↓
Visual Feedback to User
   ├─ Red border on invalid
   ├─ Error message below field
   ├─ Submit button disabled
   └─ Real-time validation
   ↓
User Corrects & Submits
   ├─ All validators pass
   ├─ form.valid = true
   ├─ Submit button enabled
   └─ API call can proceed
```

---

## 🎯 Routing & Navigation Map

```
┌────────────────────────────────────────────────────────┐
│                    Angular Router                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Root Path: /                                          │
│      ↓                                                 │
│      Redirect to /employees                           │
│      ↓                                                 │
│  ┌──────────────────────────────────────────────────┐│
│  │  /employees (EmployeeListComponent)             ││
│  │  ├─ List all employees                          ││
│  │  ├─ Show designation names                      ││
│  │  ├─ Actions: Edit, Delete                       ││
│  │  └─ Navigation Links:                           ││
│  │      ├─ "Thêm Mới" → /employees/add             ││
│  │      └─ "Sửa" → /employees/:id/edit             ││
│  │                                                  ││
│  │  /employees/add (EmployeeFormComponent)          ││
│  │  ├─ Create Mode (isEditMode = false)             ││
│  │  ├─ Empty form                                   ││
│  │  ├─ Password required                            ││
│  │  ├─ Submit: POST → HTTP 201                      ││
│  │  └─ Cancel: → /employees                         ││
│  │                                                  ││
│  │  /employees/:id/edit (EmployeeFormComponent)     ││
│  │  ├─ Edit Mode (isEditMode = true)                ││
│  │  ├─ Form pre-filled with employee data           ││
│  │  ├─ Password optional                            ││
│  │  ├─ Submit: PUT → HTTP 200                       ││
│  │  └─ Cancel: → /employees                         ││
│  └──────────────────────────────────────────────────┘│
│                                                        │
│  Future Routes (Phase 4+):                            │
│  ├─ /dashboard                                        │
│  ├─ /departments                                      │
│  ├─ /designations                                     │
│  ├─ /profile                                          │
│  └─ /login                                            │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

## 🔌 Service & API Contract

```
┌──────────────────────────────────────────────────────┐
│          EmployeeService Interface                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│ getAllEmployees(                                     │
│   filter?: string,                                   │
│   sortBy?: string,                                   │
│   sortOrder?: string,                                │
│   pageNumber?: number,                               │
│   pageSize?: number                                  │
│ ): Observable<ApiResponse<Employee[]>>               │
│                                                      │
│ getEmployeeById(id: number)                          │
│ : Observable<ApiResponse<Employee>>                  │
│                                                      │
│ createEmployee(payload: CreateEmployeeRequest)       │
│ : Observable<ApiResponse<Employee>>                  │
│                                                      │
│ updateEmployee(id: number, payload: ...)             │
│ : Observable<ApiResponse<Employee>>                  │
│                                                      │
│ deleteEmployee(id: number)                           │
│ : Observable<ApiResponse<void>>                      │
│                                                      │
└──────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────┐
│          API Response Contract                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ interface ApiResponse<T> {                           │
│   statusCode: number;      // 200, 201, 400, 500    │
│   errorCode?: number;      // Custom error code     │
│   message?: string;        // Error message         │
│   data: T;                 // Response data         │
│ }                                                    │
│                                                      │
│ Example Success:                                     │
│ {                                                    │
│   statusCode: 200,                                   │
│   message: "Success",                                │
│   data: [{ employeeId: 1, name: "John", ... }]      │
│ }                                                    │
│                                                      │
│ Example Error:                                       │
│ {                                                    │
│   statusCode: 400,                                   │
│   errorCode: 4001,                                   │
│   message: "Validation failed",                      │
│   data: null                                         │
│ }                                                    │
│                                                      │
└──────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────┐
│          Backend API Endpoints                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ Employee Management:                                 │
│ GET    /api/EmployeeMaster                           │
│ GET    /api/EmployeeMaster/{id}                      │
│ POST   /api/EmployeeMaster                           │
│ PUT    /api/EmployeeMaster/{id}                      │
│ DELETE /api/EmployeeMaster/{id}                      │
│                                                      │
│ Department Master:                                   │
│ GET    /api/DepartmentMaster                         │
│ GET    /api/DepartmentMaster/{id}                    │
│ POST   /api/DepartmentMaster                         │
│ PUT    /api/DepartmentMaster/{id}                    │
│ DELETE /api/DepartmentMaster/{id}                    │
│                                                      │
│ Designation Master:                                  │
│ GET    /api/DesignationMaster                        │
│ GET    /api/DesignationMaster/{id}                   │
│ POST   /api/DesignationMaster                        │
│ PUT    /api/DesignationMaster/{id}                   │
│ DELETE /api/DesignationMaster/{id}                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────┐
│         Browser                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  User Opens: /employees                                 │
│      ↓                                                  │
│  Router: Match /employees route                         │
│      ↓                                                  │
│  EmployeeListComponent initialized                      │
│  ├─ Constructor: inject(EmployeeStore)                  │
│  └─ ngOnInit():                                         │
│      ├─ store.loadEmployees() [API Call 1]             │
│      └─ store.loadMasterData() [API Call 2 + 3]        │
│           ├─ departmentService.getAll()                │
│           └─ designationService.getAll()               │
│                                                          │
│      ↓ Template Rendering                               │
│      ├─ @if (store.isLoading()) → Show spinner        │
│      ├─ @if (store.error()) → Show error alert        │
│      ├─ @if (store.hasEmployees())                     │
│      │    @for (emp of store.employees())              │
│      │        <tr> {{ emp.name }} </tr>                │
│      │        <td>{{ getDesignationName(emp.id) }}</td>│
│      └─ [routerLink]="/employees/add" → Create        │
│         [routerLink]="/employees/:id/edit" → Edit     │
│                                                          │
│  User Clicks: "Sửa" (Edit) button                       │
│      ↓                                                  │
│  Router.navigate(['/employees', 123, 'edit'])           │
│      ↓                                                  │
│  EmployeeFormComponent initialized                      │
│  ├─ Constructor: inject(EmployeeStore), ...            │
│  └─ ngOnInit():                                         │
│      ├─ initializeForm()                                │
│      ├─ store.loadMasterData() [Dropdowns]             │
│      ├─ route.paramMap.subscribe()                      │
│      │  └─ Found id=123 → Edit Mode                    │
│      └─ loadEmployeeForEdit(123)                        │
│         └─ store.loadEmployeeById(123) [API Call 4]    │
│            └─ form.patchValue(employee data)           │
│                                                          │
│      ↓ User Modifies Form & Clicks "Update"             │
│      onSubmit():                                         │
│      ├─ Validate form                                   │
│      ├─ Create UpdateEmployeeRequest                    │
│      ├─ store.updateEmployee(123, payload)             │
│      │  └─ employeeService.updateEmployee(123, payload)│
│      │     └─ HTTP PUT /api/EmployeeMaster/123         │
│      ├─ Update employeesSignal                          │
│      └─ Router.navigate(['/employees'])                 │
│                                                          │
│  Back to EmployeeListComponent                          │
│  └─ Signals updated → UI re-renders                    │
│     └─ Updated employee shown in list                  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎨 UI State Diagram

```
┌────────────────────────────────────────────┐
│       Form Component States                 │
├────────────────────────────────────────────┤
│                                            │
│  [1] Loading Master Data                   │
│      ├─ isMasterDataLoading = true         │
│      ├─ Show: Spinner                      │
│      └─ Inputs: Disabled                   │
│           ↓                                 │
│  [2] Master Data Loaded                    │
│      ├─ isMasterDataLoading = false        │
│      ├─ Show: Form with dropdowns          │
│      ├─ departmentOptions: populated       │
│      ├─ designationOptions: populated      │
│      └─ Inputs: Enabled                    │
│           ↓                                 │
│  [3] User Filling Form                     │
│      ├─ form.valid: true/false             │
│      ├─ form.dirty: true (changed)         │
│      ├─ Validation: Real-time              │
│      ├─ Error messages: Below fields       │
│      └─ Submit button: Enabled/Disabled    │
│           ↓                                 │
│  [4] User Submitted                        │
│      ├─ isSubmitting = true                │
│      ├─ Submit button: Disabled            │
│      ├─ Show: Loading spinner on button    │
│      └─ Inputs: Disabled                   │
│           ↓                                 │
│  [5] API Response                          │
│      ├─ Success: Navigate to list         │
│      └─ Error: Show error alert           │
│           isSubmitting = false              │
│           Inputs: Re-enabled                │
│                                            │
└────────────────────────────────────────────┘
```

---

## 📱 Component Tree

```
App (Root)
  ↓
AppComponent
  ↓
Router (Outlet)
  ├─ /employees
  │  └─ EmployeeListComponent (Smart)
  │     ├─ Injects: EmployeeStore
  │     ├─ Signals: employees, isLoading, error, designations
  │     ├─ Methods: onDeleteEmployee(), onSelectEmployee()
  │     ├─ Helpers: getDesignationName(), getDepartmentName()
  │     └─ Child Elements:
  │        ├─ Header (RouterLink to /employees/add)
  │        ├─ Table (track by employee.id)
  │        │  └─ Action Links: Edit, Delete
  │        └─ Footer (Total count)
  │
  ├─ /employees/add
  │  └─ EmployeeFormComponent (Smart - Create Mode)
  │     ├─ Injects: EmployeeStore, FormBuilder, Router, ActivatedRoute
  │     ├─ State: form, isEditMode=false, isSubmitting
  │     ├─ Signals: isMasterDataLoading, departmentOptions, designationOptions
  │     ├─ Methods: onSubmit(), onCancel()
  │     ├─ Helpers: hasError(), getControl()
  │     └─ Child Elements:
  │        ├─ Form Group
  │        │  ├─ Name input (required, minLength)
  │        │  ├─ Email input (required, email)
  │        │  ├─ Phone input (required, pattern)
  │        │  ├─ Department select
  │        │  ├─ Designation select
  │        │  ├─ Address, City, State, Pincode
  │        │  ├─ Salary input
  │        │  └─ Password input (required)
  │        ├─ Error alerts
  │        └─ Submit/Cancel buttons
  │
  └─ /employees/:id/edit
     └─ EmployeeFormComponent (Smart - Edit Mode)
        ├─ Injects: Same as above
        ├─ State: form (pre-filled), isEditMode=true, isSubmitting
        ├─ Signals: Same as above
        ├─ Methods: onSubmit() [PUT instead of POST], onCancel()
        ├─ Helpers: Same as above
        └─ Child Elements: Same as Create, but:
           ├─ Form pre-filled with employee data
           └─ Password field: Optional
```

---

This completes the Phase 3 architecture documentation!

All diagrams show the complete data flow, state management, routing, and component interactions for Phase 3.

