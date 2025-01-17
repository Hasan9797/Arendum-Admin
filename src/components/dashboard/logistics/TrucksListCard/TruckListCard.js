import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, Badge, Button, Col, List, Progress, Row, Space, Typography, } from "antd";
import { Card } from "../../../index.ts";
import "./styles.css";
const TruckListCard = ({ data, loading, error, ...others }) => {
    return (_jsx(Card, { title: "Available Trucks", extra: _jsx(Button, { children: "See All" }), className: "available-tucks-card card", ...others, children: error ? (_jsx(Alert, { message: "Error", description: error.toString(), type: "error", showIcon: true })) : (_jsx(List, { itemLayout: "vertical", className: "available-truck-list", size: "large", pagination: {
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                align: "center",
            }, dataSource: data, renderItem: (item) => (_jsxs(List.Item, { children: [_jsxs(Space, { style: { marginBottom: ".5rem" }, children: [_jsx(Typography.Text, { strong: true, style: { textTransform: "uppercase" }, children: item.truck_id.split("-")[0] }), _jsx(Badge, { status: item.status.toLowerCase() === "delivered"
                                    ? "success"
                                    : item.status.toLowerCase() === "in transit"
                                        ? "processing"
                                        : "warning", text: _jsx("span", { style: { textTransform: "capitalize" }, children: item.status }) })] }), _jsxs(Row, { gutter: 16, children: [_jsx(Col, { span: 10, children: _jsxs(Space, { direction: "vertical", children: [_jsx(Badge, { color: "purple", text: _jsx(Typography.Text, { children: item.origin }) }), _jsx(Badge, { color: "cyan", text: _jsx(Typography.Text, { children: item.destination }) })] }) }), _jsx(Col, { span: 6, children: _jsxs(Space, { direction: "vertical", children: [_jsxs(Typography.Text, { children: ["Make: ", item.make] }), _jsxs(Typography.Text, { children: ["Model: ", item.model] })] }) }), _jsx(Col, { span: 5, children: _jsxs(Space, { direction: "vertical", children: [_jsxs(Typography.Text, { strong: true, children: [item.mileage, " km"] }), _jsx(Typography.Text, { children: "Distance" })] }) }), _jsx(Col, { span: 1, children: _jsx(Progress, { type: "circle", percent: item.progress, size: 48 }) })] })] }, item.truck_id)), loading: loading })) }));
};
export default TruckListCard;
