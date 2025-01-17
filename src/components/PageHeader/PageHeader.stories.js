import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { HomeOutlined, PieChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { withRouter } from "storybook-addon-react-router-v6";
import { DASHBOARD_ITEMS } from "../../constants";
import PageHeader from "./PageHeader.tsx";
const meta = {
    title: "Components/Page header",
    component: PageHeader,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [withRouter],
};
export default meta;
export const Simple = {
    args: {
        title: "Dashboard",
        breadcrumbs: [
            {
                title: (_jsxs(_Fragment, { children: [_jsx(HomeOutlined, {}), _jsx("span", { children: "home" })] })),
                path: "/",
            },
            {
                title: "default dashboard",
            },
        ],
        style: { width: 800 },
    },
};
export const Complex = {
    args: {
        title: "Dashboard",
        breadcrumbs: [
            {
                title: (_jsxs(_Fragment, { children: [_jsx(HomeOutlined, {}), _jsx("span", { children: "home" })] })),
                path: "/",
            },
            {
                title: (_jsxs(_Fragment, { children: [_jsx(PieChartOutlined, {}), _jsx("span", { children: "dashboards" })] })),
                menu: {
                    items: DASHBOARD_ITEMS.map((d) => ({
                        key: d.title,
                        title: _jsx(Link, { to: "#", children: d.title }),
                    })),
                },
            },
            {
                title: "default",
            },
        ],
        style: { width: 800 },
    },
};
