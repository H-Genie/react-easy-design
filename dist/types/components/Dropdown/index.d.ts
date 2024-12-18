import { ReactNode } from "react";
import "./Dropdown.css";
interface MenuItem<T = string> {
    key: string;
    label: string;
    onSelect?: (e: {
        key: T;
        label: T;
    }) => void;
}
export interface DropdownProps<T = string> {
    menu: MenuItem<T>[];
    onSelect?: (e: {
        key: T;
        label: T;
    }) => void;
    placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
    children: ReactNode;
}
declare const Dropdown: ({ menu, onSelect, placement, children }: DropdownProps) => import("react/jsx-runtime").JSX.Element;
export default Dropdown;
