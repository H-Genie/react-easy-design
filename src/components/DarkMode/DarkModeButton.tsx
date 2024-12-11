import DarkMode from "."
import "./DarkModeButton.css"

export default function DarkModeButton() {
  return (
    <DarkMode>
      {({ toggleDarkMode, isDarkMode }) => (
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          <span
            className={`material-symbols-outlined ${
              isDarkMode ? "dark-mode-button" : "white-mode-button"
            }`}
          >
            dark_mode
          </span>
        </button>
      )}
    </DarkMode>
  )
}
