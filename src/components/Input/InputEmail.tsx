import { useMemo, useState } from "react"
import "./Input.css"

const message = "The email format doesn't match"

export default function InputEmail() {
  const [value, setValue] = useState<string | undefined>()

  const validation = useMemo(() => {
    if (!value) return true
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return value && regex.test(value)
  }, [value])

  return (
    <>
      <input
        className="input-common-style"
        onChange={e => setValue(e.target.value)}
        placeholder="email@example.com"
        style={{
          color: validation ? "blue" : "red"
        }}
      />
      <p className="invalid-message">{!validation && message}</p>
    </>
  )
}
