using FluentValidation;
using Emp = Employee.api.Model.Employee;

namespace Employee.api.Validators
{
    public class EmployeeValidator : AbstractValidator<Emp>
    {
        public EmployeeValidator()
        {
            RuleFor(e => e.name).NotEmpty().MaximumLength(50);
            RuleFor(e => e.contactNo).NotEmpty().Length(10);
            RuleFor(e => e.city).NotEmpty().MaximumLength(50);
            RuleFor(e => e.email).EmailAddress();
            RuleFor(e => e.state).NotEmpty().MaximumLength(50);
            RuleFor(e => e.pincode).NotEmpty().Length(6);
            RuleFor(e => e.address).NotEmpty().MaximumLength(2000);
            RuleFor(e => e.designationId).NotEmpty();
        }
    }
}
