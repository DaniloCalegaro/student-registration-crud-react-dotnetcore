import { AddressBook } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { ModalAddStudant } from '../components/ModalAddStudant'
import { api } from '../services/api'
import { Student } from '../types'

export type AddStudent = Omit<Student, 'id'>

export function Dashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [modalOpenAddStudant, setOpenModalAddStudent] = useState(false)

  useEffect(() => {
    async function getStudents() {
      const response = await api.get('/students')

      const data = response.data

      setStudents(data)
    }
    getStudents()
  }, [])

  async function handleAddStudent(student: AddStudent) {
    try {
      // const response = await api.post('/students', {
      //   student
      // })
      // setStudents([...students, response.data])
      console.log(student)
    } catch (err) {
      console.log(err)
    }
  }

  const toggleModal = () => {
    setOpenModalAddStudent(!modalOpenAddStudant)
  }

  return (
    <div className="ms-5 me-5">
      <br />
      <h3 className="text-center">Cadastro de Alunos</h3>
      <header className="mb-3">
        <AddressBook size={48} />
        <button className="btn btn-success" onClick={toggleModal}>
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
                <button className="btn btn-primary btn-sm me-1 w-100">
                  Editar
                </button>
                <button className="btn btn-danger btn-sm w-100">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalAddStudant
        isOpen={modalOpenAddStudant}
        setIsOpen={toggleModal}
        handleAddStudent={handleAddStudent}
      />
    </div>
  )
}
