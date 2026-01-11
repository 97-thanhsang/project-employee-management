# Product Specification Document (PRD)
**Project Name:** Employee Management System (EMS)
**Version:** 1.0.0
**Status:** In Development
**Last Updated:** 2026-01-11

---

## 1. Introduction
### 1.1 Purpose
The Employee Management System (EMS) is a web-based application designed to streamline the administration of employee records, designations, and departments within an organization. It provides a centralized platform for HR administrators to manage workforce data efficiently.

### 1.2 Scope
-   **Employee Management:** Onboard, update, search, and offboard employees.
-   **Master Data Management:** Manage dynamic lists of Departments and Designations.
-   **Security:** Role-based access control (Admin vs. Standard User).
-   **Reporting:** (Future Scope) Dashboard for workforce analytics.

---

## 2. User Roles & Permissions

### 2.1 Administrator
*   **Access:** Full access to all modules.
*   **Capabilities:**
    *   Create, Read, Update, Delete (CRUD) Employees.
    *   Manage Designations and Departments.
    *   Manage User Accounts and Roles.

### 2.2 Standard User (Employee)
*   **Access:** Limited read-only access (Self-Service).
*   **Capabilities:**
    *   View own profile.
    *   Request profile updates (optional feature).

---

## 3. Functional Requirements

### 3.1 Authentication Module
*   **Login:** Users must log in using Email and Password.
*   **Logout:** Secure session termination.
*   **Tech:** JWT (JSON Web Token) based authentication.

### 3.2 Employee Module
*   **Employee List:**
    *   Display a paginated table of employees.
    *   Columns: Name, Email, Phone, Designation, Department, Status, Actions.
    *   **Search:** Real-time filtering by Name.
    *   **Sort:** Sortable columns (Name, Join Date).
*   **Add Employee:**
    *   Form validation for mandatory fields (Name, Email, Phone, etc.).
    *   Dropdown selection for Designation and Department (fetched from Master Data).
    *   Validation: Unique Email, Phone Number format (10 digits), Pincode (6 digits).
*   **Edit Employee:**
    *   Update existing details.
    *   Password update is optional during edit.
*   **Delete Employee:**
    *   Soft delete or hard delete (configurable).
    *   Confirmation dialog before deletion.

### 3.3 Master Data Modules
*   **Designation Management:**
    *   CRUD operations for Designations (e.g., Software Engineer, HR Manager).
*   **Department Management:**
    *   CRUD operations for Departments (e.g., IT, Sales, Marketing).

---

## 4. Technical Architecture

### 4.1 Frontend
*   **Framework:** Angular 18+ (Standalone Components).
*   **State Management:** Angular Signals + Facade Pattern.
    *   **Store Layer:** `EmployeeStore`, `DesignationStore` (Internal State).
    *   **Facade Layer:** `EmployeeFacade`, `DesignationFacade` (Public API for Components).
*   **UI Library:**
    *   **Hybrid Approach:** Ant Design (Components) + Bootstrap 5 (Layout/Utilities).
    *   **Key Components:** `nz-table`, `nz-form`, `nz-modal`, `nz-notification`.

### 4.2 Backend (Reference)
*   **API:** .NET Core Web API (Clean Architecture).
*   **Database:** SQL Server.
*   **ORM:** Entity Framework Core.

---

## 5. Non-Functional Requirements

### 5.1 Performance
*   **Load Time:** Initial dashboard load under 2 seconds.
*   **Responsiveness:** UI must be fully responsive on Desktop, Tablet, and Mobile devices.

### 5.2 Security
*   **Data Protection:** Passwords encrypted using bcrypt/Argon2.
*   **API Security:** All API endpoints protected via JWT Bearer tokens.
*   **Validation:** Strict input validation on both Frontend and Backend.

### 5.3 Reliability
*   **Error Handling:** Global Error Interceptor for consistent user feedback (Toastr/Alerts).
*   **Availability:** 99.9% uptime target.

---

## 6. UI/UX Guidelines
*   **Theme:** Professional Corporate Theme (Blue/White primary colors).
*   **Feedback:** Visual indicators for Loading states (Spinners) and Actions (Success/Error Toasts).
*   **Navigation:** Sidebar navigation for primary modules.

---

## 7. Roadmap (Future Versions)
*   **v1.1:** Employee Profile Image Upload.
*   **v1.2:** Bulk Import/Export (Excel/CSV).
*   **v2.0:** Dashboard with Charts and Analytics.
