import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Button, Flex, List, Space, Typography } from "antd";
import { Card, UserAvatar } from "../../../index.ts";
import "./styles.css";
import { CalendarOutlined } from "@ant-design/icons";
const DeliveryRequestCard = ({ data, loading, error, ...others }) => {
    return (_jsx(Card, { title: "Recent request", className: "delivery-request-card card", extra: _jsx(Button, { children: "See all" }), ...others, children: _jsx(List, { size: "large", className: "delivery-request-list", pagination: {
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 5,
                align: "center",
            }, dataSource: data, renderItem: (item) => (_jsx(List.Item, { children: _jsxs(Space, { style: { justifyContent: "space-between", width: "100%" }, children: [_jsxs(Flex, { vertical: true, gap: "small", children: [_jsx(Typography.Text, { strong: true, style: { textTransform: "capitalize" }, children: item.name }), _jsx(Badge, { color: "geekblue", text: _jsxs(Typography.Text, { children: ["From: ", item.delivery_location] }) }), _jsx(Badge, { color: "magenta", text: _jsxs(Typography.Text, { children: ["To: ", item.pickup_location] }) })] }), _jsxs(Flex, { vertical: true, align: "flex-end", gap: "small", children: [_jsxs(Flex, { gap: 4, align: "center", children: [_jsx(CalendarOutlined, {}), _jsx(Typography.Text, { children: item.delivery_date })] }), _jsx(UserAvatar, { fullName: item.driver_name, align: "flex-end", textWidth: "auto" }), _jsxs(Flex, { gap: 4, children: [_jsx(Typography.Text, { children: "Contact:" }), _jsx(Typography.Link, { href: `tel:${item.contact_number}`, children: item.contact_number })] })] })] }) }, item.id)) }) }));
};
export default DeliveryRequestCard;
