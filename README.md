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
