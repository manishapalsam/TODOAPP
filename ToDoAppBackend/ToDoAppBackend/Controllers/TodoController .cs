using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using ToDoAppBackend.Data;
using ToDoAppBackend.Models;
using System.Threading.Tasks;

namespace ToDoAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ToDoDbContext db;

        public TodoController(ToDoDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoList>>> GetTodos(string type)
        
        {
            try
            {
                // var category = await db.Categories.FirstOrDefaultAsync(c => c.CategoryName == type);
                var todos = await db.TodoLists
                    .Include(t => t.Priority)
                    .Include(t => t.Category)
                    .Where(t => t.Category.CategoryName == type)
                     .OrderBy(t => t.PriorityId) // Order by CategoryId
                    .ToListAsync();
                    
                    return Ok(todos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server error");
            }
        }

        [HttpGet("create-task")]
        public async Task<ActionResult> CreateTask() {

            try
            {
                var priorityList = await db.Priorities.ToListAsync();
                var categoryList = await db.Categories.ToListAsync();

                //check for empty list
                if (!priorityList.Any() || !categoryList.Any())
                {
                    return StatusCode(500, $"Internal Server Error");
                }
                var result = new
                {
                    Priorities = priorityList,
                    Categories = categoryList
                };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<TodoList>> Create(TodoList todoList)
        {
            try
            {
                // Check if a task with the same name and category already exists
                var existingTask = await db.TodoLists
                    .FirstOrDefaultAsync(t => t.TaskName == todoList.TaskName && t.CategoryId == todoList.CategoryId);

                if (existingTask != null)
                {
                    return Conflict("Task with the same name and category already exists." );
                }

                todoList.CreatedAt = DateTime.Now;
                db.TodoLists.Add(todoList);
                await db.SaveChangesAsync();//save changes to database
                return Ok("Task Created Successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server error");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<TodoList>>> Update(int? id, TodoList updatedTodoList)
        {
            var dbTodo = await db.TodoLists.FindAsync(id);
            if (dbTodo == null)
                return NotFound("Record not found");
            try
            {
                // Check if a task with the same name and category already exists
                var existingTask = await db.TodoLists
                    .FirstOrDefaultAsync(t => t.Id != id  && t.TaskName == updatedTodoList.TaskName && t.CategoryId == updatedTodoList.CategoryId);

                if (existingTask != null)
                {
                    return Conflict("Task with the same name and category already exists.");
                }
                dbTodo.TaskName = updatedTodoList.TaskName;
                dbTodo.PriorityId = updatedTodoList.PriorityId;
                dbTodo.CategoryId = updatedTodoList.CategoryId;
                dbTodo.IsCompleted = updatedTodoList.IsCompleted;
                dbTodo.UpdatedAt = DateTime.Now;

                await db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server error");
            }
        }

       
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<TodoList>>> Delete(int? id)
        {
            try
            {
                var dbTodo = await db.TodoLists.FindAsync(id);
                if (dbTodo == null)
                    return NotFound("Record not found");
           
                    db.TodoLists.Remove(dbTodo);
                    await db.SaveChangesAsync();
                    return Ok();
            }catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server error");
            }
        }
    }
}
