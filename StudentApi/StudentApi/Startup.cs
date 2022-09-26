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

        services.AddCors();
        services.AddScoped<IStudentService, StudentsService>();

        services.AddCors(options => options.AddPolicy("ApiCorsPolicy", builder => {
            builder.WithOrigins("http://127.0.0.1:5173").AllowAnyMethod().AllowAnyHeader();
        }));

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
        app.UseCors("ApiCorsPolicy");
       
        //**

        app.UseHttpsRedirection();
        app.UseRouting();
        app.UseAuthorization();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
                
    }
}