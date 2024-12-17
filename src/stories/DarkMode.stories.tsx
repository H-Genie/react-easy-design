import DarkModeButton from "../components/DarkMode/DarkModeButton"
import { useDarkMode } from "../hooks/useDarkMode"

export default {
  title: "Components/DarkMode",
  component: DarkModeButton
}

export const Default = () => {
  return (
    <div>
      <p>
        Click the button in the bottom-right to toggle between dark and light
        mode
      </p>
      <DarkModeButton />
    </div>
  )
}

export const CusotomMode = () => {
  const { toggleDarkMode, isDarkMode } = useDarkMode()

  return (
    <>
      <p>{`Currently in ${
        isDarkMode ? "dark-mode" : "light-mode"
      }. To switch, click the button`}</p>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "change to Ligh-mode" : "change to Dark-mode"}
      </button>
    </>
  )
}
