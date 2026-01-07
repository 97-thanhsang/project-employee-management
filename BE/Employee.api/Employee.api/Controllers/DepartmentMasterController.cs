using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Employee.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentMasterController : ControllerBase
    {
        private readonly Model.EmployeeDbContext _context;
        public DepartmentMasterController(Model.EmployeeDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetDepartments()
        {
            try
            {
                var departments = _context.Departments.ToList();
                return Ok(departments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }
    }
}
