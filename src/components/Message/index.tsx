import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import "./Message.css"

interface MessageItem {
  id: number
  content: string
}

let messageContainer: HTMLDivElement | null = null

const Message = {
  info: (content: string) => {
    if (!messageContainer) {
      messageContainer = document.createElement("div")
      document.body.appendChild(messageContainer)
      ReactDOM.render(<MessageManager />, messageContainer)
    }

    const event = new CustomEvent("addMessage", { detail: content })
    window.dispatchEvent(event)
  }
}

const MessageManager = () => {
  const [messages, setMessages] = useState<MessageItem[]>([])

  useEffect(() => {
    const handleAddMessage = (event: CustomEvent<string>) => {
      const newMessage: MessageItem = {
        id: Date.now(),
        content: event.detail
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
    <div className="message-wrapper">
      {messages.map(msg => (
        <div key={msg.id} className="message-container">
          {msg.content}
        </div>
      ))}
    </div>
  )
}

export default Message
