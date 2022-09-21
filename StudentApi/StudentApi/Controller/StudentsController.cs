using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentApi.Models;
using StudentApi.Services;

namespace StudentApi.Controller {
    [Route("api/[controller]")]
    [ApiController]
    //[Produces("application/json")] // default
    public class StudentsController : ControllerBase {
        private IStudentService _studentService;

        public StudentsController(IStudentService studentService) {
            _studentService = studentService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)] // codigos tratados pelo httpget
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudents() {
            try {
                var students = await _studentService.GetStudents();
                return Ok(students);
            } catch {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter lista de alunos");
            }
        }

        [HttpGet("StudentsByName")]
        public async Task<ActionResult<IAsyncEnumerable<Student>>> GetStudentsByName([FromQuery] string name) {
            try {
                var students = await _studentService.GetStudentsByName(name);
                if (students.Count() == 0)
                    return NotFound($"Não existem alunos com o critério {name}");

                return Ok(students);
            }
            catch {
                return BadRequest("Request invalid");
            }
        }

        [HttpGet("{id:int}", Name="GetStudent")]
        public async Task<ActionResult<Student>> GetStudent(int id) {
            try {
                var student = await _studentService.GetStudent(id);
                if (student == null)
                    return NotFound($"Não existe aluno com id={id}");

                return Ok(student);
            }
            catch {
                return BadRequest("Request invalid");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(Student student) {
            try {
                await _studentService.CreateStudent(student);
                return CreatedAtRoute(nameof(GetStudent), new { id = student.Id}, student);
            } catch {
                return BadRequest("Request invalid");
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Edit(int id, [FromBody] Student student) {
            try {
                if(student.Id == id) {
                    await _studentService.UpdateStudent(student);
                    //return NoContent(); // return 204
                    return Ok($"Aluno com id={id} foi atualizado com sucesso");
                } else {
                    return BadRequest("Dados inconsistentes");
                }
            }
            catch {
                return BadRequest("Request invalid");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id) {
            try {
                var student = await _studentService.GetStudent(id);
                if(student != null) {
                    await _studentService.DeleteStudent(student);
                    return Ok($"Aluno de id={id} foi excluido com sucesso");
                } else {
                    return NotFound($"Aluno de id={id} não encontrado");
                }
            }
            catch {
                return BadRequest("Request invalid");
            }
        }
    }
}
