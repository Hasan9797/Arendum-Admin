import TimelineData from "../../../public/mocks/TimelineActivity.json";
import TimelineCard from "./TimelineCard.tsx";
const meta = {
    title: "Components/Timeline",
    component: TimelineCard,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
};
export default meta;
export const Default = {
    args: {
        data: TimelineData.slice(0, 5),
        style: { width: 600 },
    },
};
export const Loading = {
    args: {
        loading: true,
        style: { width: 600 },
    },
};
export const Error = {
    args: {
        error: "Error fetching items",
        style: { width: 600 },
    },
};
