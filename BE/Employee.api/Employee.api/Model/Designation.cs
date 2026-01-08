using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Employee.api.Model
{
    [Table("designationTbl")]

    public class Designation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("designationId")]
        public int DesignationId { get; set; }
        [Column("departmentId")]
        public int DepartmentId { get; set; }
        [Required, MaxLength(50)]
        [Column("designationName")]
        public string DesignationName { get; set; } = string.Empty;
    }
}
