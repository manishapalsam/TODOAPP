using System.ComponentModel.DataAnnotations;

namespace ToDoAppBackend.Models
{
    public class Category
    {
        [Key]
        public int  CategoryId { get; set; }

        [Required]
        [MaxLength(50)]
        public string CategoryName { get; set; }


        public ICollection<TodoList> todoTasks { get; set; }
    }
}
