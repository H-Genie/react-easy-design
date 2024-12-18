import "./Message.css";
type MessageType = "info" | "warning" | "error";
interface Message {
    id: number;
    content: string;
    type: MessageType;
}
export declare const showMessage: (content: string, type: MessageType) => void;
export declare const MessageHandler: () => import("react/jsx-runtime").JSX.Element;
declare const Message: {
    info: (content: string) => () => void;
    warning: (content: string) => () => void;
    error: (content: string) => () => void;
};
export default Message;
