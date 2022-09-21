using Microsoft.EntityFrameworkCore;
using StudentApi.Models;

namespace StudentApi.Context {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {
        }

        public DbSet<Student> Students { get; set; }

        // Popular tabela quando não existir dados
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Student>().HasData(
                new Student {
                    Id = 1,
                    Name = "Danilo Calegaro",
                    Email = "danilo.calegaro@hotmail.com",
                    Age = 32
                },
                new Student {
                    Id = 2,
                    Name = "José Ricardo",
                    Email = "josericardo@hotmail.com",
                    Age = 23
                }
             );
        }
    }
}
