import DarkMode from "./components/DarkMode"
import DarkModeButton from "./components/DarkMode/DarkModeButton"
import { useDarkMode } from "./hook/useDarkMode"

export default function App() {
  const { toggleDarkMode } = useDarkMode()

  return (
    <>
      <DarkMode />

      <header></header>
      <main>Helo World!</main>
      <footer></footer>

      {/* <button onClick={toggleDarkMode}>change</button> */}
      <DarkModeButton />
    </>
  )
}
