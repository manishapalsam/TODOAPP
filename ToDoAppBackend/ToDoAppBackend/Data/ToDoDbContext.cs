using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using ToDoAppBackend.Models;

namespace ToDoAppBackend.Data
{
    public class ToDoDbContext : DbContext
    {
        public ToDoDbContext(DbContextOptions<ToDoDbContext> options) : base(options)
        { }
           
        

        // Entities
        public  DbSet<Priority> Priorities { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<TodoList> TodoLists { get; set; }

        // Override OnModelCreating to add data
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);  // Call the base method

            // Add data for categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Work" },
                new Category { CategoryId = 2, CategoryName = "Personal" }
            );

            // Add data for priorities
            modelBuilder.Entity<Priority>().HasData(
                new Priority { PriorityId = 1, Level = "High" },
                new Priority { PriorityId = 2, Level = "Medium" },
                new Priority { PriorityId = 3, Level = "Low" }
            );
        }
    }
}
