import Message from "./components/Message"

export default function App() {
  return (
    <>
      <button onClick={Message.info("Info")}>Submit</button>
      <button onClick={Message.warning("Warning")}>Submit</button>
      <button onClick={Message.error("Error")}>Submit</button>
    </>
  )
}
