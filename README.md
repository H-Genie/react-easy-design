# [react-easy-design](https://github.com/H-Genie/react-easy-design)

## Usage

### Modal

```js
const [isOpen, setIsOpen] = useState(false)

<button onClick={() => setIsOpen(true)}>Modal Open</button>

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
</Modal>
```

### props/option

<table>
    <tr>
        <td>isOpen</td>
        <td>required</td>
        <td>boolean in useState</td>
    </tr>
    <tr>
        <td>onClose</td>
        <td>required</td>
        <td>SetStateAction that changes "isOpen" to false</td>
    </tr>
    <tr>
        <td>style</td>
        <td>option</td>
        <td>React.CSSProperties</td>
    </tr>
    <tr>
        <td>backdrop</td>
        <td>option</td>
        <td>backdrop opacity : real numbers between 0 and 1</td>
    </tr>
</table>

##

### Loader

```js
<Loader.Basic />
<Loader.FullScreen />
```

Loader.Basic

- The indicator is placed in the location you specified.
- It can control the screen.

Loader.FullScreen :

- A transparent dim covers the entire screen.
- It can't control the screen.
- The indicator is located in the center of the screen.

##

### Message

```js
<button onClick={Message.info("Info")}>Submit</button>
<button onClick={Message.warning("Warning")}>Submit</button>
<button onClick={Message.error("Error")}>Submit</button>
```

##

### DarkMode

easy mode

- Put the necessary node inside the <DarkMode> component.
- <DarkModeButton> appears in the bottom right corner of the screen, and you can control the theme with it.

```js
<DarkMode>
    <header><header>
    <main>Helo World!</main>
    <footer></footer>
</DarkMode>
<DarkModeButton />
```

custom mode

- There are two options. You don't necessarily need to import both.
- "isDarkMode" is a boolean that indicates if you are currently in dark mode
- "toggleMode" is the function to switch between themes. Create your own button and add it to the onClick

```js
<DarkMode>
    {({ toggleDarkMode, isDarkMode }) => (
        <>
            <header><header>
            <main>
                <h1>Helo World!</h1>
                <button onClick={toggleDarkMode}>Change Theme</button>
            </main>
            <footer></footer>
        </>
    )}
</DarkMode>
```
