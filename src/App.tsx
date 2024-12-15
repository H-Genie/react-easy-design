import Dropdown from "./components/Dropdown"

export default function App() {
  const items = [
    { key: "ko", label: "Korean" },
    { key: "en", label: "English" },
    { key: "jp", label: "Japanese" }
  ]

  return (
    <>
      <Dropdown
        menu={items}
        onSelect={item => console.log(item.key)}
        placement="bottomLeft"
      >
        <button>trigger</button>
      </Dropdown>
    </>
  )
}
