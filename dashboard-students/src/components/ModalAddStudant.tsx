import { ChangeEvent, FormEvent, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { AddStudent } from '../pages/Dashboard'
import { Student } from '../types'

interface ModalAddStudantProps {
  isOpen: boolean
  setIsOpen: () => void
  addStudent: (student: AddStudent) => void
}

export function ModalAddStudant({
  isOpen,
  setIsOpen,
  addStudent
}: ModalAddStudantProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    addStudent({ name, email, age })
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
          <button className="btn btn-danger" onClick={setIsOpen}>
            Cancelar
          </button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
