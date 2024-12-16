import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { showMessage, MessageHandler } from "../components/Message"

describe("MessageHandler Component", () => {
  it("메세지 렌더링", () => {
    render(<MessageHandler />)
    const container = screen.getByRole("alert")
    expect(container).toBeInTheDocument()
  })

  it("showMessage가 호출되면 메시지를 표시", async () => {
    render(<MessageHandler />)

    showMessage("Test message", "info")

    const messageElement = await screen.findByText("Test message")
    expect(messageElement).toBeInTheDocument()
  })

  it("setTimeout 후 메세지 제거", async () => {
    render(<MessageHandler />)
    showMessage("Temporary message", "warning")

    const messageElement = await screen.findByText("Temporary message")
    expect(messageElement).toBeInTheDocument()

    await new Promise(r => setTimeout(r, 1500))

    expect(screen.queryByText("Temporary message")).not.toBeInTheDocument()
  })
})
