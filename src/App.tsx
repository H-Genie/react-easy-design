import ScrollNavigation from "./components/ScrollNavigation"

export default function App() {
  return (
    <>
      <div
        style={{
          height: 100,
          backgroundColor: "blue"
        }}
      ></div>
      <ScrollNavigation
        items={["reservation", "items", "location", "promotion"]}
        top={100}
        backgroundColor="yellow"
        color="black"
      />
      <div id="reservation" style={{ height: "100vh" }}>
        reservation
      </div>
      <div id="items" style={{ height: "100vh" }}>
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
