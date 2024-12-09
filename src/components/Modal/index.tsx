import { ReactNode, CSSProperties, useRef, useEffect, useCallback } from "react"
import "./modal.css"

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  style?: CSSProperties | undefined
}

export default function Modal({
  children,
  isOpen,
  onClose,
  style
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [isOpen])

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) onClose()
    },
    [onClose]
  )

  useEffect(() => {
    const dialog = dialogRef.current

    if (dialog) dialog.addEventListener("click", handleOutsideClick)

    return () => {
      if (dialog) {
        dialog.removeEventListener("click", handleOutsideClick)
      }
    }
  }, [onClose, handleOutsideClick])

  return (
    <dialog ref={dialogRef} className="modal" style={{ ...style }}>
      <div>
        <button onClick={onClose} className="modal-close-button">
          <span className="material-symbols-outlined">close</span>
        </button>
        {children}
      </div>
    </dialog>
  )
}
