import Message from "./components/Message"

export default function App() {
  return <button onClick={Message.info("Hello")}>Click</button>
}
