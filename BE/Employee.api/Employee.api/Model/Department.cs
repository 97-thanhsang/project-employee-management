using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employee.api.Model
{
    [Table("departmentTbl")]
    public class Department
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("departmentId")]
        public int DepartmentId { get; set; }
        [Required,MaxLength(50)]
        [Column("departmentName")]
        public string DepartmentName { get; set; } = string.Empty;
        [Column("isActive")]
        public bool IsActive { get; set; }
    }
}
