using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employee.api.Model
{
    [Table("employeeTbl")]

    public class Employee
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("employeeId")]
        public int EmployeeId { get; set; }
        [Required, MaxLength(50)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;
        [Required, MaxLength(10),MinLength(10)]
        [Column("contactNo")]
        public string ContactNo { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        [Column("city")]
        public string City { get; set; } = string.Empty;
        [Column("email")]
        public string Email { get; set; } = string.Empty;
        [Required, MaxLength(50)]
        [Column("state")]
        public string State { get; set; } = string.Empty;
        [Required, MaxLength(6)]
        [Column("pincode")]
        public string Pincode { get; set; } = string.Empty;
        [Column("altContactNo")]
        public string AltContactNo { get; set; } = string.Empty;
        [Required, MaxLength(2000)]
        [Column("address")]
        public string Address { get; set; } = string.Empty;
        [Column("designationId")]
        public int DesignationId { get; set; } 
        [Column("createDate")]
        public DateTime CreateDate { get; set; }
        [Column("modifiedDate")] // Correcting typo but keeping DB column name
        public DateTime ModifiedDate { get; set; }
        [Required, MaxLength(100)]
        [Column("password")]
        public string Password { get; set; } = string.Empty;
    }
}
