using Employee.api.Model;
using FluentValidation;

namespace Employee.api.Validators
{
    public class DepartmentValidator : AbstractValidator<Department>
    {
        public DepartmentValidator()
        {
            RuleFor(d => d.DepartmentName).NotEmpty().MaximumLength(50);
        }
    }
}
