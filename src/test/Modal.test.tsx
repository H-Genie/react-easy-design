import { render, screen } from "@testing-library/react"
import Modal from "../components/Modal"
import { describe, it, expect } from "vitest"

describe("Modal Component", () => {
  it("renders children when open", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.getByText("Modal Content")).toBeInTheDocument()
  })

  it("does not render children when closed", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    )

    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument()
  })
})
