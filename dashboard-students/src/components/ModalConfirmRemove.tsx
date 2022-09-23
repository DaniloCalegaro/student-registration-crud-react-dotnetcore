import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { Student } from '../types'

interface ModalConfirmRemoveProps {
  isOpen: boolean
  setIsOpen: () => void
  selectedStudentRemove: Student
  removeStudent: (id: number) => void
}

export function ModalConfirmRemove({
  isOpen,
  setIsOpen,
  selectedStudentRemove,
  removeStudent
}: ModalConfirmRemoveProps) {
  function handleRemoveStudent() {
    removeStudent(selectedStudentRemove.id)
    setIsOpen()
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalBody>
        Confirma a exclusão deste aluno: {selectedStudentRemove.name} ?
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleRemoveStudent}
        >
          Sim
        </button>
        <button type="button" className="btn btn-secundary" onClick={setIsOpen}>
          Nao
        </button>
      </ModalFooter>
    </Modal>
  )
}
