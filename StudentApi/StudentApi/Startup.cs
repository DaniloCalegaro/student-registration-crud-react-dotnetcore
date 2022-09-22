using Microsoft.EntityFrameworkCore;
using StudentApi.Context;
using StudentApi.Services;

class Startup {
    public Startup(IConfiguration configuration) {
        Configuration = configuration;
    }
    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services) {
        services.AddDbContext<AppDbContext>(options => {
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
        });

        services.AddScoped<IStudentService, StudentsService>(); 

        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c => {
            c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "StudentsAPI", Version = "v1" });
        });

    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment environment) {
        if (environment.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "StudentsApi v1"));
        }
        
        //** Restringe apenas ao local da aplicação fronte end
        app.UseCors(options => {
            options.WithOrigins("http://localhost:5173"); 
            options.AllowAnyMethod();
            options.AllowAnyHeader();
        });
        //**

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
                
    }
}