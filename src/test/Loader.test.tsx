import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Loader from "../components/Loader"

describe("Loader Component", () => {
  it("Loader.Basic", () => {
    const { container } = render(<Loader.Basic />)
    expect(container.querySelector(".loader")).toBeInTheDocument()
  })

  it("Loader.FullScreen", () => {
    const { container } = render(<Loader.FullScreen />)
    expect(container.querySelector(".loader-dim")).toBeInTheDocument()
  })
})
