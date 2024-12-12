import { useMemo, useState } from "react"
import "./Input.css"

const message = "비밀번호는 8자 이상이어야 합니다."

export default function InputPassword() {
  const [value, setValue] = useState<string | undefined>()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const validation = useMemo(() => {
    if (!value) return true
    return value.length >= 8
  }, [value])

  return (
    <>
      <div className="input-password">
        <input
          type={showPassword ? "text" : "password"}
          className="input-common-style"
          onChange={e => setValue(e.target.value)}
          placeholder="password"
          style={{
            color: validation ? "blue" : "red"
          }}
        />
        <div className="input-password-visibility">
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="material-symbols-outlined icons"
          >
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
      </div>
      <p className="invalid-message">{!validation && message}</p>
    </>
  )
}
