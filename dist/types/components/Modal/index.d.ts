import { ReactNode, CSSProperties } from "react";
import "./modal.css";
export interface ModalProps {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
    style?: CSSProperties | undefined;
    backdrop?: number | undefined;
}
export default function Modal({ children, open, onClose, style, backdrop }: ModalProps): import("react/jsx-runtime").JSX.Element;
