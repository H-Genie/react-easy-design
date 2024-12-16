import { renderHook, act } from "@testing-library/react"
import { beforeEach, describe, it, expect, vi } from "vitest"
import { useDarkMode } from "../hooks/useDarkMode"

beforeEach(() => {
  globalThis.localStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    key: vi.fn(),
    length: 0
  } as Storage
})

describe("useDarkMode", () => {
  it("localStorage 값이 없을 때 기본 상태를 light-mode로 설정합니다", () => {
    globalThis.localStorage.getItem = vi.fn(() => {
      return "light"
    })
    const { result } = renderHook(() => useDarkMode())

    expect(result.current.isDarkMode).toBe(false)
    expect(document.body.className).toBe("light-mode")
  })

  it("localStorage 값이 dark일 때 초기 상태를 dark-mode로 설정합니다", () => {
    globalThis.localStorage.getItem = vi.fn(() => {
      return "dark"
    })
    const { result } = renderHook(() => useDarkMode())

    expect(result.current.isDarkMode).toBe(true)
    expect(document.body.className).toBe("dark-mode")
  })

  it("toggleDarkMode를 실행하여 상태를 변경합니다", () => {
    globalThis.localStorage.getItem = vi.fn(() => "light")

    const { result } = renderHook(() => useDarkMode())

    expect(result.current.isDarkMode).toBe(false)

    act(() => {
      result.current.toggleDarkMode()
    })
    expect(result.current.isDarkMode).toBe(true)
    expect(document.body.className).toBe("dark-mode")
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
      "theme",
      "dark"
    )

    act(() => {
      result.current.toggleDarkMode()
    })
    expect(result.current.isDarkMode).toBe(false)
    expect(document.body.className).toBe("light-mode")
    expect(globalThis.localStorage.setItem).toHaveBeenCalledWith(
      "theme",
      "light"
    )
  })
})
