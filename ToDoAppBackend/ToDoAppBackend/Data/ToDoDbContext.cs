using Microsoft.EntityFrameworkCore;
using ToDoAppBackend.Models;

namespace ToDoAppBackend.Data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options) {}
        //Entites
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }
    }
}
