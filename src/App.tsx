import Dropdown from "./components/Dropdown"

export default function App() {
  const items = [
    { key: "en", label: "English" },
    { key: "ko", label: "Korean" },
    { key: "jp", label: "Japanese" }
  ]

  return (
    <div style={{ margin: "300px auto 0", width: "fit-content" }}>
      <Dropdown
        menu={items}
        onClick={e => console.log(e.key)}
        placement="bottomLeft"
      >
        <button>trigger</button>
      </Dropdown>
    </div>
  )
}
