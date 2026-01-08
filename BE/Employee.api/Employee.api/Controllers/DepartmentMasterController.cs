using Employee.api.Helpers;
using Employee.api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public DepartmentMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            try
            {
                IQueryable<Department> departments = _context.Departments;

                // Filtering
                if (!string.IsNullOrEmpty(queryParameters.Filter))
                {
                    departments = departments.Where(d => d.DepartmentName.Contains(queryParameters.Filter));
                }

                // Sorting
                if (!string.IsNullOrEmpty(queryParameters.SortBy))
                {
                    if (string.Equals(queryParameters.SortOrder, "desc", StringComparison.OrdinalIgnoreCase))
                    {
                        departments = departments.OrderBy($"{queryParameters.SortBy} descending");
                    }
                    else
                    {
                        departments = departments.OrderBy(queryParameters.SortBy);
                    }
                }

                // Paging
                var pagedDepartments = await departments.Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                                     .Take(queryParameters.PageSize)
                                     .ToListAsync();

                return Ok(new ApiResponse(200, pagedDepartments));
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
                var department = await _context.Departments.FindAsync(id);
                if (department == null)
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }
                return Ok(new ApiResponse(200, department));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Department department)
        {
            try
            {
                _context.Departments.Add(department);
                await _context.SaveChangesAsync();
                var response = new ApiResponse(201, department);
                return CreatedAtAction(nameof(GetById), new { id = department.DepartmentId }, response);
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest(new ApiResponse(400, null, "Department ID mismatch"));
            }

            _context.Entry(department).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Departments.Any(e => e.DepartmentId == id))
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

            return Ok(new ApiResponse(200, department));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var department = await _context.Departments.FindAsync(id);
                if (department == null)
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }

                _context.Departments.Remove(department);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse(200, null, "Department deleted successfully."));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }
    }
}
