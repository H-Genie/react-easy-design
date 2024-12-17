import Message from "../components/Message"

export default {
  title: "Components/Message",
  component: Message
}

export const InfoMessage = () => {
  return (
    <button onClick={Message.info("Show Info Message")}>
      Show Info Message
    </button>
  )
}

export const WarningMessage = () => {
  return (
    <button onClick={Message.warning("Show Warning Message")}>
      Show Warning Message
    </button>
  )
}

export const ErrorMessage = () => {
  return (
    <button onClick={Message.error("Show Error Message")}>
      Show Error Message
    </button>
  )
}
