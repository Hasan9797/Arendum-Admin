import { withRouter } from "storybook-addon-react-router-v6";
import { DASHBOARD_ITEMS } from "../../constants";
import SitemapCard from "./SitemapCard.tsx";
const meta = {
    title: "Components/Sitemap",
    component: SitemapCard,
    parameters: {
        layout: "centered",
    },
    decorators: [withRouter],
};
export default meta;
export const Default = {
    args: {
        data: {
            title: "dashboard",
            links: DASHBOARD_ITEMS.map((d) => ({ title: d.title, path: "#" })),
        },
        style: { width: 400 },
    },
};
