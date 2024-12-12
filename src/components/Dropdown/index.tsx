import { useState, useRef, useEffect, ReactNode } from "react"
import "./Dropdown.css"

interface MenuItem<T = string> {
  key: string
  label: string
  onClick?: (e: { key: T }) => void
}

interface DropdownProps<T = string> {
  menu: MenuItem[]
  onClick?: (e: { key: T }) => void
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight"
  children: ReactNode
}

const Dropdown = ({
  menu,
  onClick,
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
    if (menuRef.current) {
      setMenuHeight(menuRef.current.offsetHeight)
    }
  }, [isOpen])

  const handleMenuClick = (item: MenuItem) => {
    if (onClick) onClick({ key: item.key })
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
