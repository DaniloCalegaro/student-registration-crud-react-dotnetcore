using Microsoft.EntityFrameworkCore;
using StudentApi.Context;
using StudentApi.Models;

namespace StudentApi.Services {
    public class StudentsService : IStudentService {
        private readonly AppDbContext _context;

        public StudentsService(AppDbContext context) {
            _context = context;
        }

        public async Task<IEnumerable<Student>> GetStudents() {
            try {
                return await _context.Students.ToListAsync();
            }
            catch {
                throw;
            }
        }

        public async Task<Student> GetStudent(int id) {
            var student = await _context.Students.FindAsync(id);
            return student;
        }

        public async Task<IEnumerable<Student>> GetStudentsByName(string name) {
            IEnumerable<Student> students;
            if (!string.IsNullOrWhiteSpace(name)) {
                students = await _context.Students.Where(n => n.Name.Contains(name)).ToListAsync();
            } else {
                students = await GetStudents();
            }
            return students;
        }

        public async Task CreateStudent(Student student) {
            _context.Students.Add(student); 
            await _context.SaveChangesAsync(); // persiste no DB
        }

        public async Task UpdateStudent(Student student) {
            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteStudent(Student student) {
            _context.Students.Remove(student);
            await _context.SaveChangesAsync(); 
        }
    }
}
