import ScrollNavigation, {
  ScrollNavigationProps
} from "../components/ScrollNavigation"

export default {
  title: "Components/ScrollNavigation",
  component: ScrollNavigation,
  argTypes: {
    top: {
      control: { type: "number" },
      description: "네비게이션의 상단 위치 조정",
      defaultValue: 0
    },
    backgroundColor: {
      control: { type: "color" },
      description: "선택된 항목의 배경색",
      defaultValue: "#ab1f2e"
    },
    textColor: {
      control: { type: "color" },
      description: "선택된 항목의 텍스트 색상",
      defaultValue: "#ffffff"
    }
  }
}

type Story = typeof Template & { args?: Partial<ScrollNavigationProps> }

const Template = (args: ScrollNavigationProps): JSX.Element => (
  <div>
    <ScrollNavigation {...args} />

    <div id="Section1" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
      <h1>Section 1</h1>
    </div>
    <div id="Section2" style={{ height: "100vh", backgroundColor: "#e9ecef" }}>
      <h1>Section 2</h1>
    </div>
    <div id="Section3" style={{ height: "100vh", backgroundColor: "#dee2e6" }}>
      <h1>Section 3</h1>
    </div>
    <div id="Section4" style={{ height: "100vh", backgroundColor: "#ced4da" }}>
      <h1>Section 4</h1>
    </div>
  </div>
)

export const Default = Template.bind({}) as Story
Default.args = {
  items: ["Section1", "Section2", "Section3", "Section4"]
}

export const CustomColors = Template.bind({}) as Story
CustomColors.args = {
  items: ["Section1", "Section2", "Section3", "Section4"],
  backgroundColor: "#007bff",
  textColor: "#ffffff"
}

export const WithOffsetTop = Template.bind({}) as Story
WithOffsetTop.args = {
  items: ["Section1", "Section2", "Section3", "Section4"],
  top: 50
}
