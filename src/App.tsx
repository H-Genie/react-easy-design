import Message from "./components/Message"

export default function App() {
  return <button onClick={() => Message.info("Helllo World!")}>메세지</button>
}
