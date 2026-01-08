using Employee.api.Helpers;
using Employee.api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using BCrypt.Net;
using Emp = Employee.api.Model.Employee;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public EmployeeMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            try
            {
                IQueryable<Emp> employees = _context.Employees;

                // Filtering
                if (!string.IsNullOrEmpty(queryParameters.Filter))
                {
                    employees = employees.Where(e => e.name.Contains(queryParameters.Filter));
                }

                // Sorting
                if (!string.IsNullOrEmpty(queryParameters.SortBy))
                {
                    if (string.Equals(queryParameters.SortOrder, "desc", StringComparison.OrdinalIgnoreCase))
                    {
                        employees = employees.OrderBy($"{queryParameters.SortBy} descending");
                    }
                    else
                    {
                        employees = employees.OrderBy(queryParameters.SortBy);
                    }
                }

                // Paging
                var pagedEmployees = await employees.Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                                     .Take(queryParameters.PageSize)
                                     .ToListAsync();

                return Ok(new ApiResponse(200, pagedEmployees));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee == null)
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }
                return Ok(new ApiResponse(200, employee));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Emp employee)
        {
            try
            {
                employee.createDate = DateTime.UtcNow;
                employee.password = BCrypt.Net.BCrypt.HashPassword(employee.password);
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
                
                employee.password = string.Empty; // Don't return the hash
                var response = new ApiResponse(201, employee);
                return CreatedAtAction(nameof(GetById), new { id = employee.employeeId }, response);
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Emp employee)
        {
            if (id != employee.employeeId)
            {
                return BadRequest(new ApiResponse(400, null, "Employee ID mismatch"));
            }
            
            var existingEmployee = await _context.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.employeeId == id);
            if (existingEmployee == null)
            {
                return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
            }

            employee.modifiedData = DateTime.UtcNow;
            
            // If a new password is provided, hash it. Otherwise, keep the existing one.
            if (!string.IsNullOrEmpty(employee.password))
            {
                employee.password = BCrypt.Net.BCrypt.HashPassword(employee.password);
            }
            else
            {
                employee.password = existingEmployee.password;
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Employees.Any(e => e.employeeId == id))
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }
                else
                {
                    throw;
                }
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
            
            employee.password = string.Empty; // Don't return the hash
            return Ok(new ApiResponse(200, employee));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee == null)
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }

                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse(200, null, "Employee deleted successfully."));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }
    }
}
