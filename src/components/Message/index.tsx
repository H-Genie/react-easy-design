import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./Message.css"

type MessageType = "info" | "warning" | "error"

interface Message {
  id: number
  content: string
  type: MessageType
}

let messageContainer: HTMLDivElement | null = null

const showMessage = (content: string, type: MessageType) => {
  const dispatchMessage = () => {
    const event = new CustomEvent("addMessage", { detail: { content, type } })
    window.dispatchEvent(event)
  }

  if (!messageContainer) {
    messageContainer = document.createElement("div")
    document.body.appendChild(messageContainer)
    ReactDOM.render(<MessageHandler />, messageContainer)

    // 렌더링 및 useEffect 타이밍이 안맞음 : 첫번째 디스패치를 지연
    setTimeout(dispatchMessage, 0)
  } else {
    dispatchMessage()
  }
}

const MessageHandler = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const handleAddMessage = (event: CustomEvent<Message>) => {
      const newMessage = {
        id: Date.now(),
        content: event.detail.content,
        type: event.detail.type
      }
      setMessages(prev => [...prev, newMessage])

      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id))
      }, 1000)
    }

    window.addEventListener("addMessage", handleAddMessage as EventListener)

    return () => {
      window.removeEventListener(
        "addMessage",
        handleAddMessage as EventListener
      )
    }
  }, [])

  return (
    <div className="message-container">
      {messages.map(message => (
        <div
          key={message.id}
          className={`message ${message.type} display-flex`}
        >
          <span className="material-symbols-outlined icons">
            {message.type}
          </span>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  )
}

const Message = {
  info: (content: string) => {
    showMessage(content, "info")
  },
  warning: (content: string) => {
    showMessage(content, "warning")
  },
  error: (content: string) => {
    showMessage(content, "error")
  }
}

export default Message
