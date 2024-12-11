import { useState, useEffect } from "react"
import "./DarkMode.css"

function DarkMode() {
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

  return (
    <div className="App">
      <h1>{isDarkMode ? "다크 모드" : "라이트 모드"}</h1>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </button>
    </div>
  )
}

export default DarkMode
