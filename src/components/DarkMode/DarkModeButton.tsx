import { useDarkMode } from "../../hooks/useDarkMode"
import "./DarkMode.css"

export default function DarkModeButton() {
  const { toggleDarkMode, isDarkMode } = useDarkMode()

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      <span
        className={`material-symbols-outlined ${
          isDarkMode ? "dark-mode-button" : "light-mode-button"
        }`}
      >
        dark_mode
      </span>
    </button>
  )
}
