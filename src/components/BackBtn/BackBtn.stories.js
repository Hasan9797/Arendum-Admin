import { withRouter } from "storybook-addon-react-router-v6";
import BackBtn from "./BackBtn.tsx";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: "Components/Back button",
    component: BackBtn,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [withRouter],
};
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
    args: {
        type: "default",
    },
};
export const WithIcon = {
    args: {
        wIcon: true,
    },
};
export const IconOnly = {
    args: {
        iconOnly: true,
    },
};
