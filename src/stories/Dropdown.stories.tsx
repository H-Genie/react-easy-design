import Dropdown, { DropdownProps } from "../components/Dropdown"

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    placement: {
      control: {
        type: "select",
        options: ["bottomLeft", "bottomRight", "topLeft", "topRight"]
      }
    }
  }
}

const menu = [
  { key: "1", label: "Option 1" },
  { key: "2", label: "Option 2" },
  { key: "3", label: "Option 3" }
]

export const Default = (args: DropdownProps) => (
  <div style={{ display: "flex", justifyContent: "center", marginTop: 250 }}>
    <Dropdown {...args} menu={menu} onSelect={item => alert(item.label)}>
      <button>Bottom Left</button>
    </Dropdown>
    <Dropdown
      {...args}
      menu={menu}
      onSelect={item => alert(item.label)}
      placement="bottomRight"
    >
      <button>Bottom Right</button>
    </Dropdown>
    <Dropdown
      {...args}
      menu={menu}
      onSelect={item => alert(item.label)}
      placement="topLeft"
    >
      <button>Top Left</button>
    </Dropdown>
    <Dropdown
      {...args}
      menu={menu}
      onSelect={item => alert(item.label)}
      placement="topRight"
    >
      <button>Top Right</button>
    </Dropdown>
  </div>
)
