import {
  ReactNode,
  CSSProperties,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react"
import "./modal.css"

interface ModalProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  style?: CSSProperties | undefined
  backdrop?: number | undefined
}

export default function Modal({
  children,
  open,
  onClose,
  style,
  backdrop
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

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

  const opacity = useMemo(() => {
    if (backdrop! > 1) return 1
    else if (backdrop! < 0) return 0
    else return backdrop
  }, [backdrop])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      style={{ ...style, "--backdrop-opacity": opacity } as CSSProperties}
    >
      {open && (
        <div>
          <button onClick={onClose} className="modal-close-button">
            <span className="material-symbols-outlined">close</span>
          </button>
          {children}
        </div>
      )}
    </dialog>
  )
}
