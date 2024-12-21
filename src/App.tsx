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
