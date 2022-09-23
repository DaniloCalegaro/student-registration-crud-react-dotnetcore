import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Student } from '../types'

interface ModalEditStudantProps {
  isOpen: boolean
  setIsOpen: () => void
  editingStudent: Student
  handleUpdateStudent: (studentEdit: Student) => void
}

export function ModalEditStudant({
  isOpen,
  setIsOpen,
  editingStudent,
  handleUpdateStudent
}: ModalEditStudantProps) {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)

  useEffect(() => {
    setId(editingStudent.id)
    setName(editingStudent.name)
    setEmail(editingStudent.email)
    setAge(editingStudent.age)
  }, [editingStudent])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const newValuesStudent = { id, name, email, age }
    handleUpdateStudent(newValuesStudent)
    setIsOpen()
  }

  function handleClose() {
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handleSubmit}>
        <ModalHeader> Incluir Alunos</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              defaultValue={editingStudent.name}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              defaultValue={editingStudent.email}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="age">Idade:</label>
            <input
              type="number"
              className="form-control"
              id="age"
              defaultValue={editingStudent.age}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAge(Number(event.target.value))
              }
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <button type="submit" className="btn btn-primary">
            Incluir
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Cancelar
          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
