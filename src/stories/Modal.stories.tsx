import { useState } from "react"
import { Meta, StoryFn } from "@storybook/react"
import Modal, { ModalProps } from "../components/Modal"

export default {
  title: "Components/Modal", // 스토리북에서 표시될 컴포넌트 이름
  component: Modal, // 연결된 컴포넌트
  argTypes: {
    isOpen: { control: "boolean" },
    backdrop: { control: { type: "range", min: 0, max: 1, step: 0.01 } }, // 슬라이더로 제어
    style: { control: "object" }
  }
} as Meta

const Template: StoryFn<ModalProps> = args => {
  const [open, setOpen] = useState(args.open)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <button onClick={handleOpen}>Open Modal</button>
      <Modal {...args} open={open} onClose={handleClose}>
        <h2>Modal Title</h2>
        <p>This is the content of the modal.</p>
      </Modal>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  open: false,
  backdrop: 0.5,
  style: { width: "400px", padding: "20px" }
}
