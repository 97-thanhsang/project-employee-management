using Employee.api.Model;
using FluentValidation;

namespace Employee.api.Validators
{
    public class DesignationValidator : AbstractValidator<Designation>
    {
        public DesignationValidator()
        {
            RuleFor(d => d.DesignationName).NotEmpty().MaximumLength(50);
            RuleFor(d => d.DepartmentId).NotEmpty();
        }
    }
}
