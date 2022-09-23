import { toast } from 'react-toastify'
import { api } from '../services/api'
import { AddressBook } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ModalAddStudant } from '../components/ModalAddStudant'
import { Student } from '../types'
import { ModalEditStudant } from '../components/ModalEditStudant'
import { ModalConfirmRemove } from '../components/ModalConfirmRemove'

export type AddStudent = Omit<Student, 'id'>

export function Dashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [editingStudent, setEditingStudent] = useState<Student>({} as Student)
  const [selectedStudentRemove, setSelectedStudentRemove] = useState<Student>(
    {} as Student
  )
  const [modalOpenAddStudant, setOpenModalAddStudent] = useState(false)
  const [modalOpenEditStudant, setOpenModalEditStudent] = useState(false)
  const [modalOpenDeleteStudant, setOpenModalDeletetudent] = useState(false)

  useEffect(() => {
    async function getStudents() {
      const response = await api.get('/students')

      const data = response.data

      setStudents(data)
    }
    getStudents()
  }, [])

  async function addStudent(student: AddStudent) {
    try {
      const response = await api.post('/students', student)
      setStudents([...students, response.data])
    } catch (err) {
      console.log(err)
      toast.error('Falha durante o processo')
    }
  }

  async function removeStudent(studentId: number) {
    try {
      const response = await api.delete(`students/${studentId}`)
      const updateStudent = [...students]
      const studentIndex = updateStudent.findIndex(
        student => student.id === studentId
      )
      if (studentIndex >= 0) {
        updateStudent.splice(studentIndex, 1)
        setStudents(updateStudent)
      } else {
        throw Error()
      }
    } catch (err) {
      toast.error('Falha durante o processo')
    }
  }

  async function updateStudent(student: Student) {
    try {
      const response = await api.put(`/students/${student.id}`, student)

      const studentsUpdated = students.map(s =>
        s.id !== student.id ? s : student
      )

      setStudents(studentsUpdated)
    } catch (err) {
      toast.error('Falha durante o processo')
    }
  }

  async function handleRemoveStudent(student: Student) {
    setSelectedStudentRemove(student)
    setOpenModalDeletetudent(true)
  }

  async function handleEditStudent(student: Student) {
    setEditingStudent(student)
    setOpenModalEditStudent(true)
  }

  function toggleModalAdd() {
    setOpenModalAddStudent(!modalOpenAddStudant)
  }

  function toggleModalEdit() {
    setOpenModalEditStudent(!modalOpenEditStudant)
  }

  function toggleModalConfirm() {
    setOpenModalDeletetudent(!modalOpenDeleteStudant)
  }
  //console.log(modalOpenEditStudant)

  return (
    <div className="ms-5 me-5">
      <br />
      <h3 className="text-center">Cadastro de Alunos</h3>
      <header className="mb-3">
        <AddressBook size={48} />
        <button className="btn btn-success" onClick={toggleModalAdd}>
          Incluir Novo Aluno
        </button>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Idade</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr className="align-middle" key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td className="d-flex ">
                <button
                  className="btn btn-primary btn-sm me-1 w-100"
                  onClick={() => handleEditStudent(student)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleRemoveStudent(student)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAddStudant
        isOpen={modalOpenAddStudant}
        setIsOpen={toggleModalAdd}
        addStudent={addStudent}
      />

      <ModalEditStudant
        isOpen={modalOpenEditStudant}
        setIsOpen={toggleModalEdit}
        editingStudent={editingStudent}
        updateStudent={updateStudent}
      />

      <ModalConfirmRemove
        isOpen={modalOpenDeleteStudant}
        setIsOpen={toggleModalConfirm}
        selectedStudentRemove={selectedStudentRemove}
        removeStudent={removeStudent}
      />
    </div>
  )
}
