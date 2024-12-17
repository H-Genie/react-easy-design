import { useState, useRef, useEffect, ReactNode } from "react"
import "./Dropdown.css"

interface MenuItem<T = string> {
  key: string
  label: string
  onSelect?: (e: { key: T; label: T }) => void
}

export interface DropdownProps<T = string> {
  menu: MenuItem<T>[]
  onSelect?: (e: { key: T; label: T }) => void
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight"
  children: ReactNode
}

const Dropdown = ({
  menu,
  onSelect,
  placement = "bottomLeft",
  children
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const menuRef = useRef<HTMLUListElement | null>(null)
  const [menuHeight, setMenuHeight] = useState(0)

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    )
      setIsOpen(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (menuHeight === 0 && menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight)
    }
    // ref에 높이가 측정되는 최초 1회만 실행
  }, [isOpen, menuHeight])

  const handleMenuClick = (item: MenuItem) => {
    if (onSelect) onSelect(item)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <div
        onClick={() => setIsOpen(prev => !prev)}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
      {isOpen && (
        <ul
          ref={menuRef}
          className={`dropdown-menu ${placement}`}
          style={{
            top:
              placement === "topLeft" || placement === "topRight"
                ? `-${menuHeight}px`
                : undefined
          }}
        >
          {menu.map(item => (
            <li
              key={item.key}
              className="dropdown-item"
              onClick={() => handleMenuClick(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
