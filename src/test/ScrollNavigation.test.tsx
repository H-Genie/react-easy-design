import { render, screen, fireEvent } from "@testing-library/react"
import { beforeAll, afterAll, describe, it, expect, vi } from "vitest"
import ScrollNavigation from "../components/ScrollNavigation"

const mockItems = ["section1", "section2", "section3", "section4"]

beforeAll(() => {
  mockItems.forEach((id, index) => {
    const mockElement = document.createElement("div")
    mockElement.id = id
    mockElement.style.position = "absolute"
    mockElement.style.top = `${index * 600}px`
    document.body.appendChild(mockElement)
  })

  Object.defineProperty(HTMLElement.prototype, "offsetTop", {
    get() {
      return parseInt(this.style.top || "0", 10)
    }
  })
  Object.defineProperty(window, "scrollTo", { value: vi.fn() })
  HTMLElement.prototype.scrollIntoView = vi.fn()
  window.scrollBy = vi.fn()
})

afterAll(() => {
  mockItems.forEach(id => {
    const mockElement = document.getElementById(id)
    if (mockElement) document.body.removeChild(mockElement)
  })
})

describe("ScrollNavigation", () => {
  it("아이템들을 네비게이션 목록으로 렌더링", () => {
    render(<ScrollNavigation items={mockItems} />)

    mockItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it("아이템을 클릭하면 selected 클래스 적용", () => {
    render(<ScrollNavigation items={mockItems} />)

    const navItem = screen.getByText("section2")
    fireEvent.click(navItem)

    const navItemContainer = navItem.closest(".scroll-navigation-item")
    expect(navItemContainer).toHaveClass("selected")
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it("스크롤 위치에 따라 selected 클래스 적용", () => {
    render(<ScrollNavigation items={mockItems} />)

    Object.defineProperty(window, "scrollY", { value: 650, writable: true })

    fireEvent.scroll(window)

    const selectedNavItem = screen
      .getByText("section2")
      .closest(".scroll-navigation-item")
    expect(selectedNavItem).toHaveClass("selected")
  })

  it("클릭한 아이템에 대한 css를 업데이트", () => {
    render(
      <ScrollNavigation
        items={mockItems}
        backgroundColor="#000"
        textColor="#fff"
      />
    )

    const navItem = screen.getByText("section3")
    fireEvent.click(navItem)

    expect(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--selected-background-color"
      )
    ).toBe("#000")

    expect(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--selected-color"
      )
    ).toBe("#fff")
  })

  it("새 아이템을 클릭하면 다른 항목의 selected 클래스를 제거", () => {
    render(<ScrollNavigation items={mockItems} />)

    const firstNavItem = screen.getByText("section1")
    const secondNavItem = screen.getByText("section2")

    fireEvent.click(firstNavItem)
    const firstNavItemContainer = firstNavItem.closest(
      ".scroll-navigation-item"
    )
    expect(firstNavItemContainer).toHaveClass("selected")

    fireEvent.click(secondNavItem)
    const secondNavItemContainer = secondNavItem.closest(
      ".scroll-navigation-item"
    )

    expect(firstNavItemContainer).not.toHaveClass("selected")
    expect(secondNavItemContainer).toHaveClass("selected")
  })
})
