using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoAppBackend.Models
{
    public class TodoList
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string TaskName { get; set; }

        [Required]     
        public bool IsCompleted { get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }
      // [JsonIgnore]
        public Category? Category { get; set; }

      
        [ForeignKey("Priority")]
        public int PriorityId { get; set; }

      // [JsonIgnore]
        public Priority? Priority { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

    }
}
