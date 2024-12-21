import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$6 = ".modal {\r\n  position: absolute;\r\n  top: 50%;\r\n  left: 50%;\r\n  transform: translate(-50%, -50%);\r\n  outline: none;\r\n  border: none;\r\n  padding: 32px 16px 16px 16px;\r\n  border-radius: 8px;\r\n  position: relative;\r\n  z-index: 999;\r\n}\r\n\r\n.modal::backdrop {\r\n  background-color: rgba(0, 0, 0, var(--backdrop-opacity, 0.1));\r\n}\r\n\r\n.modal-close-button {\r\n  background-color: transparent;\r\n  border: none;\r\n  outline: none;\r\n  cursor: pointer;\r\n  position: absolute;\r\n  top: 8px;\r\n  right: 16px;\r\n}\r\n";
styleInject(css_248z$6);

function Modal({ children, open, onClose, style, backdrop }) {
    const dialogRef = useRef(null);
    useEffect(() => {
        if (open)
            dialogRef.current?.showModal();
        else
            dialogRef.current?.close();
    }, [open]);
    const handleOutsideClick = useCallback((e) => {
        if (dialogRef.current && e.target === dialogRef.current)
            onClose();
    }, [onClose]);
    useEffect(() => {
        const dialog = dialogRef.current;
        if (dialog)
            dialog.addEventListener("click", handleOutsideClick);
        return () => {
            if (dialog) {
                dialog.removeEventListener("click", handleOutsideClick);
            }
        };
    }, [onClose, handleOutsideClick]);
    const opacity = useMemo(() => {
        if (backdrop > 1)
            return 1;
        else if (backdrop < 0)
            return 0;
        else
            return backdrop;
    }, [backdrop]);
    return (jsx("dialog", { ref: dialogRef, className: "modal", style: { ...style, "--backdrop-opacity": opacity }, children: open && (jsxs("div", { children: [jsx("button", { onClick: onClose, className: "modal-close-button", children: jsx("span", { className: "material-symbols-outlined", children: "close" }) }), children] })) }));
}

function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    useEffect(() => {
        document.body.className = isDarkMode ? "dark-mode" : "light-mode";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    return { isDarkMode, toggleDarkMode };
}

var css_248z$5 = "body.light-mode {\r\n  background-color: white;\r\n  color: black;\r\n}\r\n\r\nbody.dark-mode {\r\n  background-color: black;\r\n  color: white;\r\n}\r\n\r\n.dark-mode-toggle {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 40px;\r\n  height: 40px;\r\n  background-color: #f0f0f0;\r\n  border: none;\r\n  border-radius: 50%;\r\n  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);\r\n  cursor: pointer;\r\n  transition: background-color 0.3s, box-shadow 0.3s;\r\n  position: fixed;\r\n  bottom: 32px;\r\n  right: 32px;\r\n}\r\n\r\n.dark-mode-toggle:hover {\r\n  background-color: #e0e0e0;\r\n  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);\r\n}\r\n\r\n.light-mode-button {\r\n  color: #333;\r\n}\r\n\r\n.dark-mode-button {\r\n  color: white;\r\n}\r\n\r\nbody.dark-mode .dark-mode-toggle {\r\n  background-color: #333;\r\n}\r\n\r\nbody.dark-mode .dark-mode-toggle i {\r\n  color: white;\r\n}\r\n";
styleInject(css_248z$5);

function DarkModeButton() {
    const { toggleDarkMode, isDarkMode } = useDarkMode();
    return (jsx("button", { onClick: toggleDarkMode, className: "dark-mode-toggle", children: jsx("span", { className: `material-symbols-outlined ${isDarkMode ? "dark-mode-button" : "light-mode-button"}`, children: "dark_mode" }) }));
}

var css_248z$4 = ".dropdown-container {\r\n  position: relative;\r\n  width: fit-content;\r\n  z-index: 1;\r\n}\r\n\r\n.dropdown-menu {\r\n  position: absolute;\r\n  background-color: white;\r\n  border-radius: 4px;\r\n  cursor: pointer;\r\n  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),\r\n    0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);\r\n}\r\n\r\n.dropdown-menu.bottomLeft,\r\n.dropdown-menu.topLeft {\r\n  left: 0;\r\n}\r\n\r\n.dropdown-menu.bottomRight,\r\n.dropdown-menu.topRight {\r\n  right: 0;\r\n}\r\n\r\n.dropdown-item {\r\n  padding: 8px 16px;\r\n}\r\n\r\n.dropdown-item:hover {\r\n  background-color: #f0f0f0;\r\n}\r\n";
styleInject(css_248z$4);

const Dropdown = ({ menu, onSelect, placement = "bottomLeft", children }) => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const [menuHeight, setMenuHeight] = useState(0);
    const handleOutsideClick = (event) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target))
            setIsOpen(false);
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        if (menuHeight === 0 && menuRef.current) {
            setMenuHeight(menuRef.current.offsetHeight);
        }
        // ref에 높이가 측정되는 최초 1회만 실행
    }, [isOpen, menuHeight]);
    const handleMenuClick = (item) => {
        if (onSelect)
            onSelect(item);
        setIsOpen(false);
    };
    return (jsxs("div", { ref: dropdownRef, className: "dropdown-container", children: [jsx("div", { onClick: () => setIsOpen(prev => !prev), style: { cursor: "pointer" }, children: children }), isOpen && (jsx("ul", { ref: menuRef, className: `dropdown-menu ${placement}`, style: {
                    top: placement === "topLeft" || placement === "topRight"
                        ? `-${menuHeight}px`
                        : undefined
                }, children: menu.map(item => (jsx("li", { className: "dropdown-item", onClick: () => handleMenuClick(item), children: item.label }, item.key))) }))] }));
};

var css_248z$3 = ".loader {\r\n  width: fit-content;\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.circle {\r\n  width: 30px;\r\n  height: 30px;\r\n  animation: bounce 1s 0.7s linear infinite;\r\n  border-radius: 100%;\r\n  margin: 10px;\r\n}\r\n\r\n.circle:nth-of-type(1) {\r\n  background-color: #ff4a52;\r\n}\r\n.circle:nth-of-type(2) {\r\n  animation-delay: 0.2s;\r\n  background-color: #ff733d;\r\n}\r\n.circle:nth-of-type(3) {\r\n  animation-delay: 0.4s;\r\n  background-color: #e84f38;\r\n}\r\n\r\n@keyframes bounce {\r\n  0%,\r\n  50%,\r\n  100% {\r\n    transform: scale(1);\r\n    filter: blur (0px);\r\n  }\r\n  25% {\r\n    transform: scale (0.6);\r\n  }\r\n  75% {\r\n    transform: scale(1.4);\r\n    background-color: #ff969c;\r\n  }\r\n}\r\n";
styleInject(css_248z$3);

function LoaderBasic() {
    return (jsxs("div", { className: "loader", children: [jsx("div", { className: "circle" }), jsx("div", { className: "circle" }), jsx("div", { className: "circle" })] }));
}

var css_248z$2 = "@import url(\"./LoaderBasic.css\");\r\n\r\n.loader-dim {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: fixed;\r\n  z-index: 999;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n";
styleInject(css_248z$2);

function LoaderFullScreen() {
    return (jsx("section", { className: "loader-dim", children: jsxs("div", { className: "loader", children: [jsx("div", { className: "circle" }), jsx("div", { className: "circle" }), jsx("div", { className: "circle" })] }) }));
}

function Loader() {
    return null;
}
Loader.Basic = LoaderBasic;
Loader.FullScreen = LoaderFullScreen;

var css_248z$1 = ".message-container {\r\n  position: fixed;\r\n  width: 100%;\r\n  top: 20px;\r\n  z-index: 1000;\r\n  line-height: 20px;\r\n}\r\n\r\n.message {\r\n  background-color: rgba(0, 0, 0, 0.7);\r\n  width: fit-content;\r\n  color: white;\r\n  padding: 8px 16px;\r\n  border-radius: 5px;\r\n  font-size: 14px;\r\n  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\r\n  margin: 0 auto;\r\n  margin-bottom: 10px;\r\n\r\n  animation: fadeInOutSmooth 3s ease-in-out forwards;\r\n}\r\n\r\n.icons {\r\n  font-size: 20px !important;\r\n  margin-right: 4px;\r\n  margin-bottom: -2px;\r\n}\r\n\r\n.message.info {\r\n  background-color: #d9edf7;\r\n  color: #31708f;\r\n}\r\n\r\n.message.warning {\r\n  background-color: #fcf8e3;\r\n  color: #8a6d3b;\r\n}\r\n\r\n.message.error {\r\n  background-color: #ffbaba;\r\n  color: #d8000c;\r\n}\r\n\r\n@keyframes fadeInOutSmooth {\r\n  0% {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n\r\n  10% {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n\r\n  25% {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n\r\n  100% {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n}\r\n";
styleInject(css_248z$1);

let messageContainer = null;
// eslint-disable-next-line react-refresh/only-export-components
const showMessage = (content, type) => {
    const dispatchMessage = () => {
        const event = new CustomEvent("addMessage", { detail: { content, type } });
        window.dispatchEvent(event);
    };
    if (!messageContainer) {
        messageContainer = document.createElement("div");
        document.body.appendChild(messageContainer);
        ReactDOM.render(jsx(MessageHandler, {}), messageContainer);
        // message-container를 DOM에 추가하기 위해 디스패치를 잠시 지연
        setTimeout(dispatchMessage, 0);
    }
    else {
        dispatchMessage();
    }
};
const MessageHandler = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const handleAddMessage = (event) => {
            const newMessage = {
                id: Date.now(),
                content: event.detail.content,
                type: event.detail.type
            };
            setMessages(prev => [...prev, newMessage]);
            setTimeout(() => {
                setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
            }, 1000);
        };
        window.addEventListener("addMessage", handleAddMessage);
        return () => {
            window.removeEventListener("addMessage", handleAddMessage);
        };
    }, []);
    return (jsx("div", { className: "message-container", role: "alert", children: messages.map(message => (jsxs("div", { className: `message ${message.type} display-flex`, children: [jsx("span", { className: "material-symbols-outlined icons", children: message.type }), jsx("p", { children: message.content })] }, message.id))) }));
};
const Message = {
    info: (content) => {
        return () => showMessage(content, "info");
    },
    warning: (content) => {
        return () => showMessage(content, "warning");
    },
    error: (content) => {
        return () => showMessage(content, "error");
    }
};

var css_248z = ".scroll-navigation {\r\n  width: 100%;\r\n  position: sticky;\r\n  top: 0px;\r\n  z-index: 1;\r\n}\r\n\r\n.scroll-navigation-container {\r\n  width: 100%;\r\n  height: 50px;\r\n  display: flex;\r\n}\r\n\r\n.scroll-navigation-item {\r\n  width: 25%;\r\n  background-color: white;\r\n  color: #a1a1a1;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.scroll-navigation-item:not(:last-of-type) {\r\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\r\n}\r\n\r\n.selected {\r\n  background-color: var(--selected-background-color, #ab1f2e);\r\n  color: var(--selected-color, white);\r\n}\r\n";
styleInject(css_248z);

const removeAll = () => {
    document.querySelectorAll('[id^="nav-"]').forEach(element => {
        element.classList.remove("selected");
    });
};
function ScrollNavigation({ items, top = 0, backgroundColor, textColor }) {
    // nav height 50px
    const OFFSET_TOP_FIX = 50 + top;
    const [scrollY, setScrollY] = useState(0);
    const [scrollPosition, setScrollPosition] = useState();
    const [selectedPosition, setSelectedPosition] = useState(0);
    // 클릭했을 때 특정 위치로 이동
    const navClickHandler = (id) => {
        const element = document.querySelector(`#${id}`);
        const navList = document.querySelector(`#nav-${id}`);
        if (element && navList) {
            removeAll();
            element.scrollIntoView();
            window.scrollBy(0, -OFFSET_TOP_FIX);
            navList.classList.add("selected");
        }
    };
    useEffect(() => {
        // 각 아이템의 스크롤값 파악하여 저장
        const sectionPositions = items.map(item => (document.getElementById(item)?.offsetTop ?? 0) - OFFSET_TOP_FIX);
        setScrollPosition(sectionPositions);
        // scroll event listener
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [OFFSET_TOP_FIX, items]);
    useEffect(() => {
        if (!scrollPosition)
            return;
        // 스크롤이 현재 어느 단계에 위치하는지 저장
        const index = scrollPosition.findIndex((position, index) => {
            return (scrollY >= position &&
                (index === scrollPosition.length - 1 ||
                    scrollY < scrollPosition[index + 1]));
        });
        setSelectedPosition(index !== -1 ? index : 0);
    }, [scrollY, scrollPosition]);
    useEffect(() => {
        removeAll();
        // 단계를 넘을 때 마다 스타일 조정
        const selectedItem = items[selectedPosition];
        if (selectedItem) {
            document.getElementById(`nav-${selectedItem}`)?.classList.add("selected");
            if (backgroundColor) {
                document.documentElement.style.setProperty("--selected-background-color", backgroundColor);
            }
            if (textColor) {
                document.documentElement.style.setProperty("--selected-color", textColor);
            }
        }
    }, [selectedPosition, items, backgroundColor, textColor]);
    return (jsx("nav", { className: "scroll-navigation", style: { top }, children: jsx("ul", { className: "scroll-navigation-container", children: items.map(item => (jsx("li", { className: "scroll-navigation-item", id: `nav-${item}`, onClick: () => navClickHandler(item), children: item }, item))) }) }));
}

export { DarkModeButton, Dropdown, Loader, Message, Modal, ScrollNavigation, useDarkMode };
//# sourceMappingURL=index.esm.js.map
