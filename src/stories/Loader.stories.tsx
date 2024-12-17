import { StoryFn } from "@storybook/react"
import Loader from "../components/Loader"
import "../components/Loader/LoaderBasic.css"
import "../components/Loader/LoaderFullScreen.css"

export default {
  title: "Components/Loader",
  component: Loader
}

const Template: StoryFn = args => <Loader.Basic {...args} />

export const Basic = Template.bind({})
Basic.args = {}
Basic.storyName = "Basic Loader"

export const FullScreen = () => <Loader.FullScreen />
FullScreen.storyName = "Full Screen Loader"
