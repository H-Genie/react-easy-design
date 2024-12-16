import { render, fireEvent, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import Dropdown from "../components/Dropdown"

describe("Dropdown Component", () => {
  const menu = [
    { key: "1", label: "Option 1" },
    { key: "2", label: "Option 2" },
    { key: "3", label: "Option 3" }
  ]

  it("자식요소 렌더링", () => {
    render(
      <Dropdown menu={menu}>
        <button>Open Dropdown</button>
      </Dropdown>
    )
    expect(screen.getByText("Open Dropdown")).toBeInTheDocument()
  })

  it("트리거 클릭시 드롭다운을 보여줌", () => {
    render(
      <Dropdown menu={menu}>
        <button>Open Dropdown</button>
      </Dropdown>
    )

    const toggleButton = screen.getByText("Open Dropdown")
    fireEvent.click(toggleButton)
    expect(screen.getByText("Option 1")).toBeInTheDocument()

    fireEvent.click(toggleButton)
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
  })

  it("바깥쪽을 클릭하면 드롭다운을 닫음", () => {
    render(
      <Dropdown menu={menu}>
        <button>Open Dropdown</button>
      </Dropdown>
    )

    const toggleButton = screen.getByText("Open Dropdown")
    fireEvent.click(toggleButton)
    expect(screen.getByText("Option 1")).toBeInTheDocument()

    fireEvent.mouseDown(document.body)
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument()
  })

  it("아이템을 클릭하면 onSelect를 호출", () => {
    const mockOnSelect = vi.fn()
    render(
      <Dropdown menu={menu} onSelect={mockOnSelect}>
        <button>Open Dropdown</button>
      </Dropdown>
    )

    fireEvent.click(screen.getByText("Open Dropdown"))
    fireEvent.click(screen.getByText("Option 2"))

    expect(mockOnSelect).toHaveBeenCalledWith({
      key: "2",
      label: "Option 2"
    })
    expect(mockOnSelect).toHaveBeenCalledTimes(1)
  })

  it("드롭다운 위치 테스트", () => {
    const { container } = render(
      <Dropdown menu={menu} placement="topLeft">
        <button>Open Dropdown</button>
      </Dropdown>
    )

    fireEvent.click(screen.getByText("Open Dropdown"))
    const menuElement = container.querySelector(".dropdown-menu")
    expect(menuElement).toHaveClass("topLeft")
  })
})
