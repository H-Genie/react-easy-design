import { useState } from "react"
import Modal from "./components/Modal"

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}>Modal Open</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Modal>
    </>
  )
}
