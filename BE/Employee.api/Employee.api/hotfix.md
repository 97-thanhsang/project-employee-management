Act as a Senior .NET Backend Developer. I need to refactor my current ASP.NET Core 8 Web API project to follow industry best practices, naming conventions, and security standards.

Here is the current status of my project:
1.  **Models** currently use camelCase (e.g., `departmentId`), which violates C# PascalCase convention.
2.  **Database** columns are in camelCase.
3.  **Typo:** There is a field named `modifiedData` which should be `modifiedDate`.
4.  **Security:** Passwords are currently stored as plain text (Bad practice).
5.  **CORS:** I need to allow my Angular app (http://localhost:4200) to access the API.

Please perform the following tasks:

### Task 1: Refactor Models
Refactor the C# Model classes (`Department`, `Designation`, `Employee`) to use **PascalCase** for properties (e.g., `DepartmentId`).
* **Crucial:** Add `[Column("name")]` or `[JsonPropertyName("name")]` attributes to ensure they still map correctly to my existing SQL Database columns and output camelCase JSON for the Frontend.
* Fix the typo `modifiedData` to `modifiedDate` in the Employee model.

### Task 2: Implement Password Hashing
Provide a simple logic (using `BCrypt.Net-Next` or standard hashing) inside the `EmployeeMasterController` (Create/Register method) and `AuthController` (Login method).
* Do NOT compare plain text passwords.

### Task 3: Configure Program.cs
Write the code snippet for `Program.cs` to:
1.  Enable CORS for `http://localhost:4200`.
2.  Configure JSON serialization to use `CamelCaseNamingPolicy` (so Frontend receives `departmentId` even if C# uses `DepartmentId`).

---
Here are my current models for reference: