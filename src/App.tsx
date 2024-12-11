import DarkMode from "./components/DarkMode"
import DarkModeButton from "./components/DarkMode/DarkModeButton"

export default function App() {
  return (
    <>
      {/* <DarkMode>
        {({ toggleDarkMode }) => (
          <>
            <h1>Hello World!</h1>
            <button onClick={toggleDarkMode}>전환</button>
          </>
        )}
      </DarkMode> */}

      <DarkMode>
        <header></header>
        <main>Helo World!</main>
        <footer></footer>
      </DarkMode>
      <DarkModeButton />
    </>
  )
}
