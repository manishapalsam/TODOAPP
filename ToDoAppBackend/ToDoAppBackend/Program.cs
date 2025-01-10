
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ToDoAppBackend.Data;

namespace ToDoAppBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.



            //to use ToDoDbContext and sql server to connect to database
            builder.Services.AddDbContext<ToDoDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            //for json data extend controller service
            builder.Services.AddControllers().AddNewtonsoftJson(options => {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

            });

            //handle cors(cross origin resource sharing)
            //using named policy
            builder.Services.AddCors(options => options.AddPolicy("MyTestCORS",policy => 
            {
                policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            }));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
           
            var app = builder.Build();

           

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("MyTestCORS");//ENABLE CORS
            app.UseAuthorization();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ToDoDbContext>();
                    context.Database.Migrate(); // Apply migrations
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error applying migrations: {ex.Message}");
                }
            }
            app.MapControllers();

            app.Run();
        }
    }
}
