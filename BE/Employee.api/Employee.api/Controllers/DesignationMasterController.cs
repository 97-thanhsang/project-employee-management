using Employee.api.Helpers;
using Employee.api.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DesignationMasterController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        public DesignationMasterController(EmployeeDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryParameters queryParameters)
        {
            try
            {
                IQueryable<Designation> designations = _context.Designations;

                // Filtering
                if (!string.IsNullOrEmpty(queryParameters.Filter))
                {
                    designations = designations.Where(d => d.designationName.Contains(queryParameters.Filter));
                }

                // Sorting
                if (!string.IsNullOrEmpty(queryParameters.SortBy))
                {
                    if (string.Equals(queryParameters.SortOrder, "desc", StringComparison.OrdinalIgnoreCase))
                    {
                        designations = designations.OrderBy($"{queryParameters.SortBy} descending");
                    }
                    else
                    {
                        designations = designations.OrderBy(queryParameters.SortBy);
                    }
                }

                // Paging
                var pagedDesignations = await designations.Skip((queryParameters.PageNumber - 1) * queryParameters.PageSize)
                                     .Take(queryParameters.PageSize)
                                     .ToListAsync();

                return Ok(new ApiResponse(200, pagedDesignations));
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
                var designation = await _context.Designations.FindAsync(id);
                if (designation == null)
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }
                return Ok(new ApiResponse(200, designation));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Designation designation)
        {
            try
            {
                _context.Designations.Add(designation);
                await _context.SaveChangesAsync();
                var response = new ApiResponse(201, designation);
                return CreatedAtAction(nameof(GetById), new { id = designation.designationId }, response);
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Designation designation)
        {
            if (id != designation.designationId)
            {
                return BadRequest(new ApiResponse(400, null, "Designation ID mismatch"));
            }

            _context.Entry(designation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Designations.Any(e => e.designationId == id))
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

            return Ok(new ApiResponse(200, designation));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var designation = await _context.Designations.FindAsync(id);
                if (designation == null)
                {
                    return NotFound(new ApiResponse(404, null, ErrorMessages.NotFound, ErrorCodes.NotFound));
                }

                _context.Designations.Remove(designation);
                await _context.SaveChangesAsync();

                return Ok(new ApiResponse(200, null, "Designation deleted successfully."));
            }
            catch (Exception)
            {
                return StatusCode(500, new ApiResponse(500, null, ErrorMessages.InternalServerError, ErrorCodes.InternalServerError));
            }
        }
    }
}
