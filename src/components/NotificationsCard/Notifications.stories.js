import NotificationsData from "../../../public/mocks/Notifications.json";
import NotificationsCard from "./NotificationsCard.tsx";
const meta = {
    title: "Components/Notifications/List",
    component: NotificationsCard,
    parameters: {
        layout: "centered",
    },
};
export default meta;
export const Default = {
    args: {
        data: NotificationsData.slice(0, 10),
        style: { width: 500 },
    },
};
export const Loading = {
    args: {
        loading: true,
        style: { width: 500 },
    },
};
export const Error = {
    args: {
        error: "Error fetching items",
        style: { width: 500 },
    },
};
export const Empty = {
    args: {
        data: [],
        style: { width: 500 },
    },
};
