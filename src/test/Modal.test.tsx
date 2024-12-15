import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import Modal from "../components/Modal"

describe("Modal Component", () => {
  it("모달이 열려 있을때 자식요소 렌더링", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.getByText("Modal Content")).toBeInTheDocument()
  })

  it("모달이 닫혀잇을때 자식요소 렌더링하지 않음", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument()
  })

  it("닫기 버튼 눌렀을 때 onClose 함수 호출", async () => {
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const closeButton = screen.getByRole("button")
    await userEvent.click(closeButton)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("모달 바깥쪽 클릭했을 때 onClose 함수 호출", async () => {
    const handleClose = vi.fn()
    render(
      <Modal open={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    )

    const dialogElement = screen.getByRole("dialog")
    await userEvent.click(dialogElement)

    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("사용자정의 스타일과 불투명도 적용", () => {
    const customStyle = { color: "red" }
    render(
      <Modal open={true} onClose={() => {}} style={customStyle} backdrop={0.5}>
        <div>Styled Modal</div>
      </Modal>
    )

    const dialogElement = screen.getByRole("dialog")

    expect(dialogElement).toHaveStyle({ color: "rgb(255, 0, 0)" })
    expect(dialogElement).toHaveStyle({ "--backdrop-opacity": "0.5" })
  })
})
