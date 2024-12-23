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

// eslint-disable-next-line react-refresh/only-export-components
export const showMessage = (content: string, type: MessageType) => {
  const dispatchMessage = () => {
    const event = new CustomEvent("addMessage", { detail: { content, type } })
    window.dispatchEvent(event)
  }

  if (!messageContainer) {
    messageContainer = document.createElement("div")
    document.body.appendChild(messageContainer)
    ReactDOM.render(<MessageHandler />, messageContainer)

    // message-container를 DOM에 추가하기 위해 디스패치를 잠시 지연
    setTimeout(dispatchMessage, 0)
  } else {
    dispatchMessage()
  }
}

export const MessageHandler = () => {
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
    <div className="message-container" role="alert">
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
    return () => showMessage(content, "info")
  },
  warning: (content: string) => {
    return () => showMessage(content, "warning")
  },
  error: (content: string) => {
    return () => showMessage(content, "error")
  }
}

export default Message
