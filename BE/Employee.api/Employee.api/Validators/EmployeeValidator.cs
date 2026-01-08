using FluentValidation;
using Emp = Employee.api.Model.Employee;

namespace Employee.api.Validators
{
    public class EmployeeValidator : AbstractValidator<Emp>
    {
        public EmployeeValidator()
        {
            RuleFor(e => e.Name).NotEmpty().MaximumLength(50);
            RuleFor(e => e.ContactNo).NotEmpty().Length(10);
            RuleFor(e => e.City).NotEmpty().MaximumLength(50);
            RuleFor(e => e.Email).EmailAddress();
            RuleFor(e => e.State).NotEmpty().MaximumLength(50);
            RuleFor(e => e.Pincode).NotEmpty().Length(6);
            RuleFor(e => e.Address).NotEmpty().MaximumLength(2000);
            RuleFor(e => e.DesignationId).NotEmpty();

        // This rule applies only on create.
        RuleFor(e => e.Password).NotEmpty().MinimumLength(8).MaximumLength(100)
            .When(e => e.EmployeeId == 0, ApplyConditionTo.CurrentValidator);

        // This rule applies only on update.
        RuleFor(e => e.Password).MinimumLength(8).MaximumLength(100)
            .When(e => e.EmployeeId != 0 && !string.IsNullOrEmpty(e.Password), ApplyConditionTo.CurrentValidator);
        }
    }
}
