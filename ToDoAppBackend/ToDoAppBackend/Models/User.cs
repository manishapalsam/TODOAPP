using System.ComponentModel.DataAnnotations;

namespace ToDoAppBackend.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string UserName { get; set; }

        [Required]
        
        public string Email { get; set; }
        public ICollection <TodoList> TodoLists { get; set; }

    }
}
