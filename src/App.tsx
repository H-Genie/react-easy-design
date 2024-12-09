import { useState } from "react"
import Modal from "./components/Modal"

export default function App() {
  const [isModal, setIsModal] = useState(false)

  return (
    <div>
      <button onClick={() => setIsModal(true)}>모달 열기</button>
      <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
        안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요
      </Modal>
    </div>
  )
}
