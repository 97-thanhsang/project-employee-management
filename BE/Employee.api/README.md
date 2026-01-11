# ⚙️ Employee Management API (.NET 8)

This is the backend service for the Employee Management System, built with **.NET 8** and following **Clean Architecture** principles.

## 🛠️ Tech Stack

-   **Framework:** [.NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
-   **Database:** SQL Server 2022
-   **ORM:** Entity Framework Core 8
-   **Mapping:** AutoMapper
-   **Documentation:** Swagger / OpenAPI
-   **Architecture:** Clean Architecture (Domain, Application, Infrastructure, API)

## 🏗️ Architecture Overview

The solution is organized into layers to ensure separation of concerns:

-   **Domain Layer:** Core entities, interfaces, and business rules. No external dependencies.
-   **Application Layer:** Business logic, DTOs, Service interfaces, and Mapping profiles. Depends on Domain.
-   **Infrastructure Layer:** Database context, Repositories, Migrations, and external service implementations. Depends on Application.
-   **API Layer (Employee.api):** Controllers, Middleware, Dependency Injection setup. Entry point of the application.

## 🚀 Getting Started

### Prerequisites

-   [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
-   [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (Developer or Express edition)

### Database Setup

1.  Make sure SQL Server is running.
2.  Update the connection string in `appsettings.json` (or `appsettings.Development.json`) if necessary:
    ```json
    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Database=EmployeeDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
    }
    ```
3.  Run migrations (optional if using the provided SQL script):
    ```bash
    dotnet ef database update
    ```

### Running the API

1.  Navigate to the API folder:
    ```bash
    cd BE/Employee.api
    ```
2.  Restore dependencies:
    ```bash
    dotnet restore
    ```
3.  Run the application:
    ```bash
    dotnet run
    ```
4.  Open your browser to the Swagger UI: `http://localhost:5000/swagger` (or the port indicated in the console).

## 🔑 Key Features

-   **Repository Pattern:** key abstraction for data access.
-   **Unit of Work:** ensures transaction consistency.
-   **Global Exception Handling:** uniform error responses.
-   **DTOs (Data Transfer Objects):** used to decouple internal entities from the API contract.
-   **Dependeny Injection:** extensive use of .NET's built-in DI container.
