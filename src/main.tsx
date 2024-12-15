import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./main.css"
import "material-symbols/outlined.css"

const root = createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
