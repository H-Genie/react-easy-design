import Message from "./components/Message"

export default function App() {
  return (
    <>
      <button onClick={() => Message.info("info")}>info</button>
      <button onClick={() => Message.warning("warning")}>warning</button>
      <button onClick={() => Message.error("error")}>error</button>
    </>
  )
}
