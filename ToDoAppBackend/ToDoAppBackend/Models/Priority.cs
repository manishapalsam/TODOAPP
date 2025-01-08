using System.ComponentModel.DataAnnotations;

namespace ToDoAppBackend.Models
{
    public class Priority
    {
        [Key]
        public int PriorityId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Level { get; set; }
        public ICollection<TodoList> TodoLists { get; set; }
    }
}
