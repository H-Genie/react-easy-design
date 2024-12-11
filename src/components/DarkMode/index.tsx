import { useState, useEffect, ReactNode } from "react"
import "./DarkMode.css"

interface DarkModeControllerProps {
  children:
    | ((props: {
        isDarkMode: boolean
        toggleDarkMode: () => void
      }) => ReactNode)
    | ReactNode
}

export default function DarkMode({ children }: DarkModeControllerProps) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode"
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  if (typeof children === "function") {
    return <>{children({ isDarkMode, toggleDarkMode })}</>
  } else {
    return <>{children}</>
  }
}
