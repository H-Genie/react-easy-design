# [react-easy-design](https://github.com/H-Genie/react-easy-design)

- [Modal](#modal)
- [Loader](#loader)
- [Message](#message)
- [DarkMode](#darkmode)
- [Dropdown](#dropdown)
- [ScrollNavigation](#scrollnavigation)

## Install

```js
npm install react-easy-design
```

```js
yarn add react-easy-design
```

## Usage

### Modal

```js
import { useState } from "react"
import { Modal } from "react-easy-design"

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Modal Open</button>

      <Modal open={open} onClose={() => setOpen(false)}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </Modal>
    </>
  )
}
```

### props/option

<table>
    <tr>
        <td>open</td>
        <td>required</td>
        <td>boolean in useState</td>
    </tr>
    <tr>
        <td>onClose</td>
        <td>required</td>
        <td>SetStateAction that changes "open" to false</td>
    </tr>
    <tr>
        <td>style</td>
        <td>optional</td>
        <td>React.CSSProperties</td>
    </tr>
    <tr>
        <td>backdrop</td>
        <td>optional</td>
        <td>backdrop opacity : floating numbers between 0 and 1</td>
    </tr>
</table>

##

### Loader

Loader.Basic

- The indicator is placed in the location you specified.
- It can control the screen.

```js
import { Loader } from "react-easy-design"

export default function App() {
  return <Loader.Basic />
}
```

Loader.FullScreen :

- A transparent dim covers the entire screen.
- It can't control the screen.
- The indicator is located in the center of the screen.

```js
import { Loader } from "react-easy-design"

export default function App() {
  return <Loader.FullScreen />
}
```

##

### Message

```js
import { Message } from "react-easy-design"

export default function App() {
  return (
    <>
      <button onClick={Message.info("Successfully submitted")}>Submit</button>

      <button onClick={Message.warning("Please enter all information")}>
        Submit
      </button>

      <button
        onClick={Message.error(
          "Response was not successful, please try again."
        )}
      >
        Submit
      </button>
    </>
  )
}
```

##

### DarkMode

- Insert a &lt;DarkModeButton&gt; to easily switch dark mode. It appears in the bottom right corner of the screen, and you can control the theme with it.

```js
import { DarkModeButton } from "react-easy-design"

export default function App() {
  return <DarkModeButton />
}
```

- useDarkMode hook gives you two options.
- "toggleDarkMode" is the function to switch between themes. Create your own button and add it to the onClick
- "isDarkMode" is a boolean that indicates if you are currently in dark mode

```js
import { useDarkMode } from "react-easy-design"

export default function App() {
  const { toggleDarkMode, isDarkMode } = useDarkMode()

  return (
    <>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "change to Ligh-mode" : "change to Dark-mode"}
      </button>
    </>
  )
}
```

##

### Dropdown

- Passes in the items to display in the dropdown in the form of {key, label}
- Insert a trigger button inside a &lt;Dropdown&gt; component

```js
import { Dropdown } from "react-easy-design"

export default function App() {
  const items = [
    { key: "ko", label: "Korean" },
    { key: "en", label: "English" },
    { key: "jp", label: "Japanese" }
  ]

  return (
    <Dropdown
      menu={items}
      onSelect={item => console.log(item.key)}
      placement="bottomLeft"
    >
      <button>trigger</button>
    </Dropdown>
  )
}
```

<table>
    <tr>
        <td>menu</td>
        <td>required</td>
        <td>dropdown item list : Array with objects for key, label</td>
    </tr>
    <tr>
        <td>onSelect</td>
        <td>optional</td>
        <td>Action to take when an item is clicked</td>
    </tr>
    <tr>
        <td>placement</td>
        <td>optional</td>
        <td>
            bottomLeft (default)<br />
            bottomRight<br />
            topLeft<br />
            topRight
        </td>
    </tr>
</table>

##

### ScrollNavigation

Set "id" to the elements to be placed in the navigation bar, and pass the ids to an array

```js
import { ScrollNavigation } from "react-easy-design"

export default function App() {
  return (
    <>
      <ScrollNavigation
        items={["reservation", "products", "location", "promotion"]}
        top={100}
        backgroundColor="yellow"
        textColor="black"
      />

      {/* contents to example display */}
      <div id="reservation" style={{ height: "100vh" }}>
        reservation
      </div>
      <div id="products" style={{ height: "100vh" }}>
        items
      </div>
      <div id="location" style={{ height: "100vh" }}>
        location
      </div>
      <div id="promotion" style={{ height: "100vh" }}>
        promotion
      </div>
    </>
  )
}
```

<table>
    <tr>
        <td>items</td>
        <td>required</td>
        <td>id of elements : string[]</td>
    </tr>
    <tr>
        <td>top</td>
        <td>optional</td>
        <td>height to position the navigation bar(px)</td>
    </tr>
    <tr>
        <td>backgroundColor</td>
        <td>optional</td>
        <td>background-color of selected item</td>
    </tr>
    <tr>
        <td>textColor</td>
        <td>optional</td>
        <td>text color of selected item</td>
    </tr>
</table>
