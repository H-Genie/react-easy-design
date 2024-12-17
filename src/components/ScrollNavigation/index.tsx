import { useEffect, useState } from "react"
import "./ScrollNavigation.css"

export interface ScrollNavigationProps {
  items: string[]
  top?: number
  backgroundColor?: string
  textColor?: string
}

const removeAll = () => {
  document.querySelectorAll('[id^="nav-"]').forEach(element => {
    element.classList.remove("selected")
  })
}

export default function ScrollNavigation({
  items,
  top = 0,
  backgroundColor,
  textColor
}: ScrollNavigationProps) {
  // nav height 50px
  const OFFSET_TOP_FIX = 50 + top

  const [scrollY, setScrollY] = useState<number>(0)
  const [scrollPosition, setScrollPosition] = useState<number[] | undefined>()
  const [selectedPosition, setSelectedPosition] = useState<number>(0)

  // 클릭했을 때 특정 위치로 이동
  const navClickHandler = (id: string) => {
    const element = document.querySelector<HTMLElement>(`#${id}`)
    const navList = document.querySelector<HTMLElement>(`#nav-${id}`)

    if (element && navList) {
      removeAll()
      element.scrollIntoView()
      window.scrollBy(0, -OFFSET_TOP_FIX)
      navList.classList.add("selected")
    }
  }

  useEffect(() => {
    // 각 아이템의 스크롤값 파악하여 저장
    const sectionPositions = items.map(
      item => (document.getElementById(item)?.offsetTop ?? 0) - OFFSET_TOP_FIX
    )
    setScrollPosition(sectionPositions)

    // scroll event listener
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [OFFSET_TOP_FIX, items])

  useEffect(() => {
    if (!scrollPosition) return

    // 스크롤이 현재 어느 단계에 위치하는지 저장
    const index = scrollPosition.findIndex((position, index) => {
      return (
        scrollY >= position &&
        (index === scrollPosition.length - 1 ||
          scrollY < scrollPosition[index + 1])
      )
    })

    setSelectedPosition(index !== -1 ? index : 0)
  }, [scrollY, scrollPosition])

  useEffect(() => {
    removeAll()

    // 단계를 넘을 때 마다 스타일 조정
    const selectedItem = items[selectedPosition]
    if (selectedItem) {
      document.getElementById(`nav-${selectedItem}`)?.classList.add("selected")

      if (backgroundColor) {
        document.documentElement.style.setProperty(
          "--selected-background-color",
          backgroundColor!
        )
      }

      if (textColor) {
        document.documentElement.style.setProperty(
          "--selected-color",
          textColor!
        )
      }
    }
  }, [selectedPosition, items, backgroundColor, textColor])

  return (
    <nav className="scroll-navigation" style={{ top }}>
      <ul className="scroll-navigation-container">
        {items.map(item => (
          <li
            key={item}
            className="scroll-navigation-item"
            id={`nav-${item}`}
            onClick={() => navClickHandler(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  )
}
