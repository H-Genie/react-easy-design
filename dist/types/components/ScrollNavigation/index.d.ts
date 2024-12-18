import "./ScrollNavigation.css";
export interface ScrollNavigationProps {
    items: string[];
    top?: number;
    backgroundColor?: string;
    textColor?: string;
}
export default function ScrollNavigation({ items, top, backgroundColor, textColor }: ScrollNavigationProps): import("react/jsx-runtime").JSX.Element;
